import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { InvitationStatus } from '@prisma/client';

@Injectable()
export class InvitationService {
  constructor(private prisma: PrismaService) {}

  async sendInvitation(sendInvitationDto: SendInvitationDto, senderId: number) {
    const { receiverEmail, projectId } = sendInvitationDto;

    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Get sender to check email
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });

    if (!sender) {
      throw new NotFoundException(`Sender with ID ${senderId} not found`);
    }

    // Verify sender and receiver are different
    if (sender.email === receiverEmail) {
      throw new BadRequestException('You cannot invite yourself');
    }

    // Verify receiver exists by email
    const receiver = await this.prisma.user.findUnique({
      where: { email: receiverEmail },
    });

    if (!receiver) {
      throw new NotFoundException(`User with email ${receiverEmail} not found`);
    }

    const receiverId = receiver.id;

    // Check if receiver is already assigned to the project
    const existingAssignment = await this.prisma.projectUser.findFirst({
      where: {
        projectId,
        userId: receiverId,
      },
    });

    if (existingAssignment) {
      throw new ConflictException('User is already assigned to this project');
    }

    // Check if there's already a pending invitation
    const existingInvitation = await this.prisma.invitation.findFirst({
      where: {
        receiverId,
        projectId,
        status: InvitationStatus.PENDING,
      },
    });

    if (existingInvitation) {
      throw new ConflictException(
        'A pending invitation already exists for this user and project',
      );
    }

    // Create invitation
    return this.prisma.invitation.create({
      data: {
        senderId,
        receiverId,
        projectId,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
  }

  async getMyInvitations(userId: number) {
    const invitations = await this.prisma.invitation.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return invitations.map((invitation) => ({
      ...invitation,
      sender: {
        id: invitation.sender.id,
        name: `${invitation.sender.firstName} ${invitation.sender.lastName}`,
        email: invitation.sender.email,
      },
      receiver: {
        id: invitation.receiver.id,
        name: `${invitation.receiver.firstName} ${invitation.receiver.lastName}`,
        email: invitation.receiver.email,
      },
    }));
  }

  async approveInvitation(invitationId: number, userId: number) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id: invitationId },
      include: {
        project: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException(
        `Invitation with ID ${invitationId} not found`,
      );
    }

    // Only the receiver can approve
    if (invitation.receiverId !== userId) {
      throw new ForbiddenException(
        'Only the invitation receiver can approve this invitation',
      );
    }

    // Check if invitation is pending
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new BadRequestException(
        `Invitation is already ${invitation.status.toLowerCase()}`,
      );
    }

    // Update invitation status and assign user to project
    const [updatedInvitation] = await this.prisma.$transaction([
      this.prisma.invitation.update({
        where: { id: invitationId },
        data: {
          status: InvitationStatus.APPROVED,
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          receiver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          project: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      }),
      this.prisma.projectUser.create({
        data: {
          userId: invitation.receiverId,
          projectId: invitation.projectId,
        },
      }),
    ]);

    return {
      ...updatedInvitation,
      sender: {
        id: updatedInvitation.sender.id,
        name: `${updatedInvitation.sender.firstName} ${updatedInvitation.sender.lastName}`,
        email: updatedInvitation.sender.email,
      },
      receiver: {
        id: updatedInvitation.receiver.id,
        name: `${updatedInvitation.receiver.firstName} ${updatedInvitation.receiver.lastName}`,
        email: updatedInvitation.receiver.email,
      },
    };
  }

  async rejectInvitation(invitationId: number, userId: number) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new NotFoundException(
        `Invitation with ID ${invitationId} not found`,
      );
    }

    // Only the receiver can reject
    if (invitation.receiverId !== userId) {
      throw new ForbiddenException(
        'Only the invitation receiver can reject this invitation',
      );
    }

    // Check if invitation is pending
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new BadRequestException(
        `Invitation is already ${invitation.status.toLowerCase()}`,
      );
    }

    const updatedInvitation = await this.prisma.invitation.update({
      where: { id: invitationId },
      data: {
        status: InvitationStatus.REJECTED,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return {
      ...updatedInvitation,
      sender: {
        id: updatedInvitation.sender.id,
        name: `${updatedInvitation.sender.firstName} ${updatedInvitation.sender.lastName}`,
        email: updatedInvitation.sender.email,
      },
      receiver: {
        id: updatedInvitation.receiver.id,
        name: `${updatedInvitation.receiver.firstName} ${updatedInvitation.receiver.lastName}`,
        email: updatedInvitation.receiver.email,
      },
    };
  }
}


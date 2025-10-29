import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, creatorId: number) {
    const { name, description, dueDate } = createProjectDto;

    return this.prisma.project.create({
      data: {
        name,
        description,
        dueDate,
        creatorId,
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    const projects = await this.prisma.project.findMany({
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        assignedUsers: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return projects.map((project) => ({
      ...project,
      creator: {
        id: project.creator.id,
        name: `${project.creator.firstName} ${project.creator.lastName}`,
        email: project.creator.email,
      },
      assignedUsers: project.assignedUsers.map((pu) => ({
        id: pu.user.id,
        name: `${pu.user.firstName} ${pu.user.lastName}`,
        email: pu.user.email,
      })),
    }));
  }

  async findOne(id: number, userId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        assignedUsers: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Determine role based on whether user is the creator
    const role = project.creatorId === userId ? 'CREATOR' : 'MEMBER';

    return {
      ...project,
      role,
      creator: {
        id: project.creator.id,
        name: `${project.creator.firstName} ${project.creator.lastName}`,
        email: project.creator.email,
      },
      assignedUsers: project.assignedUsers.map((pu) => ({
        id: pu.user.id,
        name: `${pu.user.firstName} ${pu.user.lastName}`,
        email: pu.user.email,
      })),
    };
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    userId: number,
  ) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Only creator can update the project
    if (project.creatorId !== userId) {
      throw new ForbiddenException(
        'Only the project creator can update this project',
      );
    }

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Only creator can delete the project
    if (project.creatorId !== userId) {
      throw new ForbiddenException(
        'Only the project creator can delete this project',
      );
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }

  async assignUser(projectId: number, userId: number, requestUserId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Only creator can assign users
    if (project.creatorId !== requestUserId) {
      throw new ForbiddenException(
        'Only the project creator can assign users',
      );
    }

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if user is already assigned
    const existingAssignment = await this.prisma.projectUser.findFirst({
      where: {
        projectId,
        userId,
      },
    });

    if (existingAssignment) {
      throw new ConflictException('User is already assigned to this project');
    }

    await this.prisma.projectUser.create({
      data: {
        projectId,
        userId,
      },
    });

    return this.findOne(projectId, requestUserId);
  }

  async unassignUser(
    projectId: number,
    userId: number,
    requestUserId: number,
  ) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Only creator can unassign users
    if (project.creatorId !== requestUserId) {
      throw new ForbiddenException(
        'Only the project creator can unassign users',
      );
    }

    const assignment = await this.prisma.projectUser.findFirst({
      where: {
        projectId,
        userId,
      },
    });

    if (!assignment) {
      throw new NotFoundException('User is not assigned to this project');
    }

    await this.prisma.projectUser.delete({
      where: {
        id: assignment.id,
      },
    });

    return this.findOne(projectId, requestUserId);
  }
}


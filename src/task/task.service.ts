import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { name, description, startDate, endDate, projectId, userId, statusId } =
      createTaskDto;

    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        assignedUsers: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verify user is assigned to the project
    const isUserAssigned = await this.prisma.projectUser.findFirst({
      where: {
        projectId,
        userId,
      },
    });

    if (!isUserAssigned && project.creatorId !== userId) {
      throw new BadRequestException(
        'User must be assigned to the project to have tasks',
      );
    }

    // Verify status exists
    const status = await this.prisma.taskStatus.findUnique({
      where: { id: statusId },
    });

    if (!status) {
      throw new NotFoundException(`Task status with ID ${statusId} not found`);
    }

    return this.prisma.task.create({
      data: {
        name,
        description,
        startDate,
        endDate,
        projectId,
        userId,
        statusId,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        status: true,
      },
    });
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany({
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        status: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((task) => ({
      ...task,
      user: {
        id: task.user.id,
        name: `${task.user.firstName} ${task.user.lastName}`,
        email: task.user.email,
      },
    }));
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        status: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return {
      ...task,
      user: {
        id: task.user.id,
        name: `${task.user.firstName} ${task.user.lastName}`,
        email: task.user.email,
      },
    };
  }

  async findByProject(projectId: number) {
    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        status: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((task) => ({
      ...task,
      user: {
        id: task.user.id,
        name: `${task.user.firstName} ${task.user.lastName}`,
        email: task.user.email,
      },
    }));
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // If updating userId, verify user is assigned to the project
    if (updateTaskDto.userId) {
      const isUserAssigned = await this.prisma.projectUser.findFirst({
        where: {
          projectId: task.projectId,
          userId: updateTaskDto.userId,
        },
      });

      const project = await this.prisma.project.findUnique({
        where: { id: task.projectId },
      });

      if (!isUserAssigned && project?.creatorId !== updateTaskDto.userId) {
        throw new BadRequestException(
          'User must be assigned to the project to have tasks',
        );
      }
    }

    // If updating statusId, verify status exists
    if (updateTaskDto.statusId) {
      const status = await this.prisma.taskStatus.findUnique({
        where: { id: updateTaskDto.statusId },
      });

      if (!status) {
        throw new NotFoundException(
          `Task status with ID ${updateTaskDto.statusId} not found`,
        );
      }
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        status: true,
      },
    });
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }
}


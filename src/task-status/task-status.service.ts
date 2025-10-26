import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TaskStatusService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskStatusDto: CreateTaskStatusDto) {
    const { name, color } = createTaskStatusDto;

    // Check if status with this name already exists
    const existingStatus = await this.prisma.taskStatus.findUnique({
      where: { name },
    });

    if (existingStatus) {
      throw new ConflictException('Task status with this name already exists');
    }

    return this.prisma.taskStatus.create({
      data: {
        name,
        color,
      },
    });
  }

  async findAll() {
    return this.prisma.taskStatus.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const status = await this.prisma.taskStatus.findUnique({
      where: { id },
    });

    if (!status) {
      throw new NotFoundException(`Task status with ID ${id} not found`);
    }

    return status;
  }

  async update(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
    await this.findOne(id);

    // If updating name, check if new name is already taken
    if (updateTaskStatusDto.name) {
      const existingStatus = await this.prisma.taskStatus.findUnique({
        where: { name: updateTaskStatusDto.name },
      });

      if (existingStatus && existingStatus.id !== id) {
        throw new ConflictException(
          'Task status with this name already exists',
        );
      }
    }

    return this.prisma.taskStatus.update({
      where: { id },
      data: updateTaskStatusDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.taskStatus.delete({
      where: { id },
    });
  }
}


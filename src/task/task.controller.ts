import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Creates a new task for a project. The assigned user must be part of the project.',
  })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project, User, or TaskStatus not found',
  })
  @ApiResponse({
    status: 400,
    description: 'User must be assigned to the project',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.taskService.create(createTaskDto, req.user.userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Retrieves all tasks with project, user, and status information',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks',
    type: [TaskResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findAll() {
    return this.taskService.findAll();
  }

  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get all tasks for a specific project',
    description: 'Retrieves all tasks belonging to a specific project',
  })
  @ApiParam({
    name: 'projectId',
    description: 'Project ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks for the project',
    type: [TaskResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findByProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.taskService.findByProject(projectId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task by ID',
    description: 'Retrieves a specific task with all its details',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Updates an existing task',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task successfully updated',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task or TaskStatus not found',
  })
  @ApiResponse({
    status: 400,
    description: 'User must be assigned to the project',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Deletes a task by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}


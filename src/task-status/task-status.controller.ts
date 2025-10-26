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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TaskStatusService } from './task-status.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatusResponseDto } from './dto/task-status-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('task-status')
@Controller('task-status')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new task status',
    description: 'Creates a new global task status that can be used across all projects and tasks',
  })
  @ApiResponse({
    status: 201,
    description: 'Task status successfully created',
    type: TaskStatusResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Task status with this name already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    return this.taskStatusService.create(createTaskStatusDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all task statuses',
    description: 'Retrieves all available task statuses',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all task statuses',
    type: [TaskStatusResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findAll() {
    return this.taskStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task status by ID',
    description: 'Retrieves a specific task status by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Task status ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task status found',
    type: TaskStatusResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task status not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskStatusService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task status',
    description: 'Updates an existing task status',
  })
  @ApiParam({
    name: 'id',
    description: 'Task status ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task status successfully updated',
    type: TaskStatusResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task status not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Task status with this name already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskStatusService.update(id, updateTaskStatusDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task status',
    description: 'Deletes a task status by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Task status ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task status successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Task status not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskStatusService.remove(id);
  }
}


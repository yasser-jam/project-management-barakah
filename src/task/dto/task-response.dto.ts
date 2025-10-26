import { ApiProperty } from '@nestjs/swagger';

export class TaskUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;
}

export class TaskProjectDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Website Redesign' })
  name: string;
}

export class TaskStatusDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'To Do' })
  name: string;

  @ApiProperty({ example: '#FF5733' })
  color: string;
}

export class TaskResponseDto {
  @ApiProperty({
    description: 'Task ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Task name',
    example: 'Design homepage mockup',
  })
  name: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Create a modern homepage design with hero section',
  })
  description: string;

  @ApiProperty({
    description: 'Task start date',
    example: '2025-01-15',
  })
  startDate: string;

  @ApiProperty({
    description: 'Task end date',
    example: '2025-01-20',
  })
  endDate: string;

  @ApiProperty({
    description: 'Project ID',
    example: 1,
  })
  projectId: number;

  @ApiProperty({
    description: 'User ID',
    example: 2,
  })
  userId: number;

  @ApiProperty({
    description: 'Status ID',
    example: 1,
  })
  statusId: number;

  @ApiProperty({
    description: 'Project information',
    type: TaskProjectDto,
    required: false,
  })
  project?: TaskProjectDto;

  @ApiProperty({
    description: 'Assigned user information',
    type: TaskUserDto,
    required: false,
  })
  user?: TaskUserDto;

  @ApiProperty({
    description: 'Task status information',
    type: TaskStatusDto,
    required: false,
  })
  status?: TaskStatusDto;

  @ApiProperty({
    description: 'Task creation date',
    example: '2025-01-15T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Task last update date',
    example: '2025-01-20T14:30:00Z',
  })
  updatedAt: Date;
}


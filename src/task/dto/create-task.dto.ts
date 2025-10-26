import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
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
    description: 'Assigned user ID (must be from this project)',
    example: 2,
  })
  userId: number;

  @ApiProperty({
    description: 'Task status ID',
    example: 1,
  })
  statusId: number;
}


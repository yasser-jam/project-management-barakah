import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Task name',
    example: 'Updated task name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Updated task description',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Task start date',
    example: '2025-01-16',
  })
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Task end date',
    example: '2025-01-22',
  })
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Assigned user ID',
    example: 3,
  })
  userId?: number;

  @ApiPropertyOptional({
    description: 'Task status ID',
    example: 2,
  })
  statusId?: number;
}


import { ApiProperty } from '@nestjs/swagger';

export class StatusCountDto {
  @ApiProperty({
    description: 'Status name',
    example: 'To Do',
  })
  status: string;

  @ApiProperty({
    description: 'Number of tasks with this status',
    example: 5,
  })
  count: number;
}

export class DailyTaskStatsDto {
  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2025-01-15',
  })
  date: string;

  @ApiProperty({
    description: 'Number of tasks finished on this day',
    example: 3,
  })
  finished: number;

  @ApiProperty({
    description: 'Number of tasks created on this day',
    example: 5,
  })
  created: number;
}

export class StatisticsResponseDto {
  @ApiProperty({
    description: 'Total number of projects for the user',
    example: 10,
  })
  totalProjects: number;

  @ApiProperty({
    description: 'Total number of tasks for the user',
    example: 45,
  })
  totalTasks: number;

  @ApiProperty({
    description: 'Array of status counts',
    type: [StatusCountDto],
  })
  statusCounts: StatusCountDto[];

  @ApiProperty({
    description: 'Daily task statistics for the last 30 days',
    type: [DailyTaskStatsDto],
  })
  dailyStats: DailyTaskStatsDto[];
}



import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    example: 'Website Redesign',
  })
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Complete overhaul of the company website',
  })
  description: string;

  @ApiProperty({
    description: 'Project due date',
    example: '2025-12-31',
  })
  dueDate: string;
}


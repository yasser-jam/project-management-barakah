import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'Project name',
    example: 'Website Redesign v2',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Project description',
    example: 'Updated project description',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Project due date',
    example: '2026-01-15',
  })
  dueDate?: string;
}


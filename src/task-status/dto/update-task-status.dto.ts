import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiPropertyOptional({
    description: 'Status name',
    example: 'In Progress',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Status color (hex code or color name)',
    example: '#3498DB',
  })
  color?: string;
}


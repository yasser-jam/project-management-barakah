import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateTaskStatusDto {
  @ApiPropertyOptional({
    description: 'Status name',
    example: 'In Progress',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Status color (hex code or color name)',
    example: '#3498DB',
  })
  @IsOptional()
  @IsString()
  color?: string;
}


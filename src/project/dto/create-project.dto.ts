import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    example: 'Website Redesign',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Complete overhaul of the company website',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Project due date',
    example: '2025-12-31',
  })
  @IsString()
  @IsNotEmpty()
  dueDate: string;
}


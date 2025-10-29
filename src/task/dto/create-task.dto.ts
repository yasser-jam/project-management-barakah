import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task name',
    example: 'Design homepage mockup',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Create a modern homepage design with hero section',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Task start date',
    example: '2025-01-15',
  })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Task end date',
    example: '2025-01-20',
  })
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Project ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @ApiProperty({
    description: 'Assigned user ID (must be from this project)',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Task status ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}


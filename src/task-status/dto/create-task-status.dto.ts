import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskStatusDto {
  @ApiProperty({
    description: 'Status name',
    example: 'To Do',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Status color (hex code or color name)',
    example: '#FF5733',
  })
  @IsString()
  @IsNotEmpty()
  color: string;
}


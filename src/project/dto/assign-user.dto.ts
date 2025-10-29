import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignUserDto {
  @ApiProperty({
    description: 'User ID to assign to the project',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}


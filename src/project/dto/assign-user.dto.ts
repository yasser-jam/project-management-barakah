import { ApiProperty } from '@nestjs/swagger';

export class AssignUserDto {
  @ApiProperty({
    description: 'User ID to assign to the project',
    example: 2,
  })
  userId: number;
}


import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskStatusDto {
  @ApiProperty({
    description: 'Status name',
    example: 'To Do',
  })
  name: string;

  @ApiProperty({
    description: 'Status color (hex code or color name)',
    example: '#FF5733',
  })
  color: string;
}


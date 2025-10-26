import { ApiProperty } from '@nestjs/swagger';

export class TaskStatusResponseDto {
  @ApiProperty({
    description: 'Status ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Status name',
    example: 'To Do',
  })
  name: string;

  @ApiProperty({
    description: 'Status color',
    example: '#FF5733',
  })
  color: string;
}


import { ApiProperty } from '@nestjs/swagger';

export class SendInvitationDto {
  @ApiProperty({
    description: 'User ID to invite',
    example: 2,
  })
  receiverId: number;

  @ApiProperty({
    description: 'Project ID to invite user to',
    example: 1,
  })
  projectId: number;
}


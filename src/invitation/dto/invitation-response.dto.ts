import { ApiProperty } from '@nestjs/swagger';
import { InvitationStatus } from '../../../generated/prisma';

export class InvitationUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;
}

export class InvitationProjectDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Website Redesign' })
  name: string;

  @ApiProperty({ example: 'Complete overhaul of the company website' })
  description: string;
}

export class InvitationResponseDto {
  @ApiProperty({
    description: 'Invitation ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Sender ID',
    example: 1,
  })
  senderId: number;

  @ApiProperty({
    description: 'Receiver ID',
    example: 2,
  })
  receiverId: number;

  @ApiProperty({
    description: 'Project ID',
    example: 1,
  })
  projectId: number;

  @ApiProperty({
    description: 'Invitation status',
    enum: InvitationStatus,
    example: InvitationStatus.PENDING,
  })
  status: InvitationStatus;

  @ApiProperty({
    description: 'Sender information',
    type: InvitationUserDto,
    required: false,
  })
  sender?: InvitationUserDto;

  @ApiProperty({
    description: 'Receiver information',
    type: InvitationUserDto,
    required: false,
  })
  receiver?: InvitationUserDto;

  @ApiProperty({
    description: 'Project information',
    type: InvitationProjectDto,
    required: false,
  })
  project?: InvitationProjectDto;

  @ApiProperty({
    description: 'Invitation creation date',
    example: '2025-01-15T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Invitation last update date',
    example: '2025-01-20T14:30:00Z',
  })
  updatedAt: Date;
}


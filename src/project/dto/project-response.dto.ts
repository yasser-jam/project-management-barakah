import { ApiProperty } from '@nestjs/swagger';

export class ProjectCreatorDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;
}

export class AssignedUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Jane Smith' })
  name: string;

  @ApiProperty({ example: 'jane@example.com' })
  email: string;
}

export class ProjectResponseDto {
  @ApiProperty({
    description: 'Project ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Project name',
    example: 'Website Redesign',
  })
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Complete overhaul of the company website',
  })
  description: string;

  @ApiProperty({
    description: 'Project due date',
    example: '2025-12-31',
  })
  dueDate: string;

  @ApiProperty({
    description: 'Creator ID',
    example: 1,
  })
  creatorId: number;

  @ApiProperty({
    description: 'User role in the project (CREATOR if user is the creator, MEMBER otherwise)',
    example: 'CREATOR',
    enum: ['CREATOR', 'MEMBER'],
  })
  role?: string;

  @ApiProperty({
    description: 'Project creator information',
    type: ProjectCreatorDto,
  })
  creator?: ProjectCreatorDto;

  @ApiProperty({
    description: 'Assigned users',
    type: [AssignedUserDto],
    required: false,
  })
  assignedUsers?: AssignedUserDto[];

  @ApiProperty({
    description: 'Project creation date',
    example: '2025-01-15T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Project last update date',
    example: '2025-01-20T14:30:00Z',
  })
  updatedAt: Date;
}


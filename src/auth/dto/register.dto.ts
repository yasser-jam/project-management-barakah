import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'User role - defaults to MEMBER if not provided',
    enum: Role,
    example: 'MEMBER',
  })
  role?: Role;
}


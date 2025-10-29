import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class SendInvitationDto {
  @ApiProperty({
    description: 'Email address of the user to invite (required)',
    example: 'jane.smith@company.com',
    type: String,
  })
  @IsString({ message: 'receiverEmail must be a string' })
  @IsEmail({}, { message: 'receiverEmail must be a valid email address' })
  @IsNotEmpty({ message: 'receiverEmail should not be empty' })
  receiverEmail: string;

  @ApiProperty({
    description: 'Project ID to invite user to',
    example: 1,
    type: Number,
  })
  @IsNumber({}, { message: 'projectId must be a number' })
  @IsNotEmpty({ message: 'projectId should not be empty' })
  projectId: number;
}


import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { InvitationService } from './invitation.service';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { InvitationResponseDto } from './dto/invitation-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('invitations')
@Controller('invitations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @ApiOperation({
    summary: 'Send a project invitation',
    description:
      'Sends an invitation to a user to join a project. The sender is automatically set from the JWT token.',
  })
  @ApiResponse({
    status: 201,
    description: 'Invitation successfully sent',
    type: InvitationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project or User not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot invite yourself',
  })
  @ApiResponse({
    status: 409,
    description:
      'User is already assigned to this project or a pending invitation exists',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  sendInvitation(
    @Body() sendInvitationDto: SendInvitationDto,
    @Request() req: any,
  ) {
    return this.invitationService.sendInvitation(
      sendInvitationDto,
      req.user.userId,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get my invitations',
    description:
      'Retrieves all invitations sent to the authenticated user (invitations where you are the receiver)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of invitations received',
    type: [InvitationResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getMyInvitations(@Request() req: any) {
    return this.invitationService.getMyInvitations(req.user.userId);
  }

  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Approve an invitation',
    description:
      'Approves a pending invitation. Only the invitation receiver can approve. Upon approval, the user is automatically assigned to the project.',
  })
  @ApiParam({
    name: 'id',
    description: 'Invitation ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description:
      'Invitation approved and user assigned to project successfully',
    type: InvitationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Only the invitation receiver can approve',
  })
  @ApiResponse({
    status: 400,
    description: 'Invitation is already approved or rejected',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  approveInvitation(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return this.invitationService.approveInvitation(id, req.user.userId);
  }

  @Patch(':id/reject')
  @ApiOperation({
    summary: 'Reject an invitation',
    description:
      'Rejects a pending invitation. Only the invitation receiver can reject.',
  })
  @ApiParam({
    name: 'id',
    description: 'Invitation ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Invitation rejected successfully',
    type: InvitationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Only the invitation receiver can reject',
  })
  @ApiResponse({
    status: 400,
    description: 'Invitation is already approved or rejected',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  rejectInvitation(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return this.invitationService.rejectInvitation(id, req.user.userId);
  }
}


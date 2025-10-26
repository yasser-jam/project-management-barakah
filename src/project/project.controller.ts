import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new project',
    description:
      'Creates a new project with the authenticated user as the creator',
  })
  @ApiResponse({
    status: 201,
    description: 'Project successfully created',
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(@Body() createProjectDto: CreateProjectDto, @Request() req: any) {
    return this.projectService.create(createProjectDto, req.user.userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all projects',
    description: 'Retrieves all projects with creator and assigned users information',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all projects',
    type: [ProjectResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a project by ID',
    description: 'Retrieves a specific project with all its details',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Project found',
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a project',
    description: 'Updates a project (only the creator can update)',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Project successfully updated',
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only the creator can update the project',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req: any,
  ) {
    return this.projectService.update(id, updateProjectDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a project',
    description: 'Deletes a project (only the creator can delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Project successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only the creator can delete the project',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.projectService.remove(id, req.user.userId);
  }

  @Post(':id/assign')
  @ApiOperation({
    summary: 'Assign a user to a project',
    description: 'Assigns a user to the project (only the creator can assign)',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully assigned to the project',
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project or User not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only the creator can assign users',
  })
  @ApiResponse({
    status: 409,
    description: 'User is already assigned to this project',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  assignUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignUserDto: AssignUserDto,
    @Request() req: any,
  ) {
    return this.projectService.assignUser(
      id,
      assignUserDto.userId,
      req.user.userId,
    );
  }

  @Delete(':id/unassign/:userId')
  @ApiOperation({
    summary: 'Unassign a user from a project',
    description:
      'Removes a user from the project (only the creator can unassign)',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID',
    example: 1,
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID to unassign',
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully unassigned from the project',
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found or user is not assigned to this project',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only the creator can unassign users',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  unassignUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Request() req: any,
  ) {
    return this.projectService.unassignUser(id, userId, req.user.userId);
  }
}


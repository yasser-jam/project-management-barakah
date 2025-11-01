import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { StatisticsResponseDto } from './dto/statistics-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('statistics')
@Controller('statistics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get statistics for the current user',
    description:
      'Returns total projects count, total tasks count, status breakdown, and daily statistics for the last 30 days. Total values are real from database, while status and daily data are generated for chart visualization.',
  })
  @ApiResponse({
    status: 200,
    description: 'Statistics data retrieved successfully',
    type: StatisticsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getStatistics(@Request() req: any): Promise<StatisticsResponseDto> {
    return this.statisticsService.getStatistics(req.user.userId);
  }
}



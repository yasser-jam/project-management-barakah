import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  StatisticsResponseDto,
  StatusCountDto,
  DailyTaskStatsDto,
} from './dto/statistics-response.dto';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics(userId: number): Promise<StatisticsResponseDto> {
    // Get all projects where user is creator or assigned
    const userProjectIds = await this.getUserProjectIds(userId);

    // Get total projects count (where user is creator OR assigned)
    const totalProjects = userProjectIds.length;

    // Get total tasks count (all tasks in projects where user is creator/assigned)
    const totalTasks = await this.prisma.task.count({
      where: {
        projectId: { in: userProjectIds }, // All tasks in projects where user is involved
      },
    });

    // Get all task statuses for generating fake data
    const taskStatuses = await this.prisma.taskStatus.findMany({
      orderBy: { id: 'asc' },
    });

    // Generate fake status counts
    const statusCounts: StatusCountDto[] = taskStatuses.map((status) => ({
      status: status.name,
      count: this.generateFakeCount(0, 10), // Fake count between 0-10
    }));

    // Generate fake daily stats for last 30 days
    const dailyStats = this.generateDailyStats();

    return {
      totalProjects,
      totalTasks,
      statusCounts,
      dailyStats,
    };
  }

  /**
   * Get all project IDs where the user is involved (as creator or assigned member)
   */
  private async getUserProjectIds(userId: number): Promise<number[]> {
    // Get projects where user is creator
    const createdProjects = await this.prisma.project.findMany({
      where: { creatorId: userId },
      select: { id: true },
    });

    // Get projects where user is assigned
    const assignedProjects = await this.prisma.projectUser.findMany({
      where: { userId },
      select: { projectId: true },
    });

    // Combine and deduplicate project IDs
    const projectIds = new Set<number>();
    createdProjects.forEach((p) => projectIds.add(p.id));
    assignedProjects.forEach((p) => projectIds.add(p.projectId));

    return Array.from(projectIds);
  }

  /**
   * Generate fake count between min and max
   */
  private generateFakeCount(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate fake daily stats for the last 30 days
   */
  private generateDailyStats(): DailyTaskStatsDto[] {
    const stats: DailyTaskStatsDto[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Format date as YYYY-MM-DD
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate fake counts (higher probability of lower numbers)
      const finished = Math.floor(Math.random() * 8); // 0-7
      const created = Math.floor(Math.random() * 8); // 0-7
      
      stats.push({
        date: dateStr,
        finished,
        created,
      });
    }
    
    return stats;
  }
}


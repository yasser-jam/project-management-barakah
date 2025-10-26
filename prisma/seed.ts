import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (in reverse order of dependencies)
  console.log('🧹 Clearing existing data...');
  await prisma.task.deleteMany();
  await prisma.projectUser.deleteMany();
  await prisma.invitation.deleteMany();
  await prisma.project.deleteMany();
  await prisma.taskStatus.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'test2@gmail.com',
      password: hashedPassword,
      role: 'MEMBER',
    },
  });

  console.log(`✅ Created users: ${user1.email}, ${user2.email}`);

  // Create task statuses
  console.log('📊 Creating task statuses...');
  const taskStatuses = [
    { name: 'To Do', color: '#6B7280' },
    { name: 'In Progress', color: '#3B82F6' },
    { name: 'In Review', color: '#F59E0B' },
    { name: 'Done', color: '#10B981' },
  ];

  const createdStatuses: any[] = [];
  for (const status of taskStatuses) {
    const created = await prisma.taskStatus.create({
      data: status,
    });
    createdStatuses.push(created);
    console.log(`✅ Created status: ${created.name}`);
  }

  // Create projects
  console.log('📁 Creating projects...');
  const projects = [
    {
      name: 'E-commerce Website',
      description: 'Build a modern e-commerce platform with React and Node.js',
      dueDate: '2024-03-15',
      creatorId: user1.id,
    },
    {
      name: 'Mobile App Development',
      description: 'Create a cross-platform mobile app using React Native',
      dueDate: '2024-04-20',
      creatorId: user1.id,
    },
    {
      name: 'Database Migration',
      description: 'Migrate legacy database to PostgreSQL with improved schema',
      dueDate: '2024-02-28',
      creatorId: user2.id,
    },
    {
      name: 'API Documentation',
      description: 'Create comprehensive API documentation using Swagger',
      dueDate: '2024-03-10',
      creatorId: user2.id,
    },
  ];

  const createdProjects: any[] = [];
  for (const project of projects) {
    const created = await prisma.project.create({
      data: project,
    });
    createdProjects.push(created);
    console.log(`✅ Created project: ${created.name}`);
  }

  // Assign users to projects
  console.log('👥 Assigning users to projects...');
  await prisma.projectUser.createMany({
    data: [
      { userId: user1.id, projectId: createdProjects[0].id },
      { userId: user2.id, projectId: createdProjects[0].id },
      { userId: user1.id, projectId: createdProjects[1].id },
      { userId: user2.id, projectId: createdProjects[2].id },
      { userId: user1.id, projectId: createdProjects[3].id },
    ],
  });
  console.log('✅ Assigned users to projects');

  // Create tasks
  console.log('📋 Creating tasks...');
  const tasks = [
    // E-commerce Website tasks
    {
      name: 'Design User Interface',
      description: 'Create wireframes and mockups for the e-commerce website',
      startDate: '2024-01-15',
      endDate: '2024-01-25',
      projectId: createdProjects[0].id,
      userId: user1.id,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Setup Database Schema',
      description: 'Design and implement the database schema for products, users, and orders',
      startDate: '2024-01-20',
      endDate: '2024-01-30',
      projectId: createdProjects[0].id,
      userId: user2.id,
      statusId: createdStatuses[1].id, // In Progress
    },
    {
      name: 'Implement Authentication',
      description: 'Add user registration, login, and JWT authentication',
      startDate: '2024-02-01',
      endDate: '2024-02-10',
      projectId: createdProjects[0].id,
      userId: user1.id,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Product Catalog API',
      description: 'Create REST API endpoints for product management',
      startDate: '2024-02-05',
      endDate: '2024-02-15',
      projectId: createdProjects[0].id,
      userId: user2.id,
      statusId: createdStatuses[2].id, // In Review
    },
    
    // Mobile App Development tasks
    {
      name: 'Setup React Native Project',
      description: 'Initialize React Native project with necessary dependencies',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      projectId: createdProjects[1].id,
      userId: user1.id,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Implement Navigation',
      description: 'Setup React Navigation for the mobile app',
      startDate: '2024-02-10',
      endDate: '2024-02-20',
      projectId: createdProjects[1].id,
      userId: user1.id,
      statusId: createdStatuses[1].id, // In Progress
    },
    {
      name: 'User Authentication',
      description: 'Implement login and registration screens',
      startDate: '2024-02-25',
      endDate: '2024-03-05',
      projectId: createdProjects[1].id,
      userId: user1.id,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // Database Migration tasks
    {
      name: 'Analyze Current Schema',
      description: 'Document existing database structure and identify migration needs',
      startDate: '2024-01-10',
      endDate: '2024-01-20',
      projectId: createdProjects[2].id,
      userId: user2.id,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Create Migration Scripts',
      description: 'Write SQL scripts to migrate data from old to new schema',
      startDate: '2024-01-25',
      endDate: '2024-02-10',
      projectId: createdProjects[2].id,
      userId: user2.id,
      statusId: createdStatuses[1].id, // In Progress
    },
    {
      name: 'Test Migration Process',
      description: 'Run migration on test environment and validate data integrity',
      startDate: '2024-02-15',
      endDate: '2024-02-25',
      projectId: createdProjects[2].id,
      userId: user2.id,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // API Documentation tasks
    {
      name: 'Setup Swagger Configuration',
      description: 'Configure Swagger/OpenAPI for automatic documentation generation',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      projectId: createdProjects[3].id,
      userId: user1.id,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Document Authentication Endpoints',
      description: 'Add comprehensive documentation for auth-related API endpoints',
      startDate: '2024-02-08',
      endDate: '2024-02-15',
      projectId: createdProjects[3].id,
      userId: user1.id,
      statusId: createdStatuses[2].id, // In Review
    },
    {
      name: 'Document Project Management APIs',
      description: 'Document all project and task management endpoints',
      startDate: '2024-02-20',
      endDate: '2024-03-01',
      projectId: createdProjects[3].id,
      userId: user1.id,
      statusId: createdStatuses[0].id, // To Do
    },
  ];

  for (const task of tasks) {
    const created = await prisma.task.create({
      data: task,
    });
    console.log(`✅ Created task: ${created.name} (${createdStatuses.find(s => s.id === created.statusId)?.name})`);
  }

  // Create some invitations
  console.log('📧 Creating invitations...');
  await prisma.invitation.createMany({
    data: [
      {
        senderId: user1.id,
        receiverId: user2.id,
        projectId: createdProjects[0].id,
        status: 'PENDING',
      },
      {
        senderId: user2.id,
        receiverId: user1.id,
        projectId: createdProjects[2].id,
        status: 'APPROVED',
      },
    ],
  });
  console.log('✅ Created invitations');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- Users: 2 (${user1.email}, ${user2.email})`);
  console.log(`- Task Statuses: ${createdStatuses.length}`);
  console.log(`- Projects: ${createdProjects.length}`);
  console.log(`- Tasks: ${tasks.length}`);
  console.log(`- Invitations: 2`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

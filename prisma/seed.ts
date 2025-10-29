import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (in reverse order of dependencies)
  console.log('🧹 Clearing existing data...');
  try {
    await prisma.task.deleteMany();
    await prisma.projectUser.deleteMany();
    await prisma.invitation.deleteMany();
    await prisma.project.deleteMany();
    await prisma.taskStatus.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Existing data cleared');
  } catch (error) {
    console.log('⚠️  Some tables may not exist yet, continuing...');
  }

  // Create users
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      password: hashedPassword,
      role: 'ADMIN' as const,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      password: hashedPassword,
      role: 'MEMBER' as const,
    },
    {
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@company.com',
      password: hashedPassword,
      role: 'MEMBER' as const,
    },
    {
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@company.com',
      password: hashedPassword,
      role: 'MEMBER' as const,
    },
    {
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@company.com',
      password: hashedPassword,
      role: 'ADMIN' as const,
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@company.com',
      password: hashedPassword,
      role: 'MEMBER' as const,
    },
    {
      firstName: 'Alex',
      lastName: 'Martinez',
      email: 'alex.martinez@company.com',
      password: hashedPassword,
      role: 'MEMBER' as const,
    },
    {
      firstName: 'Lisa',
      lastName: 'Anderson',
      email: 'lisa.anderson@company.com',
      password: hashedPassword,
      role: 'MEMBER' as const,
    },
  ];

  const createdUsers: any[] = [];
  for (const user of users) {
    const created = await prisma.user.create({
      data: user,
    });
    createdUsers.push(created);
    console.log(`✅ Created user: ${created.firstName} ${created.lastName} (${created.email})`);
  }

  const [user1, user2, user3, user4, user5, user6, user7, user8] = createdUsers;

  // Create task statuses
  console.log('📊 Creating task statuses...');
  const taskStatuses = [
    { name: 'To Do', color: '#6B7280' },
    { name: 'In Progress', color: '#3B82F6' },
    { name: 'In Review', color: '#F59E0B' },
    { name: 'Done', color: '#10B981' },
    { name: 'Blocked', color: '#EF4444' },
    { name: 'Cancelled', color: '#9CA3AF' },
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
      name: 'E-commerce Platform',
      description: 'Build a modern e-commerce platform with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, product catalog, shopping cart, payment processing, and order management.',
      dueDate: '2024-03-15',
      creatorId: user1.id,
    },
    {
      name: 'Mobile Banking App',
      description: 'Create a secure mobile banking application using React Native with biometric authentication, transaction history, bill payments, and real-time notifications.',
      dueDate: '2024-04-20',
      creatorId: user1.id,
    },
    {
      name: 'Database Migration',
      description: 'Migrate legacy MySQL database to PostgreSQL with improved schema design, data validation, and performance optimization.',
      dueDate: '2024-02-28',
      creatorId: user2.id,
    },
    {
      name: 'API Documentation Portal',
      description: 'Create comprehensive API documentation using Swagger/OpenAPI with interactive examples, SDK generation, and developer onboarding tools.',
      dueDate: '2024-03-10',
      creatorId: user2.id,
    },
    {
      name: 'AI Chatbot Integration',
      description: 'Integrate AI-powered chatbot for customer support with natural language processing, sentiment analysis, and automated ticket routing.',
      dueDate: '2024-05-30',
      creatorId: user3.id,
    },
    {
      name: 'Analytics Dashboard',
      description: 'Build real-time analytics dashboard with data visualization, custom reports, and business intelligence features using D3.js and Chart.js.',
      dueDate: '2024-04-15',
      creatorId: user4.id,
    },
    {
      name: 'DevOps Pipeline',
      description: 'Implement CI/CD pipeline with automated testing, deployment, monitoring, and rollback capabilities using Docker and Kubernetes.',
      dueDate: '2024-03-25',
      creatorId: user5.id,
    },
    {
      name: 'Security Audit System',
      description: 'Develop comprehensive security auditing system with vulnerability scanning, compliance reporting, and threat detection.',
      dueDate: '2024-06-10',
      creatorId: user6.id,
    },
    {
      name: 'Customer Support Portal',
      description: 'Build a comprehensive customer support portal with ticket management, knowledge base, and live chat integration.',
      dueDate: '2024-05-05',
      creatorId: user7.id,
    },
    {
      name: 'Mobile Game Development',
      description: 'Create a cross-platform mobile game using Unity with multiplayer functionality, in-app purchases, and social features.',
      dueDate: '2024-07-20',
      creatorId: user8.id,
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
  const projectAssignments = [
    // E-commerce Platform - Full team
    { userId: user1.id, projectId: createdProjects[0].id },
    { userId: user2.id, projectId: createdProjects[0].id },
    { userId: user3.id, projectId: createdProjects[0].id },
    { userId: user4.id, projectId: createdProjects[0].id },
    
    // Mobile Banking App - Core team
    { userId: user1.id, projectId: createdProjects[1].id },
    { userId: user3.id, projectId: createdProjects[1].id },
    { userId: user5.id, projectId: createdProjects[1].id },
    
    // Database Migration - Technical team
    { userId: user2.id, projectId: createdProjects[2].id },
    { userId: user5.id, projectId: createdProjects[2].id },
    { userId: user6.id, projectId: createdProjects[2].id },
    
    // API Documentation Portal - Documentation team
    { userId: user2.id, projectId: createdProjects[3].id },
    { userId: user4.id, projectId: createdProjects[3].id },
    
    // AI Chatbot Integration - AI team
    { userId: user3.id, projectId: createdProjects[4].id },
    { userId: user4.id, projectId: createdProjects[4].id },
    { userId: user6.id, projectId: createdProjects[4].id },
    
    // Analytics Dashboard - Data team
    { userId: user4.id, projectId: createdProjects[5].id },
    { userId: user6.id, projectId: createdProjects[5].id },
    
    // DevOps Pipeline - Infrastructure team
    { userId: user5.id, projectId: createdProjects[6].id },
    { userId: user6.id, projectId: createdProjects[6].id },
    
    // Security Audit System - Security team
    { userId: user6.id, projectId: createdProjects[7].id },
    { userId: user5.id, projectId: createdProjects[7].id },
    
    // Customer Support Portal - Support team
    { userId: user7.id, projectId: createdProjects[8].id },
    { userId: user8.id, projectId: createdProjects[8].id },
    
    // Mobile Game Development - Game team
    { userId: user8.id, projectId: createdProjects[9].id },
    { userId: user1.id, projectId: createdProjects[9].id },
    { userId: user3.id, projectId: createdProjects[9].id },
  ];

  await prisma.projectUser.createMany({
    data: projectAssignments,
  });
  console.log(`✅ Assigned users to projects (${projectAssignments.length} assignments)`);

  // Create tasks
  console.log('📋 Creating tasks...');
  const tasks = [
    // E-commerce Platform tasks (creatorId: user1.id)
    {
      name: 'Design User Interface',
      description: 'Create wireframes, mockups, and user experience flow for the e-commerce platform',
      startDate: '2024-01-15',
      endDate: '2024-01-25',
      projectId: createdProjects[0].id,
      userId: user1.id,
      creatorId: createdProjects[0].creatorId,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Setup Database Schema',
      description: 'Design and implement PostgreSQL schema for products, users, orders, and payments',
      startDate: '2024-01-20',
      endDate: '2024-01-30',
      projectId: createdProjects[0].id,
      userId: user2.id,
      creatorId: createdProjects[0].creatorId,
      statusId: createdStatuses[1].id, // In Progress
    },
    {
      name: 'Implement Authentication',
      description: 'Add JWT-based user registration, login, and password reset functionality',
      startDate: '2024-02-01',
      endDate: '2024-02-10',
      projectId: createdProjects[0].id,
      userId: user3.id,
      creatorId: createdProjects[0].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Product Catalog API',
      description: 'Create REST API endpoints for product CRUD operations with search and filtering',
      startDate: '2024-02-05',
      endDate: '2024-02-15',
      projectId: createdProjects[0].id,
      userId: user2.id,
      creatorId: createdProjects[0].creatorId,
      statusId: createdStatuses[2].id, // In Review
    },
    {
      name: 'Shopping Cart Implementation',
      description: 'Implement shopping cart functionality with add/remove items and quantity management',
      startDate: '2024-02-15',
      endDate: '2024-02-25',
      projectId: createdProjects[0].id,
      userId: user4.id,
      creatorId: createdProjects[0].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Payment Integration',
      description: 'Integrate Stripe payment gateway for secure checkout process',
      startDate: '2024-02-20',
      endDate: '2024-03-05',
      projectId: createdProjects[0].id,
      userId: user3.id,
      creatorId: createdProjects[0].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // Mobile Banking App tasks (creatorId: user1.id)
    {
      name: 'Setup React Native Project',
      description: 'Initialize React Native project with navigation, state management, and security libraries',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      projectId: createdProjects[1].id,
      userId: user1.id,
      creatorId: createdProjects[1].creatorId,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Implement Biometric Authentication',
      description: 'Add fingerprint and face recognition authentication using device biometrics',
      startDate: '2024-02-10',
      endDate: '2024-02-20',
      projectId: createdProjects[1].id,
      userId: user3.id,
      creatorId: createdProjects[1].creatorId,
      statusId: createdStatuses[1].id, // In Progress
    },
    {
      name: 'Transaction History Screen',
      description: 'Create transaction history interface with filtering and search capabilities',
      startDate: '2024-02-25',
      endDate: '2024-03-05',
      projectId: createdProjects[1].id,
      userId: user1.id,
      creatorId: createdProjects[1].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Bill Payment Feature',
      description: 'Implement bill payment functionality with recurring payment options',
      startDate: '2024-03-10',
      endDate: '2024-03-20',
      projectId: createdProjects[1].id,
      userId: user5.id,
      creatorId: createdProjects[1].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // Database Migration tasks (creatorId: user2.id)
    {
      name: 'Analyze Current Schema',
      description: 'Document existing MySQL database structure and identify migration requirements',
      startDate: '2024-01-10',
      endDate: '2024-01-20',
      projectId: createdProjects[2].id,
      userId: user2.id,
      creatorId: createdProjects[2].creatorId,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Create Migration Scripts',
      description: 'Write comprehensive SQL scripts to migrate data from MySQL to PostgreSQL',
      startDate: '2024-01-25',
      endDate: '2024-02-10',
      projectId: createdProjects[2].id,
      userId: user5.id,
      creatorId: createdProjects[2].creatorId,
      statusId: createdStatuses[1].id, // In Progress
    },
    {
      name: 'Test Migration Process',
      description: 'Run migration on test environment and validate data integrity and performance',
      startDate: '2024-02-15',
      endDate: '2024-02-25',
      projectId: createdProjects[2].id,
      userId: user6.id,
      creatorId: createdProjects[2].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // API Documentation Portal tasks (creatorId: user2.id)
    {
      name: 'Setup Swagger Configuration',
      description: 'Configure Swagger/OpenAPI with authentication and interactive documentation',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      projectId: createdProjects[3].id,
      userId: user2.id,
      creatorId: createdProjects[3].creatorId,
      statusId: createdStatuses[3].id, // Done
    },
    {
      name: 'Document Authentication Endpoints',
      description: 'Add comprehensive documentation for auth-related API endpoints with examples',
      startDate: '2024-02-08',
      endDate: '2024-02-15',
      projectId: createdProjects[3].id,
      userId: user4.id,
      creatorId: createdProjects[3].creatorId,
      statusId: createdStatuses[2].id, // In Review
    },
    {
      name: 'Create SDK Generator',
      description: 'Build automated SDK generation for multiple programming languages',
      startDate: '2024-02-20',
      endDate: '2024-03-01',
      projectId: createdProjects[3].id,
      userId: user2.id,
      creatorId: createdProjects[3].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // AI Chatbot Integration tasks (creatorId: user3.id)
    {
      name: 'Setup AI Service Integration',
      description: 'Integrate OpenAI API for natural language processing and conversation management',
      startDate: '2024-03-01',
      endDate: '2024-03-10',
      projectId: createdProjects[4].id,
      userId: user3.id,
      creatorId: createdProjects[4].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Implement Sentiment Analysis',
      description: 'Add sentiment analysis to understand customer emotions and route accordingly',
      startDate: '2024-03-15',
      endDate: '2024-03-25',
      projectId: createdProjects[4].id,
      userId: user4.id,
      creatorId: createdProjects[4].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Create Ticket Routing System',
      description: 'Build automated ticket routing based on AI analysis and priority levels',
      startDate: '2024-03-30',
      endDate: '2024-04-10',
      projectId: createdProjects[4].id,
      userId: user6.id,
      creatorId: createdProjects[4].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // Analytics Dashboard tasks (creatorId: user4.id)
    {
      name: 'Setup Data Visualization Framework',
      description: 'Configure D3.js and Chart.js for interactive data visualization components',
      startDate: '2024-03-01',
      endDate: '2024-03-10',
      projectId: createdProjects[5].id,
      userId: user4.id,
      creatorId: createdProjects[5].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Create Custom Report Builder',
      description: 'Build drag-and-drop interface for creating custom business reports',
      startDate: '2024-03-15',
      endDate: '2024-03-30',
      projectId: createdProjects[5].id,
      userId: user6.id,
      creatorId: createdProjects[5].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Implement Real-time Data Streaming',
      description: 'Setup WebSocket connections for real-time data updates and live dashboards',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      projectId: createdProjects[5].id,
      userId: user4.id,
      creatorId: createdProjects[5].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // DevOps Pipeline tasks (creatorId: user5.id)
    {
      name: 'Setup CI/CD Pipeline',
      description: 'Configure GitHub Actions for automated testing, building, and deployment',
      startDate: '2024-02-15',
      endDate: '2024-02-25',
      projectId: createdProjects[6].id,
      userId: user5.id,
      creatorId: createdProjects[6].creatorId,
      statusId: createdStatuses[1].id, // In Progress
    },
    {
      name: 'Container Orchestration',
      description: 'Setup Kubernetes cluster for container orchestration and scaling',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      projectId: createdProjects[6].id,
      userId: user6.id,
      creatorId: createdProjects[6].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Monitoring and Alerting',
      description: 'Implement comprehensive monitoring with Prometheus and Grafana',
      startDate: '2024-03-20',
      endDate: '2024-03-25',
      projectId: createdProjects[6].id,
      userId: user5.id,
      creatorId: createdProjects[6].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // Security Audit System tasks (creatorId: user6.id)
    {
      name: 'Vulnerability Scanner Integration',
      description: 'Integrate OWASP ZAP and other security scanning tools for automated vulnerability detection',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      projectId: createdProjects[7].id,
      userId: user6.id,
      creatorId: createdProjects[7].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Compliance Reporting Dashboard',
      description: 'Create compliance reporting interface for GDPR, SOC2, and other standards',
      startDate: '2024-04-20',
      endDate: '2024-05-10',
      projectId: createdProjects[7].id,
      userId: user5.id,
      creatorId: createdProjects[7].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Threat Detection System',
      description: 'Implement AI-powered threat detection and automated response system',
      startDate: '2024-05-15',
      endDate: '2024-06-10',
      projectId: createdProjects[7].id,
      userId: user6.id,
      creatorId: createdProjects[7].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // Customer Support Portal tasks (creatorId: user7.id)
    {
      name: 'Design Support Interface',
      description: 'Create user-friendly interface for ticket submission and tracking',
      startDate: '2024-03-01',
      endDate: '2024-03-10',
      projectId: createdProjects[8].id,
      userId: user7.id,
      creatorId: createdProjects[8].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Implement Knowledge Base',
      description: 'Build searchable knowledge base with articles and FAQs',
      startDate: '2024-03-15',
      endDate: '2024-03-30',
      projectId: createdProjects[8].id,
      userId: user8.id,
      creatorId: createdProjects[8].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Live Chat Integration',
      description: 'Integrate real-time chat functionality with agent assignment',
      startDate: '2024-04-01',
      endDate: '2024-04-20',
      projectId: createdProjects[8].id,
      userId: user7.id,
      creatorId: createdProjects[8].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    
    // Mobile Game Development tasks (creatorId: user8.id)
    {
      name: 'Game Design Document',
      description: 'Create comprehensive game design document with mechanics and story',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      projectId: createdProjects[9].id,
      userId: user8.id,
      creatorId: createdProjects[9].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Unity Project Setup',
      description: 'Initialize Unity project with necessary plugins and configurations',
      startDate: '2024-04-20',
      endDate: '2024-04-30',
      projectId: createdProjects[9].id,
      userId: user1.id,
      creatorId: createdProjects[9].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
    {
      name: 'Multiplayer Backend',
      description: 'Implement multiplayer server infrastructure and matchmaking system',
      startDate: '2024-05-01',
      endDate: '2024-05-20',
      projectId: createdProjects[9].id,
      userId: user3.id,
      creatorId: createdProjects[9].creatorId,
      statusId: createdStatuses[0].id, // To Do
    },
  ];

  for (const task of tasks) {
    const created = await prisma.task.create({
      data: task,
    });
    console.log(`✅ Created task: ${created.name} (${createdStatuses.find(s => s.id === created.statusId)?.name})`);
  }

  // Create invitations
  console.log('📧 Creating invitations...');
  const invitations = [
    // Pending invitations
    {
      senderId: user1.id,
      receiverId: user3.id,
      projectId: createdProjects[0].id, // E-commerce Platform
      status: 'PENDING' as const,
    },
    {
      senderId: user2.id,
      receiverId: user4.id,
      projectId: createdProjects[2].id, // Database Migration
      status: 'PENDING' as const,
    },
    {
      senderId: user3.id,
      receiverId: user5.id,
      projectId: createdProjects[4].id, // AI Chatbot Integration
      status: 'PENDING' as const,
    },
    {
      senderId: user4.id,
      receiverId: user6.id,
      projectId: createdProjects[5].id, // Analytics Dashboard
      status: 'PENDING' as const,
    },
    {
      senderId: user5.id,
      receiverId: user1.id,
      projectId: createdProjects[6].id, // DevOps Pipeline
      status: 'PENDING' as const,
    },
    {
      senderId: user7.id,
      receiverId: user2.id,
      projectId: createdProjects[8].id, // Customer Support Portal
      status: 'PENDING' as const,
    },
    
    // Approved invitations
    {
      senderId: user1.id,
      receiverId: user2.id,
      projectId: createdProjects[1].id, // Mobile Banking App
      status: 'APPROVED' as const,
    },
    {
      senderId: user2.id,
      receiverId: user3.id,
      projectId: createdProjects[3].id, // API Documentation Portal
      status: 'APPROVED' as const,
    },
    {
      senderId: user6.id,
      receiverId: user4.id,
      projectId: createdProjects[7].id, // Security Audit System
      status: 'APPROVED' as const,
    },
    {
      senderId: user8.id,
      receiverId: user1.id,
      projectId: createdProjects[9].id, // Mobile Game Development
      status: 'APPROVED' as const,
    },
    
    // Rejected invitations
    {
      senderId: user1.id,
      receiverId: user5.id,
      projectId: createdProjects[0].id, // E-commerce Platform
      status: 'REJECTED' as const,
    },
    {
      senderId: user3.id,
      receiverId: user6.id,
      projectId: createdProjects[1].id, // Mobile Banking App
      status: 'REJECTED' as const,
    },
    {
      senderId: user4.id,
      receiverId: user7.id,
      projectId: createdProjects[5].id, // Analytics Dashboard
      status: 'REJECTED' as const,
    },
  ];

  await prisma.invitation.createMany({
    data: invitations,
  });
  console.log(`✅ Created invitations (${invitations.length} total)`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- Users: ${createdUsers.length} (${createdUsers.map(u => u.email).join(', ')})`);
  console.log(`- Task Statuses: ${createdStatuses.length}`);
  console.log(`- Projects: ${createdProjects.length}`);
  console.log(`- Tasks: ${tasks.length}`);
  console.log(`- Project Assignments: ${projectAssignments.length}`);
  console.log(`- Invitations: ${invitations.length}`);
  console.log('\n🔐 Login Credentials (all users):');
  console.log('Email: [any user email from above]');
  console.log('Password: password123');
  console.log('\n📋 Task Status Distribution:');
  const statusCounts = createdStatuses.map(status => {
    const count = tasks.filter(task => task.statusId === status.id).length;
    return `${status.name}: ${count} tasks`;
  });
  statusCounts.forEach(status => console.log(`  - ${status}`));
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
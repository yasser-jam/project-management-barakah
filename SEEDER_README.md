# Database Seeder

This project includes a comprehensive database seeder that creates realistic test data for development and testing purposes.

## What the Seeder Creates

### Users (8 total)
- **Admins**: John Doe, David Brown
- **Members**: Jane Smith, Mike Johnson, Sarah Wilson, Emily Davis, Alex Martinez, Lisa Anderson
- **Password**: `password123` (for all users)

### Task Statuses (6 total)
- To Do (Gray)
- In Progress (Blue)
- In Review (Orange)
- Done (Green)
- Blocked (Red)
- Cancelled (Gray)

### Projects (10 total)
1. **E-commerce Platform** - Full-stack e-commerce solution
2. **Mobile Banking App** - Secure banking application
3. **Database Migration** - MySQL to PostgreSQL migration
4. **API Documentation Portal** - Swagger/OpenAPI documentation
5. **AI Chatbot Integration** - Customer support automation
6. **Analytics Dashboard** - Business intelligence dashboard
7. **DevOps Pipeline** - CI/CD automation
8. **Security Audit System** - Security compliance tools
9. **Customer Support Portal** - Support ticket management
10. **Mobile Game Development** - Cross-platform game

### Tasks (30+ total)
Each project has 3-6 realistic tasks with different statuses, assigned to various team members.

### Project Assignments
Users are assigned to projects based on realistic team structures:
- Full teams for major projects
- Specialized teams for technical projects
- Cross-functional collaboration

### Invitations (13 total)
- **Pending**: 6 invitations awaiting response
- **Approved**: 4 accepted invitations
- **Rejected**: 3 declined invitations

## Available Scripts

### Database Setup
```bash
# Complete database setup (generate client, push schema, seed data)
npm run db:setup

# Individual commands
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Run the seeder
```

### Database Management
```bash
# Reset database and reseed
npm run db:reset

# Run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Quick Seeding
```bash
# Just run the seeder
npm run seed
```

## Prerequisites

1. **Database**: Make sure PostgreSQL is running and accessible
2. **Environment**: Set up your `DATABASE_URL` in `.env` file
3. **Dependencies**: Install npm packages with `npm install`

## Usage Examples

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Set up database and seed data
npm run db:setup

# 3. Start the application
npm run start:dev
```

### Reseed Database
```bash
# Reset and reseed
npm run db:reset

# Or just reseed (keeps existing schema)
npm run db:seed
```

### Development Workflow
```bash
# Make schema changes
# Edit prisma/schema.prisma

# Push changes and reseed
npm run db:push
npm run db:seed

# Or use the complete setup
npm run db:setup
```

## Login Credentials

All users have the same password for easy testing:
- **Email**: Any email from the user list above
- **Password**: `password123`

### Example Logins
- `john.doe@company.com` / `password123` (Admin)
- `jane.smith@company.com` / `password123` (Member)
- `david.brown@company.com` / `password123` (Admin)

## Data Structure

The seeder creates a realistic project management environment with:
- Multiple projects with different team sizes
- Tasks in various stages of completion
- Cross-project collaboration through invitations
- Realistic user roles and permissions
- Comprehensive task status tracking

## Customization

To modify the seeded data:
1. Edit `prisma/seed.ts`
2. Modify the arrays for users, projects, tasks, or invitations
3. Run `npm run db:seed` to apply changes

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env` file
- Verify database exists and is accessible

### Seeder Errors
- Run `npm run db:generate` first
- Try `npm run db:push` to ensure schema is up to date
- Check for any syntax errors in `prisma/seed.ts`

### Permission Issues
- Ensure database user has CREATE/DROP permissions
- Check file permissions for the project directory


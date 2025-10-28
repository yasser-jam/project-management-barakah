#!/bin/bash

# Database Setup Script for Projy Project Management System
# This script helps set up the database and seed it with test data

echo "🚀 Projy Database Setup Script"
echo "================================"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating a sample configuration..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/projy_db?schema=public"

# JWT Configuration  
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Application Configuration
PORT=3000
NODE_ENV="development"
EOF
    echo "✅ Created .env file with default configuration"
    echo "📝 Please update the DATABASE_URL in .env file with your actual database credentials"
    echo ""
fi

# Function to check if database is accessible
check_database() {
    echo "🔍 Checking database connection..."
    if npm run db:push > /dev/null 2>&1; then
        echo "✅ Database connection successful"
        return 0
    else
        echo "❌ Database connection failed"
        return 1
    fi
}

# Function to setup local PostgreSQL with Docker
setup_local_db() {
    echo "🐳 Setting up local PostgreSQL with Docker..."
    
    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and try again."
        return 1
    fi
    
    # Create Docker Compose file for PostgreSQL
    cat > docker-compose.yml << EOF
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: projy-postgres
    environment:
      POSTGRES_DB: projy_db
      POSTGRES_USER: projy_user
      POSTGRES_PASSWORD: projy_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
EOF

    # Update .env with local database URL
    cat > .env << EOF
# Database Configuration
DATABASE_URL="postgresql://projy_user:projy_password@localhost:5432/projy_db?schema=public"

# JWT Configuration  
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Application Configuration
PORT=3000
NODE_ENV="development"
EOF

    echo "🐳 Starting PostgreSQL container..."
    docker-compose up -d
    
    echo "⏳ Waiting for database to be ready..."
    sleep 10
    
    echo "✅ Local PostgreSQL database is ready!"
    echo "📊 Database Details:"
    echo "   Host: localhost"
    echo "   Port: 5432"
    echo "   Database: projy_db"
    echo "   Username: projy_user"
    echo "   Password: projy_password"
}

# Main setup function
main() {
    echo "Choose your database setup option:"
    echo "1) Use existing database (update .env file)"
    echo "2) Setup local PostgreSQL with Docker"
    echo "3) Skip database setup"
    echo ""
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1)
            echo "📝 Please update the DATABASE_URL in .env file with your database credentials"
            echo "Then run: npm run db:setup"
            ;;
        2)
            setup_local_db
            if [ $? -eq 0 ]; then
                echo "🚀 Running database setup..."
                npm run db:setup
            fi
            ;;
        3)
            echo "⏭️  Skipping database setup"
            ;;
        *)
            echo "❌ Invalid choice"
            exit 1
            ;;
    esac
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Run main function
main

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your database credentials (if not using Docker)"
echo "2. Run 'npm run db:setup' to create tables and seed data"
echo "3. Run 'npm run start:dev' to start the application"
echo ""
echo "🔧 Available commands:"
echo "   npm run db:setup    - Complete database setup"
echo "   npm run db:seed     - Seed database with test data"
echo "   npm run db:studio   - Open Prisma Studio"
echo "   npm run start:dev   - Start development server"


@echo off
REM Database Setup Script for Projy Project Management System
REM This script helps set up the database and seed it with test data

echo 🚀 Projy Database Setup Script
echo ================================

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  No .env file found. Creating a sample configuration...
    (
        echo # Database Configuration
        echo DATABASE_URL="postgresql://username:password@localhost:5432/projy_db?schema=public"
        echo.
        echo # JWT Configuration  
        echo JWT_SECRET="your-super-secret-jwt-key-here"
        echo JWT_EXPIRES_IN="7d"
        echo.
        echo # Application Configuration
        echo PORT=3000
        echo NODE_ENV="development"
    ) > .env
    echo ✅ Created .env file with default configuration
    echo 📝 Please update the DATABASE_URL in .env file with your actual database credentials
    echo.
)

echo Choose your database setup option:
echo 1^) Use existing database ^(update .env file^)
echo 2^) Setup local PostgreSQL with Docker
echo 3^) Skip database setup
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo 📝 Please update the DATABASE_URL in .env file with your database credentials
    echo Then run: npm run db:setup
) else if "%choice%"=="2" (
    echo 🐳 Setting up local PostgreSQL with Docker...
    
    REM Check if Docker is running
    docker info >nul 2>&1
    if errorlevel 1 (
        echo ❌ Docker is not running. Please start Docker and try again.
        pause
        exit /b 1
    )
    
    REM Create Docker Compose file for PostgreSQL
    (
        echo version: '3.8'
        echo services:
        echo   postgres:
        echo     image: postgres:15
        echo     container_name: projy-postgres
        echo     environment:
        echo       POSTGRES_DB: projy_db
        echo       POSTGRES_USER: projy_user
        echo       POSTGRES_PASSWORD: projy_password
        echo     ports:
        echo       - "5432:5432"
        echo     volumes:
        echo       - postgres_data:/var/lib/postgresql/data
        echo     restart: unless-stopped
        echo.
        echo volumes:
        echo   postgres_data:
    ) > docker-compose.yml

    REM Update .env with local database URL
    (
        echo # Database Configuration
        echo DATABASE_URL="postgresql://projy_user:projy_password@localhost:5432/projy_db?schema=public"
        echo.
        echo # JWT Configuration  
        echo JWT_SECRET="your-super-secret-jwt-key-here"
        echo JWT_EXPIRES_IN="7d"
        echo.
        echo # Application Configuration
        echo PORT=3000
        echo NODE_ENV="development"
    ) > .env

    echo 🐳 Starting PostgreSQL container...
    docker-compose up -d
    
    echo ⏳ Waiting for database to be ready...
    timeout /t 10 /nobreak >nul
    
    echo ✅ Local PostgreSQL database is ready!
    echo 📊 Database Details:
    echo    Host: localhost
    echo    Port: 5432
    echo    Database: projy_db
    echo    Username: projy_user
    echo    Password: projy_password
    
    echo 🚀 Running database setup...
    npm run db:setup
) else if "%choice%"=="3" (
    echo ⏭️  Skipping database setup
) else (
    echo ❌ Invalid choice
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Update .env file with your database credentials ^(if not using Docker^)
echo 2. Run 'npm run db:setup' to create tables and seed data
echo 3. Run 'npm run start:dev' to start the application
echo.
echo 🔧 Available commands:
echo    npm run db:setup    - Complete database setup
echo    npm run db:seed     - Seed database with test data
echo    npm run db:studio   - Open Prisma Studio
echo    npm run start:dev   - Start development server
echo.
pause


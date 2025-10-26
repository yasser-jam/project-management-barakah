# Projy - Project Management API Documentation

## Base URL
```
coming soon...
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication Endpoints

#### POST /auth/register
- **Description**: Register a new user
- **Authentication**: None required
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john.doe@example.com",
    "password": "SecurePassword123",
    "role": "MEMBER"
  }
  ```
- **Response** (201):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "name": "John Doe",
      "role": "MEMBER"
    }
  }
  ```

#### POST /auth/login
- **Description**: Login user
- **Authentication**: None required
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response** (200):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "name": "John Doe",
      "role": "MEMBER"
    }
  }
  ```

#### GET /auth/profile
- **Description**: Get current user profile
- **Authentication**: Required
- **Response** (200):
  ```json
  {
    "userId": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "MEMBER"
  }
  ```

---

### 3. Project Management Endpoints

#### POST /projects
- **Description**: Create a new project
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "name": "Website Redesign",
    "description": "Complete overhaul of the company website",
    "dueDate": "2025-12-31"
  }
  ```
- **Response** (201):
  ```json
  {
    "id": 1,
    "name": "Website Redesign",
    "description": "Complete overhaul of the company website",
    "dueDate": "2025-12-31",
    "creatorId": 1,
    "creator": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedUsers": [],
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
  ```

#### GET /projects
- **Description**: Get all projects
- **Authentication**: Required
- **Response** (200):
  ```json
  [
    {
      "id": 1,
      "name": "Website Redesign",
      "description": "Complete overhaul of the company website",
      "dueDate": "2025-12-31",
      "creatorId": 1,
      "creator": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "assignedUsers": [
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane@example.com"
        }
      ],
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
  ```

#### GET /projects/:id
- **Description**: Get a project by ID
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Project ID
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "Website Redesign",
    "description": "Complete overhaul of the company website",
    "dueDate": "2025-12-31",
    "creatorId": 1,
    "creator": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedUsers": [
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    ],
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
  ```

#### PATCH /projects/:id
- **Description**: Update a project (creator only)
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Project ID
- **Request Body**:
  ```json
  {
    "name": "Website Redesign v2",
    "description": "Updated project description",
    "dueDate": "2026-01-15"
  }
  ```
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "Website Redesign v2",
    "description": "Updated project description",
    "dueDate": "2026-01-15",
    "creatorId": 1,
    "creator": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedUsers": [],
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-20T14:30:00Z"
  }
  ```

#### DELETE /projects/:id
- **Description**: Delete a project (creator only)
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Project ID
- **Response** (200):
  ```json
  {
    "message": "Project successfully deleted"
  }
  ```

#### POST /projects/:id/assign
- **Description**: Assign a user to a project (creator only)
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Project ID
- **Request Body**:
  ```json
  {
    "userId": 2
  }
  ```
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "Website Redesign",
    "description": "Complete overhaul of the company website",
    "dueDate": "2025-12-31",
    "creatorId": 1,
    "creator": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedUsers": [
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    ],
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
  ```

#### DELETE /projects/:id/unassign/:userId
- **Description**: Unassign a user from a project (creator only)
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Project ID
  - `userId` (number): User ID to unassign
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "Website Redesign",
    "description": "Complete overhaul of the company website",
    "dueDate": "2025-12-31",
    "creatorId": 1,
    "creator": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedUsers": [],
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
  ```

---

### 4. Task Management Endpoints

#### POST /tasks
- **Description**: Create a new task
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "name": "Design homepage mockup",
    "description": "Create a modern homepage design with hero section",
    "startDate": "2025-01-15",
    "endDate": "2025-01-20",
    "projectId": 1,
    "userId": 2,
    "statusId": 1
  }
  ```
- **Response** (201):
  ```json
  {
    "id": 1,
    "name": "Design homepage mockup",
    "description": "Create a modern homepage design with hero section",
    "startDate": "2025-01-15",
    "endDate": "2025-01-20",
    "projectId": 1,
    "userId": 2,
    "statusId": 1,
    "project": {
      "id": 1,
      "name": "Website Redesign"
    },
    "user": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "status": {
      "id": 1,
      "name": "To Do",
      "color": "#FF5733"
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
  ```

#### GET /tasks
- **Description**: Get all tasks
- **Authentication**: Required
- **Response** (200):
  ```json
  [
    {
      "id": 1,
      "name": "Design homepage mockup",
      "description": "Create a modern homepage design with hero section",
      "startDate": "2025-01-15",
      "endDate": "2025-01-20",
      "projectId": 1,
      "userId": 2,
      "statusId": 1,
      "project": {
        "id": 1,
        "name": "Website Redesign"
      },
      "user": {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "status": {
        "id": 1,
        "name": "To Do",
        "color": "#FF5733"
      },
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
  ```

#### GET /tasks/project/:projectId
- **Description**: Get all tasks for a specific project
- **Authentication**: Required
- **Parameters**:
  - `projectId` (number): Project ID
- **Response** (200):
  ```json
  [
    {
      "id": 1,
      "name": "Design homepage mockup",
      "description": "Create a modern homepage design with hero section",
      "startDate": "2025-01-15",
      "endDate": "2025-01-20",
      "projectId": 1,
      "userId": 2,
      "statusId": 1,
      "project": {
        "id": 1,
        "name": "Website Redesign"
      },
      "user": {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "status": {
        "id": 1,
        "name": "To Do",
        "color": "#FF5733"
      },
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
  ```

#### GET /tasks/:id
- **Description**: Get a task by ID
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Task ID
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "Design homepage mockup",
    "description": "Create a modern homepage design with hero section",
    "startDate": "2025-01-15",
    "endDate": "2025-01-20",
    "projectId": 1,
    "userId": 2,
    "statusId": 1,
    "project": {
      "id": 1,
      "name": "Website Redesign"
    },
    "user": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "status": {
      "id": 1,
      "name": "To Do",
      "color": "#FF5733"
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
  ```

#### PATCH /tasks/:id
- **Description**: Update a task
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Task ID
- **Request Body**:
  ```json
  {
    "name": "Updated task name",
    "description": "Updated task description",
    "startDate": "2025-01-16",
    "endDate": "2025-01-22",
    "userId": 3,
    "statusId": 2
  }
  ```
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "Updated task name",
    "description": "Updated task description",
    "startDate": "2025-01-16",
    "endDate": "2025-01-22",
    "projectId": 1,
    "userId": 3,
    "statusId": 2,
    "project": {
      "id": 1,
      "name": "Website Redesign"
    },
    "user": {
      "id": 3,
      "name": "Bob Johnson",
      "email": "bob@example.com"
    },
    "status": {
      "id": 2,
      "name": "In Progress",
      "color": "#3498DB"
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-20T14:30:00Z"
  }
  ```

#### DELETE /tasks/:id
- **Description**: Delete a task
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Task ID
- **Response** (200):
  ```json
  {
    "message": "Task successfully deleted"
  }
  ```

---

### 5. Task Status Management Endpoints

#### POST /task-status
- **Description**: Create a new task status
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "name": "To Do",
    "color": "#FF5733"
  }
  ```
- **Response** (201):
  ```json
  {
    "id": 1,
    "name": "To Do",
    "color": "#FF5733"
  }
  ```

#### GET /task-status
- **Description**: Get all task statuses
- **Authentication**: Required
- **Response** (200):
  ```json
  [
    {
      "id": 1,
      "name": "To Do",
      "color": "#FF5733"
    },
    {
      "id": 2,
      "name": "In Progress",
      "color": "#3498DB"
    },
    {
      "id": 3,
      "name": "In Review",
      "color": "#F39C12"
    },
    {
      "id": 4,
      "name": "Done",
      "color": "#27AE60"
    }
  ]
  ```

#### GET /task-status/:id
- **Description**: Get a task status by ID
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Task status ID
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "To Do",
    "color": "#FF5733"
  }
  ```

#### PATCH /task-status/:id
- **Description**: Update a task status
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Task status ID
- **Request Body**:
  ```json
  {
    "name": "In Progress",
    "color": "#3498DB"
  }
  ```
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "In Progress",
    "color": "#3498DB"
  }
  ```

#### DELETE /task-status/:id
- **Description**: Delete a task status
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Task status ID
- **Response** (200):
  ```json
  {
    "message": "Task status successfully deleted"
  }
  ```

---

### 6. Invitation Management Endpoints

#### POST /invitations
- **Description**: Send a project invitation
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "receiverId": 2,
    "projectId": 1
  }
  ```
- **Response** (201):
  ```json
  {
    "id": 1,
    "senderId": 1,
    "receiverId": 2,
    "projectId": 1,
    "status": "PENDING",
    "sender": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "receiver": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "project": {
      "id": 1,
      "name": "Website Redesign",
      "description": "Complete overhaul of the company website"
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
  ```

#### GET /invitations
- **Description**: Get my invitations (received invitations)
- **Authentication**: Required
- **Response** (200):
  ```json
  [
    {
      "id": 1,
      "senderId": 1,
      "receiverId": 2,
      "projectId": 1,
      "status": "PENDING",
      "sender": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "receiver": {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "project": {
        "id": 1,
        "name": "Website Redesign",
        "description": "Complete overhaul of the company website"
      },
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
  ```

#### PATCH /invitations/:id/approve
- **Description**: Approve an invitation
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Invitation ID
- **Response** (200):
  ```json
  {
    "id": 1,
    "senderId": 1,
    "receiverId": 2,
    "projectId": 1,
    "status": "APPROVED",
    "sender": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "receiver": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "project": {
      "id": 1,
      "name": "Website Redesign",
      "description": "Complete overhaul of the company website"
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-20T14:30:00Z"
  }
  ```

#### PATCH /invitations/:id/reject
- **Description**: Reject an invitation
- **Authentication**: Required
- **Parameters**:
  - `id` (number): Invitation ID
- **Response** (200):
  ```json
  {
    "id": 1,
    "senderId": 1,
    "receiverId": 2,
    "projectId": 1,
    "status": "REJECTED",
    "sender": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "receiver": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "project": {
      "id": 1,
      "name": "Website Redesign",
      "description": "Complete overhaul of the company website"
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-20T14:30:00Z"
  }
  ```

---

## Data Models

### User
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "role": "MEMBER"
}
```

### Project
```json
{
  "id": 1,
  "name": "Website Redesign",
  "description": "Complete overhaul of the company website",
  "dueDate": "2025-12-31",
  "creatorId": 1,
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

### Task
```json
{
  "id": 1,
  "name": "Design homepage mockup",
  "description": "Create a modern homepage design with hero section",
  "startDate": "2025-01-15",
  "endDate": "2025-01-20",
  "projectId": 1,
  "userId": 2,
  "statusId": 1,
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

### TaskStatus
```json
{
  "id": 1,
  "name": "To Do",
  "color": "#FF5733"
}
```

### Invitation
```json
{
  "id": 1,
  "senderId": 1,
  "receiverId": 2,
  "projectId": 1,
  "status": "PENDING",
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

## Enums

### Role
- `ADMIN`
- `MEMBER`

### InvitationStatus
- `PENDING`
- `APPROVED`
- `REJECTED`

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden - Only the creator can perform this action"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "User with this email already exists"
}
```

## Swagger Documentation

Interactive API documentation is available at:
```
http://localhost:3000/api
```

This provides a complete interface to test all endpoints with proper authentication and request/response examples.

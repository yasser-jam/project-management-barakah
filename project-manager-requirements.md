### 1. Authentication System

#### Sign Up
- Full Name (required, min 3 chars)
- Email (required, unique, valid format)
- Password (required, min 8 chars, must contain uppercase, lowercase, number)
- Confirm Password (must match)
- Redirect to login after successful registration

#### Login
- Email and Password fields
- Redirect to home page on success
- Show error for invalid credentials

---

### 2. Project Management (CRUD)

#### Create Project
- Project Name (required, 3-50 chars)
- Project Description (10-500 chars)
- Project Status (Active and Inactive) (required, switch, default: "Inactive")
- Due Date (required, must be today or future date)
- Success notification

#### View Projects
- Display all projects created by current user
- Show as cards/list with: name, due date, task counts
- Indicate overdue projects visually
- Sort by creation date (newest first)
- Empty state with "Create First Project" prompt

#### Update Project
- Edit project name and due date and status and description
- Same validation as create
- Success notification

#### Delete Project
- Only creator can delete
- Confirmation dialog with warning
- Success notification

---

### 3. Task Status Management

#### Predefined Statuses (Static - Cannot be Modified)
1. **To Do** - Planned tasks
2. **In Progress** - Active tasks
3. **In Review** - Awaiting review
4. **Done** - Completed tasks

Display as horizontal Kanban-style columns with task counters.

---

### 4. Task Management (CRUD)

#### Create Task
- Task Name (required, 3-100 chars)
- Description (required, 10-500 chars)
- Status (dropdown with 4 options, default: "To Do")
- Start Date (required, >= today)
- Due Date (required, >= Start Date)
- Validate dates (due date should not exceed project due date)


#### View Tasks
- Display in Kanban board grouped by status
- Each card shows: name, due date, start date, description preview
- Indicate overdue tasks visually
- Sort by due date within columns
- Empty column states

#### View Task Details
- Open dialog/modal with full task information
- Show: name, full description, status, dates, creator
- Action buttons: Edit, Delete, Close

#### Update Task
- Edit all task fields including status
- Creator can edit (all levels)
- Same validation as create
- Move task to new column if status changes

#### Delete Task
- Creator can delete (all levels)
- Confirmation dialog

---

### 5. Move Tasks Between Statuses

#### Option A: Button-Based Movement
- Action buttons on task cards for status changes
- Buttons like: "Start", "Send to Review", "Complete", "Reopen"
- Update task status on click
- Animate task movement to new column

#### Option B: Drag and Drop Movement (Higly Recommended)
- Must implement drag and drop using vue.draggable.next or similar
- Drag task cards between status columns
- Visual feedback during drag (highlight drop zones)
- Smooth animations
- Update task status on drop

---

### 6. Dashboard with Statistics
- Show statistics for projects and tasks
- Show statistics for users
- Show statistics for tasks
- Show statistics for projects
- Show statistics for users
- Show statistics for tasks

---

### 7. Invitation System
- Invite users to projects
- Accept/Reject invitations
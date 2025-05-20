# Task Master - Modern To-Do Application

See it online at [https://clementabcd.github.io/Task-Master/](https://clementabcd.github.io/Task-Master/)

## Overview

Task Master is a sleek, modern web application built with HTML, JavaScript, and TailwindCSS that helps users organize their daily tasks. With an intuitive interface and smooth animations, it offers a pleasant user experience while providing essential task management functionality.

![Task Master Application](placeholder-image)

## Features

### Core Functionality

- **Add Tasks**: Quickly add new tasks to your list
- **Complete Tasks**: Mark tasks as done with a simple checkbox toggle
- **Delete Tasks**: Remove individual tasks when no longer needed
- **Filter Tasks**: View all, active, or completed tasks
- **Clear Completed**: Remove all completed tasks at once
- **Task Counter**: See how many active tasks remain
- **Data Persistence**: Tasks are saved in localStorage and persist between sessions

### User Interface

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Modern Aesthetics**: Clean interface with purple and blue gradient accents
- **Smooth Animations**: Fade-in and fade-out animations when adding or removing tasks
- **Empty State**: Informative message when no tasks match the current filter

## Technical Details

### Technologies Used

- **HTML5**: Application structure and semantic markup
- **JavaScript**: Core functionality and interactivity
- **TailwindCSS**: Styling and responsive design framework
- **LocalStorage API**: Client-side data persistence
- **UUID Library**: Unique identifier generation for tasks

### Code Architecture

The application follows a simple MVC-like pattern:

1. **Data Model**: Tasks are stored as JSON objects with the following properties:
   - `id`: Unique identifier (UUID)
   - `text`: Task description
   - `completed`: Boolean status flag
   - `createdAt`: Timestamp of creation

2. **Core Functions**:
   - `addTodo()`: Creates and adds a new task
   - `toggleTodo()`: Changes the completion status of a task
   - `deleteTodo()`: Removes a task with animation
   - `clearCompleted()`: Removes all completed tasks
   - `filterTodos()`: Changes the current view filter
   - `renderTodos()`: Updates the UI based on current data
   - `updateCounters()`: Updates task counts and UI elements
   - `saveTodos()`: Persists task data to localStorage

### Data Flow

1. User interactions trigger event listeners
2. Event handlers modify the task data
3. Data is saved to localStorage
4. UI is re-rendered to reflect changes

## User Guide

### Adding Tasks

1. Type your task in the input field at the top
2. Press Enter or click the "Add" button
3. Your new task appears at the top of the list

### Managing Tasks

- **Complete a task**: Click the checkbox next to a task
- **Delete a task**: Hover over a task and click the trash icon that appears
- **Filter tasks**: Click "All", "Active", or "Completed" buttons
- **Clear completed tasks**: Click "Clear completed" at the bottom

### Data Persistence

- All changes are automatically saved to your browser's localStorage
- Tasks will remain even if you close the browser or refresh the page
- Data is stored locally on your device and not sent to any server

## Customization Possibilities

The application could be extended with:

- Dark/light theme toggle
- Task categories or tags
- Due dates and reminders
- Priority levels
- Sorting options
- Cloud synchronization
- Sharing capabilities

## Browser Compatibility

Task Master works in all modern browsers that support:
- ES6 JavaScript
- Local Storage API
- CSS Flexbox and Grid
- CSS Animations

## Implementation Notes

The application prioritizes user experience with:
- Immediate feedback for all actions
- Smooth transitions between states
- Clear visual hierarchy
- Intuitive interaction patterns
- Minimal loading time (no external dependencies except TailwindCSS and UUID)

---

*Task Master - Organize your day, accomplish more*

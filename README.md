
# Todo List Micro Frontend

## Overview

This project is a React Micro Frontend (MFE) component that encapsulates a fully functional todo list application. It demonstrates the ability to design and structure a maintainable React application with TypeScript, focusing on code organization, testing, and integration with other host applications.

## Features

- **Todo Creation**: Users can input a new todo task description and add tasks to a list.
- **Todo Status**: Tasks have a checkbox to mark them as completed or incomplete, with visual distinction.
- **Todo Persistence**: Todo items are saved using the browser’s localStorage to persist across page refreshes and sessions.
- **Filters**: Buttons to filter the list by "All", "Active", and "Completed".

## Design and Architectural Choices

- **React & TypeScript**: Ensures type safety and maintainability.
- **React Hooks**: Custom hooks (`useTodos`, `useTodoForm`) for state management and form handling.
- **LocalStorage**: Utilized for persisting todo items.
- **Testing**: Comprehensive unit tests using Jest and React Testing Library to cover core component logic and edge cases.

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd todo-challenge
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the Development Server**:

   ```bash
   pnpm run dev
   ```

4. **Build the Project**:

   ```bash
   pnpm run build
   ```

5. **Run Tests**:

   ```bash
   pnpm run test
   ```

## Thought Process

- **Componentization**: The application is divided into reusable components with clear responsibilities.
- **Custom Hooks**: `useTodos` manages todo states and `useTodoForm` handles form validation and submission.
- **LocalStorage Integration**: Ensures todos persist across sessions.
- **Testing**: Focused on testing both the core logic and user interactions to ensure robustness.

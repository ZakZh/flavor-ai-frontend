# FlavorAI Frontend

Frontend application for FlavorAI - a recipe management platform built with React, TypeScript, Vite, and Redux Toolkit.

## Tech Stack

-   **React 19** - UI library
-   **TypeScript** - Type-safe JavaScript
-   **Vite** - Fast build tool and dev server
-   **Redux Toolkit** - State management
-   **React Router** - Client-side routing
-   **Tailwind CSS** - Utility-first CSS framework
-   **Axios** - HTTP client

## Prerequisites

Before running this application, make sure you have:

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **Backend server** running (see backend README)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root of the frontend directory (if not already present):

```env
VITE_API_URL=http://localhost:3000
```

Make sure the `VITE_API_URL` matches the backend server URL.

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

-   **`npm run dev`** - Start the development server with hot reload
-   **`npm run build`** - Build the application for production
-   **`npm run preview`** - Preview the production build locally
-   **`npm run lint`** - Run ESLint to check code quality

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── forms/       # Form components (Login, Register, Recipe)
│   ├── recipe/      # Recipe-related components
│   └── ui/          # Common UI components
├── hooks/           # Custom React hooks
├── layout/          # Layout components (Header, Layout)
├── pages/           # Page components (routes)
├── services/        # API services (auth, recipes)
├── store/           # Redux store configuration
│   ├── slices/      # Redux slices
│   ├── actions/     # Redux actions
│   └── selectors/   # Redux selectors
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Features

-   User authentication (register/login)
-   Create and manage recipes
-   Browse recipes
-   Rate and review recipes
-   Responsive design with Tailwind CSS

## Building for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### API Connection Issues

Make sure:

1. The backend server is running
2. The `VITE_API_URL` in your `.env` file is correct
3. CORS is properly configured on the backend

## License

UNLICENSED

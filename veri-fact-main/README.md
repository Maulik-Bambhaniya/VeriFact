# VeriFact Frontend

This directory contains the frontend code for the VeriFact fake news detection application.

## Technology Stack

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library

## Directory Structure

```
/
├── src/               # Source code
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── dist/              # Built files (generated)
```

## Development

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Integration with Backend

The frontend communicates with the Flask backend API to analyze news articles. The main API endpoint is:

- `/api` - POST request with form data containing `title`, `author`, and `maintext`

## Component Overview

- **NewsForm**: Form for entering news article details
- **ResultsDisplay**: Displays the analysis result
- **Header**: Application header with dark mode toggle
- **Footer**: Application footer with links and information

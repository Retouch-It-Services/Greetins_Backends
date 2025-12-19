# Greetins Frontend

React frontend with Tailwind CSS for the Greetins greeting card application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Initialize Tailwind CSS:
```bash
npx tailwindcss init -p
```

3. Start development server:
```bash
npm start
```

## Structure

```
frontend/
├── src/
│   ├── pages/           # Main page components
│   │   ├── TemplateSelection.jsx
│   │   └── SendGreeting.jsx
│   ├── api/             # API service functions
│   │   └── greetings.js
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── App.jsx          # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Tailwind CSS imports
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Features

- Template selection with Tailwind styling
- Form validation and submission
- Responsive design
- Loading states and error handling
# Octane Dashboard

## Description

Octane Dashboard is a web application designed for managing orders and user accounts. It features a clean and modern user interface with a side menu for navigation. The application includes:

1. Welcome Page: A dashboard landing page.
2. Orders Overview: Manage and monitor orders with detailed actions such as updating status and viewing details.
3. User Management: Administer user accounts with actions like editing, activating/deactivating, and deleting users.
   The project includes a generic table component that is reusable, highly configurable, and designed with TypeScript integration, enabling customization for various use cases.

# Features

## Front-End

- Developed with React, utilizing TypeScript for type safety.
- State management with Redux Toolkit.
- UI styling with Tailwind CSS.
- Navigation using React Router.

## Back-End

- Powered by JSON Server for mock API.
- CRUD operations for orders and user data.

# How the Project Works

## Front-End

- Clone the repository: `git clone [repo-url](https://github.com/Hayat-Talaat/generic-table-react)`
- Navigate to the front-end folder
- Install dependencies: `npm install`
- Start the development server: `npm run dev`

## Back-End

- Start the JSON Server: `npx json-server --watch db.json --port 5000`
- The mock API will be available at [http://localhost:5000](http://localhost:5000).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

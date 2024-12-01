# Octane Dashboard

**Description**

Octane Dashboard is a web application designed for managing orders and user accounts. It features a clean and modern user interface with a side menu for navigation. The application includes:

1. Welcome Page: A dashboard landing page.
2. Orders Overview: Manage and monitor orders with detailed actions such as updating status and viewing details.
3. User Management: Administer user accounts with actions like editing, activating/deactivating, and deleting users.
   The project includes a generic table component that is reusable, highly configurable, and designed with TypeScript integration, enabling customization for various use cases.

# Features

**Front-End**

- Developed with React, utilizing TypeScript for type safety.
- State management with Redux Toolkit.
- UI styling with Tailwind CSS.
- Navigation using React Router.

**Back-End**

- Powered by JSON Server for mock API.
- CRUD operations for orders and user data.

# How the Project Works

**Front-End**

- Clone the repository: `git clone https://github.com/Hayat-Talaat/generic-table-react`
- Navigate to the front-end folder
- Install dependencies: `npm install`
- Start the development server: `npm run dev`

**Back-End**

- Start the JSON Server: `npx json-server --watch db.json --port 5000`
- The mock API will be available at [http://localhost:5000](http://localhost:5000).

# Project Structure

```
src/
├── api/
│ └── axios.ts # Axios configuration
├── components/
│ ├── GenericTable.tsx # Reusable generic table component
│ ├── Modal.tsx # Modal component
│ ├── Spinner.tsx # Loading spinner
│ └── SideMenu.tsx # Navigation side menu
├── features/
│ ├── orders/
│ │ └── ordersSlice.ts # Redux slice for orders
│ └── users/
│ └── usersSlice.ts # Redux slice for users
├── pages/
│ ├── OrdersOverview.tsx # Orders management page
│ ├── UserManagement.tsx # User management page
│ └── WelcomePage.tsx # Welcome dashboard
├── types/
│ ├── ApiResponse.ts # API response types
│ ├── OrderType.ts # Order-related types
│ └── UserType.ts # User-related types
├── store/
│ └── store.ts # Redux store configuration
├── routes.tsx # Application routes
└── index.tsx # Entry point
```

# API Endpoints

**Orders API**

- GET /orders: Fetch all orders.
- GET /orders/:id: Fetch order details by ID.
- PATCH /orders/:id: Update order status.
- DELETE /orders/:id: Delete an order.

  **Users API**

- GET /users: Fetch all users.
- GET /users/:id: Fetch user details by ID.
- PATCH /users/:id: Update user status.
- DELETE /users/:id: Delete a user.

# Future Improvements

- Integrate a real back-end API.
- Add authentication and authorization for admin roles.
- Enhance the UI/UX with animations and advanced filters.

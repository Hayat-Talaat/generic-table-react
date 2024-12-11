export interface User {
  id: string;
  username: string;
  email: string;
  role?: UserRole;
  isActive?: boolean;
}

export enum UserRole {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}

export interface UsersState {
  users: User[];
  userDetails: User | null;
  loading: boolean;
  error: string | null;
}

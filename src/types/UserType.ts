export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export enum UserRole {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}

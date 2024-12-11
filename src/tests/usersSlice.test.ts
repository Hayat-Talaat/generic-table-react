import { describe, it, expect, vi } from "vitest";
import axios from "../api/axios";
import usersReducer, {
  fetchUsers,
  getUserDetails,
  updateUserStatus,
  deleteUser,
} from "../features/users/usersSlice";
import { UsersState, User } from "../types/UserType";

// Mock axios
vi.mock("../api/axios");
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };
mockedAxios.get = vi.fn();

describe("usersSlice", () => {
  const initialState: UsersState = {
    users: [],
    userDetails: null,
    loading: false,
    error: null,
  };

  it("should return the initial state", () => {
    expect(usersReducer(undefined, { type: "@INIT" })).toEqual(initialState);
  });

  describe("fetchUsers thunk", () => {
    it("should handle fetchUsers.pending", () => {
      const nextState = usersReducer(
        initialState,
        fetchUsers.pending("", undefined)
      );
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBe(null);
    });

    it("should handle fetchUsers.fulfilled", () => {
      const mockUsers: User[] = [
        {
          id: "1",
          username: "John Doe",
          email: "john@example.com",
          isActive: true,
        },
        {
          id: "2",
          username: "Jane Doe",
          email: "jane@example.com",
          isActive: false,
        },
      ];
      const nextState = usersReducer(
        initialState,
        fetchUsers.fulfilled(mockUsers, "", undefined)
      );
      expect(nextState.loading).toBe(false);
      expect(nextState.users).toEqual(mockUsers);
    });

    it("should handle fetchUsers.rejected", () => {
      const nextState = usersReducer(
        initialState,
        fetchUsers.rejected(new Error("Fetch failed"), "", undefined)
      );
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe("Fetch failed");
    });
  });

  describe("getUserDetails thunk", () => {
    it("should handle getUserDetails.fulfilled", () => {
      const mockUser: User = {
        id: "1",
        username: "John Doe",
        email: "john@example.com",
        isActive: true,
      };
      const nextState = usersReducer(
        initialState,
        getUserDetails.fulfilled(mockUser, "", "1")
      );
      expect(nextState.loading).toBe(false);
      expect(nextState.userDetails).toEqual(mockUser);
    });

    it("should handle getUserDetails.rejected", () => {
      const nextState = usersReducer(
        initialState,
        getUserDetails.rejected(new Error("Fetch failed"), "", "1")
      );
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe("Fetch failed");
    });
  });

  describe("updateUserStatus thunk", () => {
    it("should handle updateUserStatus.fulfilled", () => {
      const previousState: UsersState = {
        ...initialState,
        users: [
          {
            id: "1",
            username: "John Doe",
            email: "john@example.com",
            isActive: false,
          },
        ],
      };
      const nextState = usersReducer(
        previousState,
        updateUserStatus.fulfilled({ id: "1", isActive: true }, "", {
          id: "1",
          isActive: true,
        })
      );
      expect(nextState.users[0].isActive).toBe(true);
    });
  });

  describe("deleteUser thunk", () => {
    it("should handle deleteUser.fulfilled", () => {
      const previousState: UsersState = {
        ...initialState,
        users: [
          {
            id: "1",
            username: "John Doe",
            email: "john@example.com",
            isActive: true,
          },
        ],
      };
      const nextState = usersReducer(
        previousState,
        deleteUser.fulfilled("1", "", "1")
      );
      expect(nextState.users.length).toBe(0);
    });
  });
});

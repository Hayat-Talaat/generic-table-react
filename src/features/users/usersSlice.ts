import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { User } from "../../types/UserType";

interface UsersState {
  users: User[];
  userDetails: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  userDetails: null,
  loading: false,
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get<User[]>("/users");
    return response.data;
  }
);

// Fetch user details by ID
export const getUserDetails = createAsyncThunk<User, string>(
  "users/getUserDetails",
  async (userId: string) => {
    const response = await axios.get<User>(`/users/${userId}`);
    return response.data;
  }
);

// Update user status (activate/deactivate)
export const updateUserStatus = createAsyncThunk<
  { id: string; isActive: boolean },
  { id: string; isActive: boolean }
>(
  "users/updateUserStatus",
  async ({ id, isActive }: { id: string; isActive: boolean }) => {
    await axios.patch(`/users/${id}`, { isActive });
    return { id, isActive };
  }
);

// Delete a user
export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (userId: string) => {
    await axios.delete(`/users/${userId}`);
    return userId;
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      })
      // Get user details
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.userDetails = action.payload;
        }
      )
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details.";
      })
      // Update user status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<{ id: string; isActive: boolean }>) => {
          state.loading = false;
          const { id, isActive } = action.payload;
          const user = state.users.find((user) => user.id === id);
          if (user) {
            user.isActive = isActive;
          }
        }
      )
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user status.";
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const userId = action.payload;
        state.users = state.users.filter((user) => user.id !== userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user.";
      });
  },
});

export default usersSlice.reducer;

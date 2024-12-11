import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { User, UsersState } from "../../types/UserType";
import { addNotification } from "../notifications/notificationsSlice";

const initialState: UsersState = {
  users: [],
  userDetails: null,
  loading: false,
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get<User[]>("/users");
      dispatch(addNotification("Users fetched successfully!"));
      return response.data;
    } catch (error) {
      dispatch(addNotification("Failed to fetch users."));
      throw error;
    }
  }
);

// Fetch user details by ID
export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (userId: string, { dispatch }) => {
    try {
      const response = await axios.get<User>(`/users/${userId}`);
      dispatch(addNotification("User details fetched successfully!"));
      return response.data;
    } catch (error) {
      dispatch(addNotification("Failed to fetch user details."));
      throw error;
    }
  }
);

// Update user status (activate/deactivate)
export const updateUserStatus = createAsyncThunk(
  "users/updateUserStatus",
  async ({ id, isActive }: { id: string; isActive: boolean }, { dispatch }) => {
    try {
      await axios.patch(`/users/${id}`, { isActive });
      dispatch(
        addNotification(`User with ID ${id} status updated successfully.`)
      );
      return { id, isActive };
    } catch (error) {
      dispatch(addNotification("Failed to update user status."));
      throw error;
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { dispatch }) => {
    try {
      await axios.delete(`/users/${userId}`);
      dispatch(addNotification(`User with ID ${userId} deleted successfully.`));
      return userId;
    } catch (error) {
      dispatch(addNotification(`Failed to delete user with ID ${userId}.`));
      throw error;
    }
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

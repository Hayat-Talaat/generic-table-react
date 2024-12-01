import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import { User, UserRole } from "../../types/UserType";

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

// Async Thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get<User[]>("/users");
  return response.data;
});

export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ id, role }: { id: string; role: string }) => {
    await axiosInstance.patch(`/users/${id}`, { role });
    return { id, role };
  }
);

export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (id: string) => {
    await axiosInstance.patch(`/users/${id}/status`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload.id);
        if (user) user.role = action.payload.role as UserRole;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload);
        if (user) user.isActive = !user.isActive;
      });
  },
});

export default usersSlice.reducer;

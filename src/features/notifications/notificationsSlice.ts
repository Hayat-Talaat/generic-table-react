import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationsState } from "../../types/NotificationType";

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<string>) => {
      const id = new Date().toISOString(); // Unique ID for notifications
      state.notifications.push({ id, message: action.payload, type: "info" });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;

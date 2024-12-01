import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/orders/ordersSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

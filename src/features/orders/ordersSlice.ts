import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Order,
  GetOrderDetailsResponse,
  UpdateOrderStatusRequest,
} from "../../types/OrderType";
import axios from "../../api/axios";
import { addNotification } from "../notifications/notificationsSlice";

interface OrdersState {
  orders: Order[];
  orderDetails: GetOrderDetailsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
};

// Async actions
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get<Order[]>("/orders");
      dispatch(addNotification("Orders fetched successfully!"));
      return response.data;
    } catch (error) {
      dispatch(addNotification("Failed to fetch users."));
      throw error;
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId: string, { dispatch }) => {
    try {
      const response = await axios.get<GetOrderDetailsResponse>(
        `/orders/${orderId}`
      );
      dispatch(addNotification("Order details fetched successfully!"));
      return response.data;
    } catch (error) {
      dispatch(addNotification("Failed to fetch order details."));
      throw error;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async (updateRequest: UpdateOrderStatusRequest, { dispatch }) => {
    try {
      const response = await axios.patch(
        `/orders/${updateRequest.id}`,
        updateRequest
      );
      dispatch(addNotification("Order status updated successfully!"));
      return response.data;
    } catch (error) {
      dispatch(addNotification("Failed to update order status."));
      throw error;
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId: string, { dispatch }) => {
    try {
      await axios.delete(`/orders/${orderId}`);
      dispatch(
        addNotification(`Order with ID ${orderId} deleted successfully.`)
      );
      return orderId;
    } catch (error) {
      dispatch(addNotification(`Failed to delete order with ID ${orderId}.`));
      throw error;
    }
  }
);

// Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      })

      // deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.orders = state.orders.filter((o) => o.id !== action.payload);
          state.loading = false;
        }
      )
      .addCase(deleteOrder.rejected, (state) => {
        state.loading = false;
      })

      // Fetch order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.orderDetails = null;
      })
      .addCase(
        fetchOrderDetails.fulfilled,
        (state, action: PayloadAction<GetOrderDetailsResponse>) => {
          state.orderDetails = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrderDetails.rejected, (state) => {
        state.loading = false;
        state.orderDetails = null;
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order.id === updatedOrder.id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;

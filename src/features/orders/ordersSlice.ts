import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Order,
  GetOrderDetailsResponse,
  UpdateOrderStatusRequest,
} from "../../types/OrderType";
import axiosInstance from "../../api/axios";

interface OrdersState {
  orders: Order[];
  orderDetails: GetOrderDetailsResponse | null;
  loading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  orderDetails: null,
  loading: false,
};

// Async actions
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axiosInstance.get<Order[]>("/orders");
  return response.data;
});

export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId: string) => {
    const response = await axiosInstance.get<GetOrderDetailsResponse>(
      `/orders/${orderId}`
    );
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async (updateRequest: UpdateOrderStatusRequest) => {
    const response = await axiosInstance.patch(
      `/orders/${updateRequest.id}`,
      updateRequest
    );
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId: string) => {
    await axiosInstance.delete(`/orders/${orderId}`);
    return orderId;
  }
);

// Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  fetchOrderDetails,
  updateOrderStatus,
  deleteOrder,
} from "../features/orders/ordersSlice";
import { RootState, AppDispatch } from "../store";
import GenericTable from "../components/Table";
import { Order, OrderStatus } from "../types/OrderType";
import { Column } from "../types/TableTypes";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

const OrdersOverview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, orderDetails } = useSelector(
    (state: RootState) => state.orders
  );

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleViewDetails = (orderId: string) => {
    setModalOpen(true);
    dispatch(fetchOrderDetails(orderId));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
    dispatch(fetchOrders());
  };

  const columns: Column<Order>[] = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer Name", accessor: "customerName" },
    {
      header: "Order Date",
      accessor: "orderDate",
      render: (value) => {
        if (typeof value === "string") {
          return new Date(value).toLocaleDateString();
        }
        return value;
      },
    },
    { header: "Status", accessor: "status" },
    {
      header: "Total Amount",
      accessor: "totalAmount",
      render: (value) => {
        if (typeof value === "number") {
          return `$${value.toFixed(2)}`;
        }
        return value;
      },
    },
  ];

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : Array.isArray(orders) ? (
        <GenericTable
          data={orders || []}
          columns={columns}
          actions={(order: Order) => (
            <div className="flex gap-2">
              <button
                onClick={() => handleViewDetails(order.id)}
                className="text-blue-500 hover:underline"
              >
                View
              </button>
              <select
                value={order.status}
                onChange={(e) =>
                  handleUpdateStatus(order.id, e.target.value as OrderStatus)
                }
                className="border p-1 rounded"
              >
                {Object.values(OrderStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        />
      ) : (
        <p>No data available.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {loading ? (
          <Spinner />
        ) : orderDetails ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Order ID:</span>
              <span>{orderDetails.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Customer Name:</span>
              <span>{orderDetails.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Order Date:</span>
              <span>
                {new Date(orderDetails.orderDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Status:</span>
              <span
                className={`px-2 py-1 rounded text-white ${
                  orderDetails.status === "Pending"
                    ? "bg-yellow-500"
                    : orderDetails.status === "Shipped"
                    ? "bg-blue-500"
                    : orderDetails.status === "Delivered"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {orderDetails.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Total Amount:</span>
              <span className="text-blue-600 font-bold">
                ${orderDetails.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No details available.</p>
        )}
      </Modal>
    </div>
  );
};

export default OrdersOverview;

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
          <div className="flex justify-center items-center py-8">
            <Spinner />
          </div>
        ) : orderDetails ? (
          <div className="space-y-6">
            {[
              { label: "Order ID", value: orderDetails.id },
              { label: "Customer Name", value: orderDetails.customerName },
              {
                label: "Order Date",
                value: new Date(orderDetails.orderDate).toLocaleDateString(),
              },
              {
                label: "Status",
                value: (
                  <span
                    className={`px-2 py-1 rounded font-bold text-white ${
                      {
                        Pending: "bg-yellow-500",
                        Shipped: "bg-blue-500",
                        Delivered: "bg-green-500",
                        Cancelled: "bg-red-500",
                      }[orderDetails.status] || "bg-red-500"
                    }`}
                  >
                    {orderDetails.status}
                  </span>
                ),
              },
              {
                label: "Total Amount",
                value: (
                  <span className="text-blue-600 font-bold">
                    ${orderDetails.totalAmount.toFixed(2)}
                  </span>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b last:border-b-0 pb-2"
              >
                <span className="font-medium text-gray-600">{item.label}:</span>
                <span className="text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No details available.</p>
        )}
      </Modal>
    </div>
  );
};

export default OrdersOverview;

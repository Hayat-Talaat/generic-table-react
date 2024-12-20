import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchUsers,
  getUserDetails,
  updateUserStatus,
  deleteUser,
} from "../features/users/usersSlice";
// types
import { User } from "../types/UserType";
import { Column } from "../types/TableTypes";
// components
import GenericTable from "../components/Table";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, userDetails } = useSelector(
    (state: RootState) => state.users
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditUser = (userId: string) => {
    setModalOpen(true);
    dispatch(getUserDetails(userId));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleToggleStatus = (userId: string, isActive: boolean) => {
    dispatch(updateUserStatus({ id: userId, isActive: !isActive }));
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const columns: Column<User>[] = [
    { header: "User ID", accessor: "id" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    {
      header: "Role",
      accessor: "role",
      render: (value) => <span className="capitalize">{value}</span>,
    },
    {
      header: "Active Status",
      accessor: "isActive",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            value ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : Array.isArray(users) ? (
        <GenericTable
          data={users || []}
          columns={columns}
          actions={(user: User) => (
            <div className="flex gap-2">
              <button
                onClick={() => handleEditUser(user.id)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleToggleStatus(user.id, user.isActive)}
                className={`text-white px-2 py-1 rounded ${
                  user.isActive ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spinner />
          </div>
        ) : userDetails ? (
          <div className="space-y-6">
            {[
              { label: "User ID", value: userDetails.id },
              { label: "Username", value: userDetails.username },
              { label: "Email", value: userDetails.email },
              { label: "Role", value: userDetails.role },
              {
                label: "Active Status",
                value: userDetails.isActive ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Inactive</span>
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

export default UserManagement;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchUsers,
  updateUserRole,
  toggleUserStatus,
} from "../features/users/usersSlice";
import { User, UserRole } from "../types/UserType";
import GenericTable from "../components/Table";
import Spinner from "../components/Spinner";

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (id: string, role: UserRole) => {
    dispatch(updateUserRole({ id, role }));
  };

  const handleToggleStatus = (id: string) => {
    dispatch(toggleUserStatus(id));
  };

  const columns = [
    { header: "User ID", accessor: "id" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    {
      header: "Role",
      accessor: "role",
      render: (value: string, row: User) => (
        <select
          value={value}
          onChange={(e) => handleRoleChange(row.id, e.target.value as UserRole)}
          className="border p-1 rounded"
        >
          {Object.values(UserRole).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: "Active Status",
      accessor: "isActive",
      render: (value: boolean, row: User) => (
        <button
          onClick={() => handleToggleStatus(row.id)}
          className={`px-2 py-1 rounded text-white ${
            value ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </button>
      ),
    },
  ];

  return (
    <div>
      {loading ? <Spinner /> : <GenericTable data={users} columns={columns} />}
    </div>
  );
};

export default UserManagement;

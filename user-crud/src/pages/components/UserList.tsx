import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api/userService";
import { User } from "../../types";

interface UserListProps {
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

export default function UserList({ onEdit, onView }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, [users]);

  const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  return (
    <div className="container mx-auto p-2 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">User List</h2>
      <div className="max-h-70 overflow-x-scroll border rounded-lg p-1">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
                <div>
                  <p className="text-lg font-semibold text-gray-700">{user.user} ({user.age} years old)</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => user._id && handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    onClick={() => onView(user)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

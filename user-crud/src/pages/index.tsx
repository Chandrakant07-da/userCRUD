import { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { User } from "../types";
import UserModal from "./components/UserModal";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [viewUser, setViewUser] = useState<User | null>(null); // For viewing user

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 shadow-md p-3 bg-white rounded-lg">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-gray-50 p-5 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create / Edit User</h2>
          <UserForm user={selectedUser} onSuccess={() => setSelectedUser(undefined)} />
        </div>
        <div className="bg-gray-50 p-5 rounded-lg shadow-md border">
          <UserList onEdit={setSelectedUser} onView={setViewUser} />
        </div>
      </div>

      {/* View User Modal */}
      {viewUser && <UserModal user={viewUser} onClose={() => setViewUser(null)} />}
    </div>
  );
}

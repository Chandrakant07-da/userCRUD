import { useState, useEffect } from "react";
import { createUser, updateUser } from "../api/userService";
import { User } from "../../types";
import Input from "./Input"

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
  const [formData, setFormData] = useState<User>(
    user || { _id: "", user: "", email: "", age: 0, mobile: "", interest: [] }
  );

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "interest" ? value.split(",").map((i) => i.trim()) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user?._id) {
      await updateUser(user._id, formData);
    } else {
      await createUser(formData);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{user ? "Edit User" : "Create User"}</h2>

      <div className="grid grid-cols-2 gap-4 text-black">
        <Input name="user" placeholder="Name" value={formData.user} onChange={handleChange} />
        <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <Input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} />
        <Input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
        <Input
          name="interest"
          placeholder="Interests (comma-separated)"
          value={formData.interest.join(", ")}
          onChange={handleChange}
          className="col-span-2"
        />
      </div>

      <button className="bg-blue-500 text-white p-2 w-full mt-4 rounded hover:bg-blue-600 transition duration-200">
        {user ? "Update" : "Create"} User
      </button>
    </form>
  );
}


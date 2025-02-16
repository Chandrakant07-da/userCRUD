import { User } from "../../types";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-black">User Details</h2>
        <p className="text-black"><strong>Name:</strong> {user.user}</p>
        <p className="text-black"><strong>Email:</strong> {user.email}</p>
        <p className="text-black"><strong>Age:</strong> {user.age}</p>
        <p className="text-black"><strong>Mobile:</strong> {user.mobile}</p>
        <p className="text-black"><strong>Interests:</strong> {user.interest.join(", ")}</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
}

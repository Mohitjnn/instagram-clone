// app/user-profile/page.jsx
import React from "react";

const UserProfile = ({ params }) => {
  // Dummy data based on params.id
  const userId = params.id;
  const userData = {
    name: "John Doe",
    email: `user${userId}@example.com`,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    address: "1234 Street Name, City, State, Zip",
    phone: "123-456-7890",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">User ID:</div>
          <div className="text-gray-900">{userId}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Name:</div>
          <div className="text-gray-900">{userData.name}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Email:</div>
          <div className="text-gray-900">{userData.email}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Bio:</div>
          <div className="text-gray-900">{userData.bio}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Address:</div>
          <div className="text-gray-900">{userData.address}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Phone:</div>
          <div className="text-gray-900">{userData.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

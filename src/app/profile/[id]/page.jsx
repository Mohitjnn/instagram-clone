"use client";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const userId = params.id;
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/users/me", {
        method: "GET",
        credentials: "include", // Ensure cookies are included in the request
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const { data } = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

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
          <div className="text-gray-900">{userData.phoneNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

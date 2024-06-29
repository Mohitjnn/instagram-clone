import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserProfile = async ({ params }) => {
  const userId = params.id;

  let user = null;
  let error = null;

  // try {
  //   // Read the token from cookies
  //   const cookieStore = cookies();
  //   const token = cookieStore.get("token")?.value; // Correctly extract the token value as a string

  //   if (!token) {
  //     redirect("/login");
  //   }
  try {
    // Fetch user data from the API route
    const response = await fetch(`http://192.168.29.147:3000/api/users/me`, {
      method: "POST", // Change to POST for sending data
      body: JSON.stringify({
        // Convert data to JSON string
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    user = await response.json();
  } catch (err) {
    error = err.message || "Error loading user profile";
    console.error("Error fetching user profile:", err.message);
  }

  if (error) {
    return <div>{error}</div>;
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
          <div className="text-gray-900">{user.name}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Email:</div>
          <div className="text-gray-900">{user.email}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Bio:</div>
          <div className="text-gray-900">{user.bio}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Address:</div>
          <div className="text-gray-900">{user.address}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Phone:</div>
          <div className="text-gray-900">{user.phoneNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

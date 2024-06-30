const UserProfile = async ({ params }) => {
  const userId = params.id;

  let user = null;
  let error = null;

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

  // Dummy data fallback
  const dummyData = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A passionate developer.",
    address: "123 Main St, Anytown, USA",
    phoneNumber: "123-456-7890",
  };

  // Use dummy data if there was an error or if the user is not found
  const displayUser = error || !user ? dummyData : user;

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
          <div className="text-gray-900">{displayUser.name}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Email:</div>
          <div className="text-gray-900">{displayUser.email}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Bio:</div>
          <div className="text-gray-900">{displayUser.bio}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Address:</div>
          <div className="text-gray-900">{displayUser.address}</div>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 text-sm font-bold">Phone:</div>
          <div className="text-gray-900">{displayUser.phoneNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// app/api/users/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import userModel from "@/models/userModel";

export async function POST(req) {
  // Connect to the database
  await dbConnect();
  try {
    // Extract user data from the request body
    const { userId } = await req.json();

    // Validate user ID (optional, add your validation logic here)
    if (!userId) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    // Fetch the user details excluding password and isVerified fields
    const user = await userModel
      .findOne({ userName: userId }) // Use _id for user identification
      .select("-password -isVerified");

    // If the user data is not found, throw an error
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Send the user data as JSON
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

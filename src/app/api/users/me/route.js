import { getDataFromToken } from "@/helpers/GetDataFromToken";
import { NextResponse } from "next/server";
import userModel from "@/models/userModel";
import dbConnect from "@/lib/db";

export async function GET(request) {
  await dbConnect();
  // console.log(request);
  try {
    const userId = await getDataFromToken(request);

    const user = await userModel
      .findOne({ _id: userId })
      .select("-password -isVerified");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error) {
    console.log("Error:", error.message); // Log the error
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

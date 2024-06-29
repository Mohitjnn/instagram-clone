import dbConnect from "@/lib/db";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await dbConnect();
  try {
    const userData = await request.json();
    const { email, password } = userData;

    const user = await userModel.findOne({ email }).exec();

    if (!user) {
      return NextResponse.json(
        { error: "User does not Exist, please sign up" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      userName: user.userName,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

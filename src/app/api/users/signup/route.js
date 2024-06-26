import dbConnect from "@/lib/db";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  try {
    const userData = await request.json();
    const { name, userName, email, password, phoneNumber, address, bio } =
      userData;
    console.log(userData);

    const user = await userModel.findOne({ email }).exec();

    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    //depending on the framework used the number of rounds for salting can vary

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new userModel({
      name,
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      bio,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json(
      { message: "User Created Successfully", success: true, savedUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

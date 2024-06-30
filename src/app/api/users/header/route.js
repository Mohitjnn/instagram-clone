// app/api/header/route.js
import { NextResponse } from "next/server";
import getDataFromToken from "@/helper/GetDataFromToken";

export async function GET() {
  try {
    const tokenData = getDataFromToken();
    return NextResponse.json({ userName: tokenData.userName });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve token data" },
      { status: 401 }
    );
  }
}

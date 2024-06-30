import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const getDataFromToken = (request) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token provided.");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Unauthorized: Invalid token.");
    }
    throw new Error("Error verifying token.");
  }
};

export default getDataFromToken;

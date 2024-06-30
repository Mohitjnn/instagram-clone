import dbConnect from "@/lib/db";
import posts from "@/models/Posts";
import { NextResponse } from "next/server";
import getDataFromToken from "@/helper/GetDataFromToken";

export async function GET() {
  await dbConnect();

  try {
    const postList = await posts.find({}).exec();
    return NextResponse.json(postList);
  } catch (error) {
    console.error("Error fetching Postlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch postslist. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const decodedToken = getDataFromToken();
    const newPost = await request.json();

    newPost.userName = decodedToken.userName;

    const createdPost = await posts.create(newPost);

    return NextResponse.json(createdPost);
  } catch (error) {
    console.error("Error adding new post:", error);
    return NextResponse.json(
      { error: "Failed to add post. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  await dbConnect();
  const { postTitle, userName } = await request.json(); // Ensure you're correctly parsing the request body

  try {
    const decodedToken = getDataFromToken();
    if (userName !== decodedToken.userName) {
      return NextResponse.json(
        { success: false, error: "User not authorized to delete this post." },
        { status: 403 }
      );
    }
    const result = await posts.deleteOne({ title: postTitle }); // Assuming `title` is the field to match
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post. Please try again." },
      { status: 500 }
    );
  }
}

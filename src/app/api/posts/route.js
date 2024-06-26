import dbConnect from "@/lib/db";
import posts from "@/model/posts";
import { NextResponse } from "next/server";

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
    const newPost = await request.json();
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

  const { postTitle } = await request.json(); // Ensure you're correctly parsing the request body

  try {
    await posts.deleteOne({ title: postTitle }); // Assuming `title` is the field to match
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post. Please try again." },
      { status: 500 }
    );
  }
}

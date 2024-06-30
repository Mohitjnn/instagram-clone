import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  userName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  reactions: {
    likes: {
      type: Number,
      required: true,
    },
    dislikes: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.models.posts || mongoose.model("posts", PostsSchema);

import mongoose from "mongoose";

const Post = new mongoose.Schema({
	name: { type: "string", required: true },
	prompt: { type: "string", required: true },
	image: { type: "string", required: true },
	createdDate: { type: Date, required: true },
});

const PostSchema = mongoose.model("post", Post);
export default PostSchema;

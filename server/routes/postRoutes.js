import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// get all posts with search sort and pagination
router.route("/").get(async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 10;
		const page = parseInt(req.query.page) || 1;
		const searchKeyword = req.query.search || "";

		const skip = (page - 1) * limit;

		const totalResults = await Post.countDocuments({
			$or: [
				{ name: { $regex: searchKeyword, $options: "i" } },
				{ prompt: { $regex: searchKeyword, $options: "i" } },
			],
		});

		const posts = await Post.find({
			$or: [
				{ name: { $regex: searchKeyword, $options: "i" } },
				{ prompt: { $regex: searchKeyword, $options: "i" } },
			],
		})
			.sort({ createdDate: -1 })
			.skip(skip)
			.limit(limit);

		res.status(200).json({ success: true, data: posts, totalResults });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

// create a post
router.route("/create").post(async (req, res) => {
	try {
		const { name, prompt, image, createdDate } = req.body;
		const photoUrl = await cloudinary.uploader.upload(image);
		const newPost = await Post.create({
			name,
			prompt,
			image: photoUrl.url,
			createdDate,
		});

		res.status(201).json({ success: true, data: newPost });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
});

export default router;

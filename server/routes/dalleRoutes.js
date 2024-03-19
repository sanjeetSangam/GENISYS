import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

router.route("/").get((req, res) => {
  res.send("hello dalle");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = response.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(500).send(error.data);
    } else {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

export default router;

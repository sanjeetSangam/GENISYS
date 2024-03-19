import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config(); // import env variables

const app = express(); // initialize application

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// routes
app.use("/api/posts", postRoutes);
app.use("/api/dalle", dalleRoutes);

// default get route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to AI Image Generator",
  });
});

// funtion to start the server
const port = 8080;
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log("Starting server sucessfully... on " + port)
    );
  } catch (error) {
    console.log(err);
  }
};

startServer();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { pool } from "./db.js";
import { redisClient } from "./redis.js";
dotenv.config();
pool.query("SELECT NOW()")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));



const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/feed", async (req, res) => {
  try {

    const cachedFeeds = await redisClient.get("feeds");

    if (cachedFeeds) {

      console.log("Cache Hit");

      return res.json(JSON.parse(cachedFeeds));
    }

    console.log("Cache Miss");

    const result = await pool.query(
      "SELECT * FROM feeds ORDER BY created_at DESC"
    );

    await redisClient.set(
      "feeds",
      JSON.stringify(result.rows)
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

app.post("/feed", async (req, res) => {
  try {

    console.log(req.body);

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const result = await pool.query(
      "INSERT INTO feeds (message) VALUES ($1) RETURNING *",
      [message]
    );

    const newFeed = result.rows[0];

    // Clear Redis cache
    await redisClient.del("feeds");

    // Emit realtime event
    io.emit("new_feed", newFeed);

    res.status(201).json(newFeed);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
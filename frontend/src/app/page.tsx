"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

interface Feed {
  id: number;
  message: string;
  created_at: string;
}


  const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL!
);


export default function Home() {

  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {

    fetchFeeds();

    socket.on("new_feed", (newFeed: Feed) => {

      console.log("Realtime Feed:", newFeed);

      setFeeds((prevFeeds) => [
        newFeed,
        ...prevFeeds,
      ]);
    });

    return () => {

      socket.off("new_feed");
    };

  }, []);

  const fetchFeeds = async () => {

    try {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/feed`
      );

      setFeeds(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        SyncUp Feed
      </h1>

      <div className="space-y-4">

        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="border p-4 rounded-lg"
          >
            <p>{feed.message}</p>
          </div>
        ))}

      </div>

    </div>
  );
}
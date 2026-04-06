"use client";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/Posts/getPosts";
import { IPost } from "@/utils/types";

export default function Home() {
  const [postsCards, setPostsCards] = useState<IPost[]>([]);
  
  useEffect(() => {
    getPosts().then(setPostsCards)
  },[])

  return (
    <main>
      <Header></Header>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl m-3 mb-7 text-white">Recent Posts:</h1>
        {postsCards.map((postCard) => <PostCard id={postCard.id} title={postCard.title} description={postCard.description} created_at={postCard.created_at}></PostCard>)}
      </div>
    </main>
  );
}
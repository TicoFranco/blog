"use client";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { getPosts } from "./services/Posts/getPosts";
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
        {postsCards.map((postCard) => <PostCard key={postCard.id} id={postCard.id} title={postCard.title} description={postCard.description} updatedAt={postCard.updatedAt} editable={false}></PostCard>)}
      </div>
    </main>
  );
}
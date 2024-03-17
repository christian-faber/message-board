import React, { useEffect, useState } from "react";
import Post from "./Post";

interface PostData {
  id: string;
  post: string;
}

const Board: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} postText={post.post} />
      ))}
    </div>
  );
};

export default Board;

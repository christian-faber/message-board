import React, { useEffect, useState } from "react";
import Post from "./Post";
import "../styles/board.css";

interface PostData {
  _id: string;
  post: string;
}

const Board: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/posts");
      const { data } = await response.json();
      setPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="board">
      {posts.length &&
        posts.map((post) => <Post key={post._id} postText={post.post} />)}
    </div>
  );
};

export default Board;

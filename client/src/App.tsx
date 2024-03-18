import { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/Post";

interface PostData {
  _id: string;
  post: string;
}

function App() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const { data } = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      fetchPosts();

      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const updatePost = async (postId: string, newText: string) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: newText }),
      });

      console.log("updatePost,id & new text", postId, newText);

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      fetchPosts();

      console.log("Post updated successfully");
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: post }),
      });

      if (!response.ok) {
        throw new Error("Failed to post message");
      }

      setPost("");

      fetchPosts();
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  return (
    <div>
      <div className="board">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              postText={post.post}
              deletePost={deletePost}
              updatePost={updatePost}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Howzit?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

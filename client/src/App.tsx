import { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/Post";

function App() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/posts");
      const { data } = await response.json();
      setPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPost("");
    console.log("Post is good");
    console.log(post);

    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: post }),
    });

    if (!response.ok) {
      console.log(response);
      console.error("Failed to post message");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Howzit?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {posts.length &&
          posts.map((post) => <Post key={post._id} postText={post.post} />)}
      </div>
    </div>
  );
}

export default App;

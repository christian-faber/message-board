import { useState } from "react";

interface Status {
  onSubmit: (post: string) => void;
}

const Status: React.FC<Status> = () => {
  const [post, setPost] = useState("");

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Howzit?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Status;

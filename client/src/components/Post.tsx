import "../styles/post.css";
import { useState, useEffect } from "react";

interface PostProps {
  postText: string;
  postId: string;
  deletePost: (postId: string) => void;
  updatePost: (postId: string, newText: string) => void;
}

const Post: React.FC<PostProps> = ({
  postText,
  postId,
  deletePost,
  updatePost,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(postText);

  useEffect(() => {
    setEditText(postText);
    console.log("useEffect", postText);
  }, [postText]);

  return (
    <div className="post">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={() => {
              updatePost(postId, editText);
              console.log("check", postId, editText);
              setIsEditing(false);
            }}
          >
            ✅
          </button>
        </>
      ) : (
        <>
          <p>{postText}</p>
          <button onClick={() => setIsEditing(!isEditing)}>✏️</button>
          <button onClick={() => deletePost(postId)}>🗑️</button>
        </>
      )}
    </div>
  );
};

export default Post;

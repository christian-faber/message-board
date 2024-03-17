import "../styles/post.css";
interface PostProps {
  postText: string;
  postId: string;
  deletePost: (postId: string) => void;
}

const Post: React.FC<PostProps> = ({ postText, postId, deletePost }) => {
  const handleDelete = () => {
    deletePost(postId);
  };
  return (
    <div className="post">
      <p>{postText}</p>
      <button onClick={handleDelete}>🗑️</button>
    </div>
  );
};

export default Post;

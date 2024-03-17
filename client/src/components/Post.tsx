import "../styles/post.css";
interface PostProps {
  postText: string;
}

const Post: React.FC<PostProps> = ({ postText }) => {
  return (
    <div className="post">
      <p>{postText}</p>
    </div>
  );
};

export default Post;

interface PostProps {
  postText: string;
}

const Post: React.FC<PostProps> = ({ postText }) => {
  return (
    <div>
      <p>{postText}</p>
    </div>
  );
};

export default Post;

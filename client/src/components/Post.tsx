import Comment from "./Comment";

interface PostProps {
  userProfilePic: string;
  postText: string;
  likes: number;
  dislikes: number;
  onLike: () => void;
  onDislike: () => void;
  onComment: () => void;
}

const Post: React.FC<PostProps> = ({
  userProfilePic,
  postText,
  likes,
  dislikes,
  onLike,
  onDislike,
  onComment,
}) => {
  return (
    <div>
      <img src={userProfilePic} alt="User Profile" />
      <p>{postText}</p>
      <button onClick={onLike}>Like ({likes})</button>
      <button onClick={onDislike}>Dislike ({dislikes})</button>
      <button onClick={onComment}>Add Comment</button>
      {/* map through comments */}
      <Comment />
    </div>
  );
};

export default Post;

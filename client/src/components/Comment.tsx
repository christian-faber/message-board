interface CommentProps {
  userProfilePic: string;
  postText: string;
  likes: number;
  dislikes: number;
  onLike: () => void;
  onDislike: () => void;
  onComment: () => void;
}

const Comment: React.FC<CommentProps> = ({
  userProfilePic,
  postText,
  likes,
  onLike,
  onComment,
}) => {
  return (
    <div>
      <img src={userProfilePic} alt="User Profile" />
      <p>{postText}</p>
      <button onClick={onLike}>Like ({likes})</button>
      <button onClick={onComment}>Add Comment</button>
    </div>
  );
};

export default Comment;

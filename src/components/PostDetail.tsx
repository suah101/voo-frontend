import React from 'react';
import './PostDetail.css';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface PostDetailProps {
  post: Post;
  onClose: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  console.log("Displaying details for post:", post);

  return (
    <div className="post-detail-modal">
      <div className="post-detail-content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <small>작성일: {new Date(post.createdAt).toLocaleDateString()}</small>
        <button onClick={onClose} className="close-btn">닫기</button>
      </div>
    </div>
  );
};

export default PostDetail;

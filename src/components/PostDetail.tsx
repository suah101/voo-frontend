import React from 'react';
import './PostDetail.css';

interface Post {
  record_id: number; // 수정: record_id로 변경
  title: string;
  content: string;
  createdAt: string;
  tags?: string[]; // 태그 정보를 배열로 추가
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

        {/* 태그 목록 표시 */}
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            <h4>태그:</h4>
            <ul>
              {post.tags.map((tag, index) => (
                <li key={index} className="tag-item">{tag}</li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={onClose} className="close-btn">닫기</button>
      </div>
    </div>
  );
};

export default PostDetail;

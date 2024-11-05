import React, { useEffect, useState } from 'react';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import './PostList.css';

interface Post {
  id: number;
  user_id: number;  // 추가된 필드
  title: string;
  content: string;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  actual_address?: string;
  travel_date?: string;
  createdAt: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      console.log("Fetching posts from server...");
      const response = await fetch('http://localhost:3000/api/travel-records');
      const data = await response.json();
      console.log("Fetched data:", data);
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setFormVisible(false);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await fetch(`http://localhost:3000/api/travel-records/${postId}`, {
        method: 'DELETE',
      });
      setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
      setSuccessMessage('게시물이 삭제되었습니다!');
    } catch (error) {
      console.error("Error deleting post:", error);
      setSuccessMessage('게시물 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="post-list">
      <h1>게시판</h1>
      <button onClick={() => { setFormVisible(true); setSelectedPost(null); }}>새 게시물 작성</button>
      {successMessage && <p>{successMessage}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => handleSelectPost(post)}>
            <div>
              <h3>{post.title}</h3>
              <button onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
      {isFormVisible && (
        <PostForm 
          onPostSaved={fetchPosts} 
          selectedPost={selectedPost} 
          onClose={() => setFormVisible(false)} 
        />
      )}
      {selectedPost && <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default PostList;

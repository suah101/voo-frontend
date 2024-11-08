import React, { useEffect, useState } from 'react';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import './PostList.css';

interface Post {
  record_id: number;
  user_id: number;
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
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false); // 삭제 완료 모달 상태
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/travel-records');
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setFormVisible(false);
  };

  const confirmDeletePost = (record_id: number) => {
    setDeleteModalVisible(true);
    setPostToDelete(record_id);
  };

  const handleDeletePost = async () => {
    if (postToDelete === null) return;
    try {
      await fetch(`http://localhost:3000/api/travel-records/${postToDelete}`, {
        method: 'DELETE',
      });
      setPosts((prevPosts) => prevPosts.filter(post => post.record_id !== postToDelete));
      setSuccessModalVisible(true); // 삭제 완료 모달 표시
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleteModalVisible(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="post-list">
      <h1>게시판</h1>

      {selectedPost ? (
        <PostDetail 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)}
        />
      ) : (
        <>
          {isFormVisible ? (
            <PostForm 
              onPostSaved={async () => {
                await fetchPosts();
                setFormVisible(false);
              }} 
              selectedPost={selectedPost} 
              onClose={() => setFormVisible(false)} 
            />
          ) : (
            <>
              <button onClick={() => { setFormVisible(true); setSelectedPost(null); }}>새 게시물 작성</button>
              <ul>
                {posts.map((post) => (
                  <li key={post.record_id} onClick={() => handleSelectPost(post)}>
                    <div>
                      <h3>{post.title}</h3>
                      <button onClick={(e) => { 
                        e.stopPropagation(); 
                        confirmDeletePost(post.record_id); // 삭제 확인 모달 열기
                      }}>삭제</button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* 삭제 확인 모달 */}
              {isDeleteModalVisible && (
                <div className="delete-modal">
                  <div className="modal-content">
                    <p>게시물을 삭제하시겠습니까?</p>
                    <div className="modal-buttons">
                      <button onClick={() => setDeleteModalVisible(false)} className="cancel-button">취소</button>
                      <button onClick={handleDeletePost} className="confirm-button">확인</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 삭제 완료 모달 */}
              {isSuccessModalVisible && (
                <div className="success-modal">
                  <div className="modal-content">
                    <p>게시물이 삭제되었습니다!</p>
                    <button onClick={() => setSuccessModalVisible(false)} className="confirm-button">확인</button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;

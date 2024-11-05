import React, { useState, useEffect } from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt'; // 카메라 아이콘 가져오기

// 게시물 인터페이스 정의
interface Post {
  description: string;  // 게시물 설명
  images: string[];     // 이미지 배열
  tags: string[];       // 태그 배열
}

// 사용자 인터페이스 정의
interface User {
  username: string;             // 사용자 이름
  bio: string;                  // 자기소개
  profileImageUrl: string;      // 프로필 이미지 URL
  posts: Post[];                // 게시물 배열
}

const Users = () => {
  const navigate = useNavigate(); // useNavigate 훅 생성
  const [user, setUser] = useState<User>({
    username: "",
    bio: "자기소개를 여기에 적어주세요.",
    profileImageUrl: "",
    posts: []
  });

  const [editMode, setEditMode] = useState(false); // 프로필 편집 모드 상태

  useEffect(() => {
    // 로컬 스토리지에서 사용자 이름 가져오기
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUser((prevUser) => ({ ...prevUser, username: storedUsername })); // 사용자 이름 설정
    }

    // 로컬 스토리지에서 게시물 불러오기
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setUser((prevUser) => ({ ...prevUser, posts: storedPosts })); // 게시물 설정
  }, []);

  // 프로필 이미지 변경 핸들러
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImageUrl: reader.result as string }); // 이미지 URL 설정
      };
      reader.readAsDataURL(file); // 파일을 URL로 읽기
    }
  };

  // 홈 버튼 클릭 핸들러
  const handleHomeClick = () => {
    navigate('/'); // 홈 화면으로 이동
  };

  return (
    <div className="user-profile-container">
      <span onClick={handleHomeClick} className="home-link">VOO</span> {/* 홈으로 가기 링크 */}
      <div className="profile-section">
        <div className="profile-image-container">
          <img
            src={user.profileImageUrl || "/default-profile.png"} // 프로필 이미지 표시
            alt="Profile"
            className="profile-image"
          />
          {editMode && ( // 편집 모드일 때 이미지 변경 아이콘 표시
            <div className="icon-container">
              <label htmlFor="file-upload">
                <CameraAltIcon className="camera-img" />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange} // 이미지 변경 핸들러
                style={{ display: 'none' }} // 파일 입력 숨기기
              />
            </div>
          )}
        </div>
        <h2>{user.username}</h2> {/* 사용자 이름 표시 */}
        <p>{user.bio}</p> {/* 자기소개 표시 */}

        {editMode && ( // 편집 모드일 때 자기소개 수정 입력란 표시
          <div className="edit-section">
            <input
              type="text"
              placeholder="자기소개 수정"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })} // 자기소개 상태 업데이트
              className="input-field"
            />
            <div className="divider"></div>
            <p className="save-text" onClick={() => setEditMode(false)}>변경사항 저장</p> {/* 변경사항 저장 */}
            <div className="divider"></div>
          </div>
        )}

        {!editMode && ( // 편집 모드가 아닐 때 프로필 편집 버튼 표시
          <div className="button-group">
            <div className="divider"></div>
            <p className="save-text" onClick={() => setEditMode(true)} style={{ cursor: 'pointer' }}>프로필 편집</p>
            <div className="divider"></div>
          </div>
        )}

        <div className="posts">
          <h3>내 게시물</h3> {/* 게시물 제목 */}
          <div className="posts-grid">
            {user.posts.length > 0 ? ( // 게시물이 있을 경우
              user.posts.map((post, index) => (
                <div 
                  key={index} 
                  className="post-item" 
                  onClick={() => {
                    alert(`Description: ${post.description}\nTags: ${post.tags.join(', ')}`); // 게시물 설명 및 태그 표시
                  }}
                >
                  <img
                    src={post.images[0]} // 대표 사진만 표시
                    alt={`post-${index}`}
                    className="post-representative-image" // 대표 사진 스타일
                  />
                </div>
              ))
            ) : (
              <p>게시물이 없습니다.</p> // 게시물이 없을 경우 메시지
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
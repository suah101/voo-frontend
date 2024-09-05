import React, { useState, useEffect } from 'react';
import './Users.css';

// User 인터페이스는 사용자 정보의 형태를 정의합니다.
interface User {
  username: string; // 사용자 이름
  bio: string; // 자기소개
  profileImageUrl: string; // 프로필 이미지 URL
  links: string[]; // 사용자 링크 목록
  posts: string[]; // 사용자 게시물 목록
}

const Users = () => {
  // 사용자 상태를 정의합니다. 초기값을 설정합니다.
  const [user, setUser] = useState<User>({
    username: "예시",
    bio: "자기소개를 여기에 적어주세요.",
    profileImageUrl: "https://example.com/profile.jpg",
    links: [],
    posts: []
  });

  // 새 링크를 추가할 때 사용할 상태입니다.
  const [newLink, setNewLink] = useState('');
  // 프로필 편집 모드 상태를 정의합니다.
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // 서버에서 게시물 데이터를 가져오는 함수입니다.
    const fetchPosts = async () => {
      try {
        // 실제 API 엔드포인트로 교체해야 합니다.
        const response = await fetch('/api/posts');
        const data = await response.json();
        // 기존 사용자 정보 상태를 업데이트하여 게시물 목록을 설정합니다.
        setUser((prevUser) => ({ ...prevUser, posts: data.posts }));
      } catch (error) {
        console.error('게시물 불러오기 오류:', error);
      }
    };

    fetchPosts();
  }, []); // 빈 배열을 의존성 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 호출됩니다.

  // 새 링크를 추가하는 함수입니다.
  const addLink = () => {
    // 현재 사용자 정보 상태를 업데이트하여 새 링크를 추가합니다.
    setUser({ ...user, links: [...user.links, newLink] });
    setNewLink(''); // 입력 필드를 초기화합니다.
  };

  // 프로필 이미지 파일이 변경되었을 때 호출되는 함수입니다.
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 읽어온 파일의 데이터를 URL로 변환하여 프로필 이미지 URL 상태를 업데이트합니다.
        setUser({ ...user, profileImageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-section">
        <div className="profile-image-container">
          <img src={user.profileImageUrl} alt="Profile" className="profile-image" />
          {editMode && (
            <div className="camera-icon">
              <label htmlFor="file-upload">
                <img src="camera-icon-url" alt="camera" className="camera-img" />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ display: 'none' }} // 파일 입력 필드를 숨깁니다.
              />
            </div>
          )}
        </div>
        <h2>{user.username}</h2>
        <p>{user.bio}</p>

        {!editMode && (
          <div className="links">
            {user.links.map((link, index) => (
              <a key={index} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            ))}
          </div>
        )}

        {editMode && (
          <div className="edit-section">
            <input
              type="text"
              placeholder="자기소개 수정"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className="input-field"
            />
            <div className="link-input-group">
              <input
                type="text"
                placeholder="링크 추가"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="input-field"
              />
              <button className="link-button" onClick={addLink}>추가</button>
            </div>

            {/* 개인정보 수정과 저장 영역 */}
            <div className="divider"></div>
            <p className="save-text" onClick={() => console.log('개인정보 수정')}>개인정보 수정</p>
            <div className="divider"></div>
            <p className="save-text" onClick={() => setEditMode(false)}>변경사항 저장</p>
            <div className="divider"></div>
          </div>
        )}

        {!editMode && (
          <div className="button-group">
            <button className="outline-button" onClick={() => setEditMode(true)}>프로필 편집</button>
          </div>
        )}

        <div className="posts">
          <h3>내 게시물</h3>
          {user.posts.length > 0 ? (
            user.posts.map((post, index) => (
              <p key={index}>{post}</p>
            ))
          ) : (
            <p>게시물이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

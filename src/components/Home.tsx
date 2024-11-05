import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setProfileImage(storedProfileImage || '/default-profile.png');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/users');
  };

  const handlePostCreation = () => {
    navigate('/posts');
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">VOO</div>

        {/* 로그인 상태일 때만 프로필과 로그아웃 버튼 표시 */}
        {isLoggedIn && (
          <div className="profile-section" style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={username || ''} src={profileImage} onClick={handleProfile} style={{ cursor: 'pointer' }} />
            <span className="username" onClick={handleProfile} style={{ cursor: 'pointer' }}>{username}</span>
            <Button variant="outlined" color="secondary" onClick={handleLogout} style={{ marginLeft: '1rem' }}>
              로그아웃
            </Button>
          </div>
        )}
      </header>

      <section className="map-section">
        <div className="map-text">
          <h1>VOO</h1>
          <p>Record your travels</p>

          {/* 로그인 상태에 따라 버튼 텍스트와 기능 변경 */}
          {isLoggedIn ? (
            <Button variant="contained" color="secondary" size="large" onClick={handlePostCreation}>
              게시물 작성
            </Button>
          ) : (
            <Button variant="contained" color="secondary" size="large" onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>
        <img src="/map.jpg" alt="map" className="map-image" />
      </section>
    </div>
  );
};

export default Home;

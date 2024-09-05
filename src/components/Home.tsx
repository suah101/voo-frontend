import React from 'react';
import './Home.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 생성합니다. 이 함수는 페이지 전환을 처리합니다.

  const handleSignup = () => {
    navigate('/signup'); // 회원가입 페이지로 이동합니다.
  };

  const handleGetStarted = () => {
    navigate('/users'); // 시작하기 버튼 클릭 시 posts 페이지로 이동합니다.
  };

  return (
    <div className="home-container"> {/* 전체 페이지를 감싸는 컨테이너입니다. */}
      <header className="navbar"> {/* 네비게이션 바를 정의합니다. */}
        <div className="logo">VOO</div> {/* 로고를 표시하는 부분입니다. */}
        <nav className="nav-links"> {/* 네비게이션 링크들을 정의합니다. */}
          <a href="#features">Features</a> {/* Features 섹션으로 스크롤합니다. */}
          <a href="#about">About</a> {/* About 섹션으로 스크롤합니다. */}
          <a href="#contact">Contact</a> {/* Contact 섹션으로 스크롤합니다. */}
        </nav>
        <Button variant="contained" color="primary" onClick={handleSignup}>Sign Up</Button> {/* 회원가입 버튼입니다. 클릭 시 회원가입 페이지로 이동합니다. */}
      </header>

      <section className="map-section"> {/* 지도와 텍스트를 표시하는 섹션입니다. */}
        <div className="map-text"> {/* 텍스트를 포함하는 부분입니다. */}
          <h1>VOO</h1> {/* 큰 제목으로 앱의 이름을 표시합니다. */}
          <p>Record your travels and share those memories</p> {/* 앱의 간단한 설명을 제공합니다. */}
          <Button variant="contained" color="secondary" size="large" onClick={handleGetStarted}>Get Started</Button> {/* 시작하기 버튼입니다. 클릭 시 posts 페이지로 이동합니다. */}
        </div>
      </section>

      <section id="features" className="features-section"> {/* 앱의 기능을 설명하는 섹션입니다. */}
        <h2>Features</h2> {/* 섹션의 제목을 표시합니다. */}

        <div className="features-grid"> {/* 기능들을 그리드 레이아웃으로 배치합니다. */}
          <div className="feature-item"> {/* 개별 기능을 나타내는 아이템입니다. */}
            <i className="fas fa-check-circle"></i> {/* 아이콘을 표시합니다. */}
            <h3>Easy to Use</h3> {/* 기능의 제목을 표시합니다. */}
            <p>Intuitive design that helps you get started quickly.</p> {/* 기능에 대한 설명입니다. */}
          </div>
          
          <div className="feature-item"> {/* 두 번째 기능 아이템입니다. */}
            <i className="fas fa-lock"></i> {/* 보안 관련 아이콘을 표시합니다. */}
            <h3>Secure</h3> {/* 기능의 제목을 표시합니다. */}
            <p>Your data is protected with top-notch security measures.</p> {/* 기능에 대한 설명입니다. */}
          </div>

          <div className="feature-item"> {/* 세 번째 기능 아이템입니다. */}
            <i className="fas fa-sync-alt"></i> {/* 실시간 동기화를 나타내는 아이콘입니다. */}
            <h3>Real-Time Sync</h3> {/* 기능의 제목을 표시합니다. */}
            <p>Access your tasks from anywhere, anytime.</p> {/* 기능에 대한 설명입니다. */}
          </div>
        </div>
      </section>

      <footer className="footer"> {/* 페이지 하단의 푸터 섹션입니다. */}
        <p>&copy; 2024 VOO. All rights reserved.</p> {/* 저작권 문구를 표시합니다. */}
      </footer>
    </div>
  );
}

export default Home; // Home 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.

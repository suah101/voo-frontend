import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

interface AuthFormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<AuthFormState>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false); // 모달 상태 추가
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (form.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token); 
      console.log('로그인 성공:', token);
      
      setShowModal(true); // 로그인 성공 시 모달 표시
      
      setTimeout(() => {
        setShowModal(false); // 2초 후 모달 숨기기
        navigate('/'); // 홈 페이지로 이동
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인 실패');
      console.error('로그인 오류:', err);
    }
  };

  return (
    <div className="login-container">
      <button 
        onClick={() => navigate('/')}
        className="home-button"
      >
        홈으로
      </button>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
   
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="login-button">
          Log in
        </button>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/reset-password'); 
          }}
          className="toggle-link-password"
        >
          비밀번호 찾기
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/Signup'); 
          }}
          className="toggle-link"
        >
          계정이 없으신가요? 회원가입
        </a>
      </form>

      {/* 모달 창 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>로그인이 완료되었습니다!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

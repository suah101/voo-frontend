import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

interface AuthFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; // 비밀번호 확인 필드 추가
}

const Signup: React.FC = () => {
  const [form, setForm] = useState<AuthFormState>({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // 이메일 형식 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    // 비밀번호 길이 및 일치 검사
    if (form.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || '회원가입에 실패했습니다.');
        return;
      }

      console.log('회원가입 성공:', await response.json());
      navigate('/login');
    } catch (err) {
      console.error('회원가입 오류:', err);
      setError('서버와 통신하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <button 
        onClick={() => navigate('/')}
        className="home-button">
        홈으로
      </button>
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange}
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        {error && <p className="error-message">{error}</p>}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/Login');
          }}
          className="toggle-link"
        >
          이미 계정이 있으신가요? 로그인
        </a>
      </form>
    </div>
  );
};

export default Signup;

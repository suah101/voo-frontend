import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Resetpassword.css'; // 필요한 스타일 파일

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 이메일 형식 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/password-forgot', { email });
      setSuccess('비밀번호 재설정 코드가 이메일로 전송되었습니다.');
      console.log('비밀번호 재설정 요청 성공:', response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || '비밀번호 재설정 요청 실패');
      console.error('비밀번호 재설정 요청 오류:', err);
    }
  };

  return (
    <div className="reset-password-container">
      <button 
        onClick={() => navigate('/')} // 홈으로 가는 버튼 클릭 시 홈으로 이동
        className="home-button"
      >
        홈으로
      </button>
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          required
          value={email}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" className="reset-password-button">
          재설정 코드 요청
        </button>
        <a href="#" onClick={() => navigate('/')} className="back-link">
          로그인 화면으로
        </a>
      </form>
    </div>
  );
};

export default ResetPassword;

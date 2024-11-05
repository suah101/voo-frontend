import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Findemail.css'; // 스타일 파일 추가

const FindEmail: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // 에러 초기화

    try {
      const response = await axios.post('http://localhost:3000/api/find-email', {
        name,
        phone,
      });

      // 이메일 찾기 성공 시
      setMessage(`이메일: ${response.data.email}`); // 이메일 정보를 가져옴
    } catch (err: any) {
      setError(err.response?.data?.message || '이메일을 찾는 중 오류가 발생했습니다.');
      console.error('이메일 찾기 오류:', err);
    }
  };

  return (
    <div className="find-email-container">
      <h2>이메일 찾기</h2>
      <form onSubmit={handleSubmit} className="find-email-form">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">이메일 찾기</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
      <button onClick={() => navigate('/')} className="back-button">
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default FindEmail;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface AuthFormState {
  name: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<AuthFormState>({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    navigate('/'); // 홈 페이지로 이동
  };

  return (
    <div className="login-container">
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
        <button type="submit" className="login-button">
          Log in
        </button>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/Signup'); // 로그인 페이지로 이동
          }}
          className="toggle-link"
        >
          계정이 없으신가요? 회원가입
        </a>
      </form>
    </div>
  );
};

export default Login;

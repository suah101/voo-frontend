import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

interface AuthFormState {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
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
    <div className="signup-container">
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
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login'); // 로그인 페이지로 이동
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

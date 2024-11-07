import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <h1 className="header-title" onClick={() => navigate('/')}>VOO</h1>
    </header>
  );
};

export default Header;

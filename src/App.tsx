import React from 'react';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'
import Posts from './components/Post';
import Users from './components/Users';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element = {<Login />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </Router>
);

export default App;
import React from 'react';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'
import Users from './components/Users';
import Resetpassword from './components/Resetpassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Findemail from './components/Findemail';
import PostList from './components/PostList';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/find-email" element={<Findemail />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/posts" element={<PostList />} />
    </Routes>
  </Router>
);

export default App;
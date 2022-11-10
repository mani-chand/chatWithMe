import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/chat';
function App() {
  
  return (
    <div>
     <BrowserRouter>
     <Routes>
     <Route path="/login" element={<Login/>} />
     <Route path="/signup" element={<Signup/>} />
     <Route path="/" element={<Chat/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

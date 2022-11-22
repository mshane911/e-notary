import React from 'react';
import { CometChat } from "@cometchat-pro/chat";
import { Routes, Route } from "react-router-dom";

import Landing from './component/Landing'
import Home from './component/Home'
import Header from './component/Header'
import Profile from './component/Profile'
import Notaris from './component/Notaris'
import SignaturePage from './component/SignaturePage';
import Namecard from './component/Namecard';
import { LiveChat } from './component/LiveChat';
import { io } from 'socket.io-client';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notaris" element={<Notaris />} />
        <Route path="/signaturepage" element={<SignaturePage />} />
        <Route path="/namecard" element={<Namecard />} />
        <Route path="/chat" element={<LiveChat />} />
      </Routes>
    </div>
  );
}

export default App;
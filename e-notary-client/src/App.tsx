import React from 'react';
import { CometChat } from "@cometchat-pro/chat";
import {Routes, Route } from "react-router-dom";

import Landing from './component/Landing'
import Home from './component/Home'

function App() {
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(process.env.REACT_APP_COMET_REGION).build();
  CometChat.init(process.env.REACT_APP_COMET_APP_ID, appSetting).then(
    () => {
      console.log("Comet initialized successfully");
      // You can now call login function.
    },
    error => {
      console.log("Comet Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
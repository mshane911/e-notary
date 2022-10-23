import React from 'react';
import { CometChat } from "@cometchat-pro/chat";

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
      <h1>Meet your <b>E-Notary, Ben Dover</b></h1>
    </div>
  );
}

export default App;
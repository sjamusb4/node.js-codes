import React from "react";
import AuthBanner from "../components/AuthBanner";
import AuthCredentials from "../components/AuthCredentials";

const Auth = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 4 }}>
        <AuthBanner />
      </div>
      <div style={{ flex: 6 }}>
        <AuthCredentials />
      </div>
    </div>
  );
};

export default Auth;

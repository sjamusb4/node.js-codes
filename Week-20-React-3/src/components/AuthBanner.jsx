import React from "react";

const AuthBanner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        border: "1px solid black",
        backgroundColor: "#1f1f1f",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M58 0.0162365V58L35.3688 38.5587V58H0V0L58 0.0162365ZM7.10962 50.9603H28.2591V23.1112L50.8907 42.937V7.05391L7.10962 7.04147V50.9603Z"
            fill="#34D59A"
          ></path>
        </svg>
        <h2>Build a board, get the job done!</h2>
      </div>
    </div>
  );
};

export default AuthBanner;

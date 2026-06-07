import React from "react";
import CenterDiv from "./CenterDiv";

const AuthCredentials = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
          padding: "0 1rem",
          gap: "1rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <label htmlFor="email" style={{ fontWeight: "bold" }}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            required
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "blue",
              color: "white",
              padding: "0.5rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
        <CenterDiv>
          <p>
            Don't have account regster <a href="#">here</a>
          </p>
        </CenterDiv>
      </form>
    </div>
  );
};

export default AuthCredentials;

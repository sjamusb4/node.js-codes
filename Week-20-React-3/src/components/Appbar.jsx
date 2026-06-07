import React from "react";

const Appbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "40px",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px dotted black",
        backgroundColor: "#1e1e1e",
        color: "white",
      }}
    >
      <div style={{ marginLeft: "20px" }}>
        <h3>uTrello</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "300px",
        }}
      >
        <div>Home</div>
        <div>About</div>
        <div>Contact</div>
      </div>
    </div>
  );
};

export default Appbar;

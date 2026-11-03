import React from "react";

function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Đang tải dữ liệu...</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
  },
  spinner: {
    width: "44px",
    height: "44px",
    border: "4px solid #dfe4ea",
    borderTop: "4px solid #004A98",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: {
    marginTop: "16px",
    color: "#57606f",
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default LoadingSpinner;

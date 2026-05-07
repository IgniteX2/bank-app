function Loading({ theme }) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100vh",
      }}
      className={`loading ${theme === "dark" ? "loadingDark" : ""}`}
    >
      <div className={`logo ani ${theme === "dark" ? "formLogoDark" : ""}`}>
        <p>⚡</p>
      </div>
    </div>
  );
}

export default Loading;

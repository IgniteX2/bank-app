export default function Loading({ theme, step }) {
  const messages = {
    auth: "Authenticating your credentials...",
    session: "Setting up your session...",
    redirect: "Redirecting to dashboard...",
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        gap: "12px",
      }}
      className={`loading ${theme === "dark" ? "loadingDark" : ""}`}
    >
      <div className={`logo ani ${theme === "dark" ? "formLogoDark" : ""}`}>
        <p>⚡</p>
      </div>

      <p
        style={{
          fontSize: "14px",
          fontWeight: 500,
          opacity: 0.8,
        }}
      >
        {messages[step]}
      </p>
    </div>
  );
}

import "../../extraCSS/loading.css";

export default function Loading({ theme, step, error, onRetry }) {
  const steps = ["auth", "session", "redirect"];

  const messages = {
    auth: "Authenticating your credentials",
    session: "Setting up your session",
    redirect: "Redirecting to dashboard",
    error: "Something went wrong",
  };

  const currentIndex = steps.indexOf(step);

  const progress =
    step === "error"
      ? ((steps.length - 1) / steps.length) * 100
      : ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className={`loadingWrapper ${theme === "dark" ? "dark" : ""}`}>
      <div className="shimmers" />

      <div className="logoLogin">⚡</div>

      <div className="textBox">
        <p className={`textSlide ${error ? "errorText" : "in"}`}>
          {messages[step]}

          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      </div>

      <div className="progressBar">
        <div
          className="progressFill"
          style={{
            width: `${progress}%`,
            background: error ? "#ef4444" : "#1a3a5c",
          }}
        />
      </div>

      {error && (
        <button className="retryBtn" onClick={onRetry}>
          Retry Login
        </button>
      )}
    </div>
  );
}

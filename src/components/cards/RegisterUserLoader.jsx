import "../../extraCSS/loading.css";

export default function RegisterLoading({ theme, step, error, onRetry }) {
    const steps = ["validate", "create", "verify", "complete"];

    const messages = {
        validate: "Verifying customer information",
        create: "Creating your account profile",
        verify: "Performing security checks",
        complete: "Account created successfully",
        error: "Registration failed",
    };

    const currentIndex = steps.indexOf(step);

    const progress =
        step === "error"
        ? ((steps.length - 1) / steps.length) * 100
        : ((currentIndex + 1) / steps.length) * 100;

    return (
        <div className={`loadingWrapper ${theme === "dark" ? "dark" : ""}`}>
        <div className="shimmers" />

        <div className="logoLogin">🏦</div>

        <div className="textBox">
            <p className={`textSlide ${error ? "errorText" : "in"}`}>
            {messages[step]}

            {!error && (
                <span className="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
                </span>
            )}
            </p>
        </div>

        <div className="progressBar">
            <div
            className="progressFill"
            style={{
                width: `${progress}%`,
                background: error ? "#ef4444" : "#16a34a",
            }}
            />
        </div>

        {!error && (
            <div className="stepIndicator">
            Step {currentIndex + 1} of {steps.length}
            </div>
        )}

        {error && (
            <button className="retryBtn" onClick={onRetry}>
            Retry Registration
            </button>
        )}
        </div>
    );
}

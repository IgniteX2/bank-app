import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";
import { FaEyeSlash, FaRegCopyright, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const [isViewPassword, setIsViewPassword] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 2000);
      const res = await loginUser(form);

      login(res.data.token);

      toast.success("Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      const status = err?.response?.status;

      let message = "Something went wrong";

      if (status === 401) {
        message = "Invalid email or password";
      } else if (status === 404) {
        message = "User not found";
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      }

      toast.error(message);
      setError(message);

      setShake(true);
      setTimeout(() => setShake(false), 2000);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const isValid = form.email.trim() !== "" && form.password.trim() !== "";

    setDisable(!isValid);
  }, [form]);

  const handleBlur = () => {
    setShake(false);
  };

  const handleShowPassword = () => {
    setIsViewPassword((prev) => !prev);
  };

  return (
    <div
      className={`all flex min-h-screen  flex-col justify-between ${theme === "dark" ? "bodyDark" : "bg-[#f5f5f5]"}`}
    >
      <div
        className={`login-header shadow-[0_0_50px_12px_whitesmoke] ${theme === "dark" ? "headerDark" : "bg-[#ffffff]"}`}
      >
        <div
          style={{
            width: "96%",
            marginLeft: "2%",
            height: "40px",
            marginTop: "15px",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              gap: "20px;",
              width: "12%",
              height: "40px;",
              backgroundColor: "transparent",
            }}
          >
            <span
              className={`headerLogo ${theme === "dark" ? "logoDark" : ""}`}
            >
              ⚡
            </span>
            <h3
              style={{
                alignSelf: "center",
                fontWeight: "600",
                fontSize: "1.3rem",
                marginLeft: "10px",
                // color: "rgba(10, 22, 40, 0.8)",
              }}
              className={`${theme === "dark" ? "text-white" : "text-[rgba(10,22,40,0.8)]"}`}
            >
              IGNITEX BANK
            </h3>
          </div>
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <div className="tog self-center">
              <div
                className=" flex items-center justify-center -mt-7.5 mobileTog"
                style={{ marginLeft: "5px" }}
              >
                <button
                  style={{ paddingLeft: "5px" }}
                  onClick={toggleTheme}
                  aria-label="toggle theme"
                  className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 
          ${theme === "dark" ? "text-black bg-[#121212] shadow-inner" : "bg-gray-300 "}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
            ${theme === "light" ? "translate-x-0 " : "translate-x-7"}`}
                  >
                    {theme === "light" ? (
                      <MdOutlineWbSunny size={12} />
                    ) : (
                      <IoMoonOutline size={12} />
                    )}
                  </div>
                </button>

                {theme === "dark" ? (
                  <span className="themeState font-semibold dark:text-white">
                    &nbsp; &nbsp;Dark Mode
                  </span>
                ) : (
                  <span className="themeState font-semibold">
                    &nbsp; &nbsp;Light Mode
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`form ${theme === "dark" ? "formDark" : ""}`}>
        <div className="innerForm">
          <div className={`logo ${theme === "dark" ? "formLogoDark" : ""}`}>
            <p>⚡</p>
          </div>

          <div className="formTag">
            <h3>Login to your account</h3>
            <p style={theme === "dark" ? { color: "lightgrey" } : {}}>
              Enter your details to login.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="loginForm">
            <div
              style={{ position: "relative" }}
              className={`${shake ? "shake" : ""}`}
            >
              <FaEnvelope className="envelopeIcon" />
              <input
                className={`cred ${theme === "dark" ? "credDark" : ""} ${error.email ? "error" : ""} ${
                  shake.email ? "shake" : ""
                } `}
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onBlur={handleBlur}
              />
            </div>

            <div
              style={{ position: "relative" }}
              className={`${shake ? "shake" : ""}`}
            >
              <GiPadlock className="padlockIcon" />
              <input
                className={`cred ${theme === "dark" ? "credDark" : ""} ${error.email ? "error" : ""} ${
                  shake.email ? "shake" : ""
                }`}
                name="password"
                type={isViewPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onBlur={handleBlur}
              />
              <span
                className="togglePass"
                style={{
                  outline: "none",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                onClick={handleShowPassword}
              >
                {isViewPassword ? (
                  <FaEyeSlash className="togPass" />
                ) : (
                  <FaEye className="togPass" />
                )}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                colGap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <input type="checkbox" className="remMe" />
                <label style={{ marginLeft: "10px", alignSelf: "center" }}>
                  Remember me
                </label>
              </div>

              <div>
                <Link to="../ResetPassword">Forget password? </Link>
              </div>
            </div>

            <button
              type="submit"
              className={`submitBtn ${disable ? "disableBtn" : ""} ${animate ? "animate-pulse-custom" : ""}`}
            >
              {submitting ? "Sign In..." : "Login"}
            </button>
          </form>
          <div>
            <span
              // style={{ color: "rgba(10, 22, 40, 0.8)" }}
              className={`${theme === "dark" ? "text-white" : ""}`}
            >
              Don't Have An Account?{" "}
              <Link to="../Register">
                <b>Register</b>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div
        className={`login-header shadow-[0_0_50px_12px_whitesmoke] ${theme === "dark" ? "headerDark" : "bg-[#ffffff]"}`}
      >
        <div
          style={{
            width: "96%",
            marginLeft: "2%",
            height: "40px",
            marginTop: "15px",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              backgroundColor: "transparent",
              // color: "rgba(10, 22, 40, 0.8)",
            }}
            className={`${theme === "dark" ? "text-white" : ""}`}
          >
            <span
              style={{
                display: "flex",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              <FaRegCopyright style={{ alignSelf: "center" }} /> 2026 IGNITEX
              BANK
            </span>
          </div>

          <div style={{ display: "flex" }}>
            <span
              style={{
                display: "flex",
                alignSelf: "center",
                fontWeight: "bold",
                // color: "rgba(10, 22, 40, 0.8)",
              }}
            >
              <TbWorld
                style={{
                  alignSelf: "center",
                  marginRight: "2px",
                  fontSize: "1.2rem",
                }}
              />{" "}
              ENG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

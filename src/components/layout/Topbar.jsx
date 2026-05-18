import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { FiBell } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuPanelLeftOpen } from "react-icons/lu";
import userImg from "../../assets/user.jpg";

export default function Topbar({ isOpen, setIsOpen, isMobile }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return (
          <div>
            <h3
              className={`text-sm font-bold ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0d1b2e]]"}`}
            >
              Dashboard
            </h3>
            <p
              className={`text-sm ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#666D80]]"}`}
            >
              Hi, Alice Bourne!
            </p>
          </div>
        );

      case "/transactions":
        return (
          <div>
            <h3
              className={`text-sm font-bold ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0d1b2e]]"}`}
            >
              Transactions
            </h3>
            <p
              style={{ display: isMobile ? "none" : "block" }}
              className={`text-xs ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#666D80]]"}`}
            >
              Efficiently organize and keep track of your incoming receipts for
              hassle-free financial management
            </p>
          </div>
        );

      case "/transfer":
        return "Transfer Money";

      case "/profile":
        return (
          <div>
            <h3
              className={`text-sm font-bold ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0d1b2e]]"}`}
            >
              Profile
            </h3>
            <p
              className={`text-sm ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#666D80]]"}`}
            >
              Hi, Alice Bourne!
            </p>
          </div>
        );

      case "/settings":
        return (
          <div>
            <h3
              className={`text-sm font-bold ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0d1b2e]]"}`}
            >
              Settings
            </h3>
            <p
              className={`text-xs ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#666D80]]"}`}
            >
              Customize and edit essential settings details.
            </p>
          </div>
        );

      default:
        return "Welcome";
    }
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: "40px",
      }}
    >
      <div
        style={{ width: "94%", marginLeft: "3%" }}
        className="topbar flex justify-between items-center p-4 "
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {isOpen ? null : (
            <div style={{ display: isMobile ? "none" : "block" }}>
              <button
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50px",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <LuPanelLeftOpen style={{ fontSize: "25px" }} />
              </button>
            </div>
          )}

          <div
            style={{
              display: isMobile ? "flex" : "block",
              gap: isMobile ? "10px" : "",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "transparent",
                backgroundImage: `url(${userImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: isMobile ? "block" : "none",
              }}
              className="text-sm font-semibold"
            ></div>
            <span
              // className={`text-xl ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0d1b2e]]"}`}
              style={{
                alignSelf: isMobile ? "center" : "",
                color: isMobile && theme === "dark" ? "#f5f5f5" : "#0d1b2e",
              }}
            >
              {getPageTitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiBell
            style={{
              color: theme === "dark" ? "#f5f5f5" : "#0d1b2e",
              fontSize: "17px",
            }}
          />

          <div className="tog self-center">
            <div
              className=" flex items-center justify-center -mt-7.5 mobileTog"
              style={{ marginLeft: "5px" }}
            >
              <button
                style={{ paddingLeft: "5px", cursor: "pointer" }}
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
                <span className="themeState font-semibold dark:text-white text-xs">
                  {isMobile ? "" : <span>&nbsp; &nbsp;Dark Mode</span>}
                </span>
              ) : (
                <span className="themeState font-semibold text-xs">
                  {isMobile ? "" : <span>&nbsp; &nbsp;Light Mode</span>}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

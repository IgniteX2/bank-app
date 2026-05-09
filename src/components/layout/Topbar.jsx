import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FiBell } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

export default function Topbar({ isOpen, setIsOpen }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
              <FaAngleRight />
            </button>
          )}
          <div>
            <h2
              className={`text-2xl font-medium ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0d1b2e]"}`}
            >
              Your Financial Dashboard
            </h2>
            <p className="text-sm text-gray-500">
              Welcome back, Max Verstappen!
            </p>
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
  );
}

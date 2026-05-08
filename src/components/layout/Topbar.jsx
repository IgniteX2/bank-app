import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FiBell } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

export default function Topbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ width: "100%", marginTop: "40px" }}>
      <div
        style={{ width: "94%", marginLeft: "3%" }}
        className="topbar flex justify-between items-center p-4 "
      >
        <div>
          <h2 className="text-2xl font-medium">Your Financial Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, Max Verstappen!</p>
        </div>

        <div className="flex items-center gap-3">
          <FiBell />

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

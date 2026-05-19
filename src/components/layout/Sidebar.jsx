import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import userImg from "../../assets/user.jpg";
import { FiHome, FiHelpCircle, FiLogOut, FiX } from "react-icons/fi";
import { LiaHeadsetSolid } from "react-icons/lia";
import { LuPanelRightOpen, LuSettings } from "react-icons/lu";

import { RiExchangeLine } from "react-icons/ri";

const navItems = [
  { label: "Dashboard", icon: <FiHome />, href: "/dashboard" },
  {
    label: "Transactions",
    icon: <RiExchangeLine />,
    href: "/transactions",
  },
];

const otherItems = [
  { label: "Settings", icon: <LuSettings />, href: "/settings" },
  { label: "Get Help", icon: <FiHelpCircle />, href: "/help" },
  { label: "Logout", icon: <FiLogOut />, href: "/logout" },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
  isMobile,
  userName,
  userEmail,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div style={{ display: isMobile ? "none" : "block" }}>
        {isOpen ? (
          <aside
            className={`sidebar w-70 h-screen ${theme === "light" ? "bg-[#F6F8FA]" : "bg-[#0a1628]"} shadow-md flex flex-col justify-between`}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  marginLeft: "5%",
                  width: "90%",
                  border: "1px solid transparent",
                }}
              >
                <div
                  style={{ marginTop: "30px" }}
                  className="flex items-center justify-between "
                >
                  <div
                    className="withLogo"
                    style={{ width: "70%", background: "transparent" }}
                  >
                    <span
                      className={`headerLogo ${theme === "dark" ? "logoDark" : ""}`}
                    >
                      ⚡
                    </span>
                    <h3
                      style={{
                        alignSelf: "center",
                        fontSize: "14px",
                        marginLeft: "-10px",

                        // color: "rgba(10, 22, 40, 0.8)",
                      }}
                      className={`${theme === "dark" ? "text-white" : "text-[rgba(10,22,40,0.8)]"}`}
                    >
                      IGNITEX BANK
                    </h3>
                  </div>
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
                    <LuPanelRightOpen style={{ fontSize: "25px" }} />
                  </button>
                </div>

                <div className="p-4" style={{ marginTop: "40px" }}>
                  <p className="text-sm text-gray-400 mb-2">MAIN</p>
                  {navItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center  font-normal p-2 text-sm text-[#818898]"
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                        marginLeft: "15px",
                      }}
                    >
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center gap-x-3 p-2 text-xs rounded-lg transition font-normal ${
                            isActive
                              ? "bg-[#ffffff] text-[#0D0D12] font-semibold"
                              : "text-[#818898]"
                          }`
                        }
                        style={({ isActive }) => ({
                          width: "100%",
                          padding: "10px 0px",
                          paddingLeft: "15px",
                          border: isActive
                            ? "1px solid lightgrey"
                            : "1px solid transparent",
                        })}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </div>
                  ))}
                </div>

                <div
                  className={`p-4 ${theme === "light" ? "bg-[#F6F8FA]" : "bg-[#0a1628]"} `}
                  style={{ marginTop: "20px" }}
                >
                  <p className="text-sm text-gray-400 mb-2">OTHER</p>
                  {otherItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-x-3 p-2 text-sm text-[#818898]"
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                        marginLeft: "15px",
                      }}
                    >
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center gap-x-3 p-2 text-xs rounded-lg transition font-normal ${
                            isActive
                              ? "bg-[#ffffff] text-[#0D0D12] font-semibold"
                              : "text-[#818898]"
                          }`
                        }
                        style={({ isActive }) => ({
                          width: "100%",
                          padding: "10px 0px",
                          paddingLeft: "15px",
                          border: isActive
                            ? "1px solid lightgrey"
                            : "1px solid transparent",
                        })}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div
              style={{
                width: "90%",
                height: "480px",
                marginLeft: "5%",
                border: "1px solid transparent",
                marginBottom: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  background: theme === "dark" ? "#354151" : "#ffffff",
                  boxShadow:
                    theme === "dark"
                      ? "none"
                      : "0 0px 2px 4px rgba(230, 230, 230, 0.1)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "20px",
                  marginTop: "10px",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <LiaHeadsetSolid
                      className={`text-[25px] ${theme === "dark" ? "text-white" : "text-[#0D0D12]"}`}
                    />

                    <h2
                      className={`text-sm leading-none font-semibold ${theme === "dark" ? "text-[#ffffff]" : "text-[#0D0D12]"} `}
                    >
                      Need Support?
                    </h2>
                  </div>

                  <button
                    className={`${theme === "dark" ? "text-white" : "text-[#0D0D12]"} hover:opacity-70 transition`}
                    style={{ cursor: "pointer" }}
                  >
                    <FiX className="text-[20px]" />
                  </button>
                </div>

                <p
                  className={`mt-10 max-w-4xl text-xs leading-[1.2] font-normal ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#818898]"}`}
                >
                  Connect with one of our experts to get support.
                </p>

                <button
                  style={{
                    backgroundColor: theme === "dark" ? "#354151" : "#ffffff",
                    color: theme === "dark" ? "#ffffff" : "#0D0D12",
                    boxShadow:
                      theme === "dark"
                        ? "0 0px 8px 4px inset rgba(230, 230, 230, 0.2)"
                        : "0 0px 2px 4px rgba(230, 230, 230, 0.2)",
                    padding: "10px 20px",
                    border: "2px solid #f5f5f5",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  className="text-xs"
                >
                  Contact Us
                </button>
              </div>

              <div
                className="p-4 "
                style={{
                  width: "100%",
                  height: "60px",
                  background: "transparent",
                  display: "flex",
                  columnGap: "15px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "transparent",
                    backgroundImage: `url(${userImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="text-sm font-semibold"
                ></div>
                <div className="text-xs  self-center">
                  <p
                    className={`text-sm font-medium ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0D0D12]"}`}
                  >
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </>
  );
}

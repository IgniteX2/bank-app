import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FiHome } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { TbTransferIn } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", icon: <FiHome />, href: "/dashboard" },
  { label: "Transfer", icon: <TbTransferIn />, href: "/transfer" },
  { label: "Settings", icon: <LuSettings />, href: "/Settings" },
  { label: "Me", icon: <GoPerson />, href: "/profile" },
];

export default function MobileNav({ isMobile }) {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {isMobile && (
        <div
          style={{
            width: "100%",
            background: theme === "dark" ? "#0a1628" : "#f5f5f5",
            position: "fixed",
            bottom: "0px",
            height: "70px",
          }}
        >
          <div
            style={{
              width: "94%",
              marginLeft: "3%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {navItems.map((item, i) => (
              <div
                key={i}
                className="font-normal p-2 text-sm text-[#818898]"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: "30px",
                  marginTop: "5px",
                  // marginLeft: "15px",
                }}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-x-3 p-2 text-sm rounded-lg transition font-normal ${
                      isActive
                        ? "text-[#C9A227] font-semibold"
                        : "text-[#818898]"
                    }`
                  }
                  style={() => ({
                    // width: "100%",
                    padding: "10px 10px",
                    paddingLeft: "15px",
                    flexDirection: "column",
                  })}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { FiBell } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// import { IoMoonOutline } from "react-icons/io5";
// import { MdOutlineWbSunny } from "react-icons/md";
import { LuPanelLeftOpen } from "react-icons/lu";
import userImg from "../../assets/user.jpg";
// import { useSidebar } from "../../components/ui/sidebar";
import AccountNumberSkeleton from "../../skeletons/AccountNumberSkeleton";
import TopbarUserSkeleton from "../../skeletons/TopbarUserSkeleton";
import TopbarBalanceSkeleton from "../../skeletons/TopbarBalanceSkeleton";
import { useAccountStore } from "../../stores/useAccountStore";
import { useUIStore } from "../../stores/useBalanceToggleStore";

export default function Topbar({ isOpen, setIsOpen, isMobile }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  // const { state } = useSidebar();
  const { account, isLoading } = useAccountStore();
  const user = useUserStore((state) => state.user);

  const isLoadingUser = useUserStore((state) => state.isLoading);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchAccount = useAccountStore((state) => state.fetchAccount);

  useEffect(() => {
    fetchUser();
    fetchAccount();
  }, [fetchUser, fetchAccount]);

  const initials = user?.fullName?.slice(0, 2).toUpperCase();

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
            {isLoadingUser ? (
              <AccountNumberSkeleton />
            ) : (
              <p
                className={`text-sm ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#666D80]]"}`}
              >
                Hi, {user?.fullName}
              </p>
            )}
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

  const isBalanceVisible = useUIStore((state) => state.isBalanceVisible);
  const toggleBalanceVisibility = useUIStore(
    (state) => state.toggleBalanceVisibility,
  );

  // const handleBalanceVisibility = () => {
  //   toggleBalanceVisibility();
  // };

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
          {isLoading ? (
            <TopbarBalanceSkeleton />
          ) : (
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <button
                className="flex items-center gap-1"
                onClick={toggleBalanceVisibility}
              >
                {isBalanceVisible ? (
                  <MdOutlineRemoveRedEye
                    style={{ marginRight: "5px", fontSize: "18px" }}
                  />
                ) : (
                  <RiEyeCloseLine
                    style={{ marginRight: "5px", fontSize: "18px" }}
                  />
                )}
              </button>
              Balance:{" "}
              <span className="text-lg text-gray-700 font-bold">
                {isBalanceVisible ? (
                  <>₦{account?.balance?.toLocaleString() || 0}</>
                ) : (
                  <>₦{"******"}</>
                )}
              </span>
            </span>
          )}

          <FiBell
            style={{
              color: theme === "dark" ? "#f5f5f5" : "#0d1b2e",
              fontSize: "17px",
            }}
          />
          <div className="tog self-center">
            {isLoadingUser ? (
              <TopbarUserSkeleton />
            ) : (
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gray-200">
                  {initials}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

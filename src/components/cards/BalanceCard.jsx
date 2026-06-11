import { useState, useEffect } from "react";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import MyButton from "../ui/ActionsButtons";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { FaAsterisk } from "react-icons/fa6";
import { useAccountStore } from "../../stores/useAccountStore";
import BalanceSkeleton from "../../skeletons/BalanceSkeleton";
import AccountNumberSkeleton from "../../skeletons/AccountNumberSkeleton";

export default function BalanceCard({ isMobile }) {
  const { theme } = useContext(ThemeContext);
  const { account, isLoading } = useAccountStore();
  const fetchAccount = useAccountStore((state) => state.fetchAccount);
  const [viewBalance, setViewBalance] = useState(true);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const handleViewBalance = () => {
    setViewBalance((prev) => !prev);
  };

  const data = account;
  console.log("Account data in BalanceCard:", data);

  return (
    <div
      style={{
        width: "96%",
        height: isMobile ? "150px" : "180px",
        background: theme === "dark" ? "#354151" : "#f5f5f5",
        boxShadow:
          theme === "dark"
            ? "0 0px 20px 4px inset rgba(230, 230, 230, 0.2)"
            : "0 0px 20px 4px  rgba(200, 200, 200, 0.4)",
        border: theme === "dark" ? "none" : "1px solid #EBEBEB",
      }}
      className=" p-4 rounded-xl "
    >
      <div
        style={{
          width: "90%",
          height: "200px",
          marginLeft: "5%",
          marginTop: isMobile ? "0px" : "5px",
          display: "flex",
          flexDirection: "column",
          rowGap: isMobile ? "70px" : "",
          justifyContent: isMobile ? "" : "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: isMobile ? "20px" : " ",
          }}
        >
          <p
            className={`${theme === "dark" ? "text-[#f5f5f5]" : "text-gray-500"} text-xs`}
          >
            My Balance
          </p>
          {isLoading ? (
            <AccountNumberSkeleton />
          ) : (
            <p
              className={`${theme === "dark" ? "text-[#f5f5f5]" : "text-gray-500"} text-xs`}
            >
              #{account?.accountNumber || "##########"}
            </p>
          )}
        </div>

        <div style={{ marginTop: isMobile ? "-50px" : "" }}>
          <p
            className="text-gray-500 text-xs flex"
            style={{ cursor: "pointer" }}
          >
            Available balance &nbsp;{" "}
            {viewBalance ? (
              <LuEye
                style={{ alignSelf: "center" }}
                onClick={handleViewBalance}
              />
            ) : (
              <LuEyeOff
                style={{ alignSelf: "center" }}
                onClick={handleViewBalance}
              />
            )}
          </p>
          <h1
            className={`text-2xl font-semibold ${
              theme === "dark" ? "text-[#f5f5f5]" : "text-gray-500"
            }`}
          >
            {!isLoading ? (
              <>
                {viewBalance ? (
                  <span>₦{account?.balance?.toLocaleString() || 0}</span>
                ) : (
                  <span className="flex gap-1">
                    ₦
                    {Array.from({ length: 4 }, (_, i) => (
                      <FaAsterisk key={i} style={{ fontSize: "13px" }} />
                    ))}
                  </span>
                )}
              </>
            ) : (
              <BalanceSkeleton />
            )}
          </h1>
        </div>
        {isMobile ? null : (
          <div>
            <MyButton />
          </div>
        )}
      </div>
    </div>
  );
}

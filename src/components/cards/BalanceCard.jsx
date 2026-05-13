import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Button from "../ui/Button";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { FaAsterisk } from "react-icons/fa6";

export default function BalanceCard({ balance, isMobile }) {
  const { theme } = useContext(ThemeContext);
  const [viewBalance, setViewBalance] = useState(true);

  const handleViewBalance = () => {
    setViewBalance((prev) => !prev);
  };

  return (
    <div
      style={{
        width: "96%",
        height: isMobile ? "150px" : "230px",
        background: theme === "dark" ? "#354151" : "#f5f5f5",
        boxShadow:
          theme === "dark"
            ? "0 0px 20px 4px inset rgba(230, 230, 230, 0.2)"
            : "",
        border: theme === "dark" ? "none" : "1px solid #EBEBEB",
      }}
      className=" p-4 rounded-xl "
    >
      <div
        style={{
          width: "90%",
          height: "200px",
          marginLeft: "5%",
          marginTop: isMobile ? "0px" : "20px",
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
            className={`${theme === "dark" ? "text-[#f5f5f5]" : "text-gray-500"}`}
          >
            My Balance
          </p>
          <p
            className={`${theme === "dark" ? "text-[#f5f5f5]" : "text-gray-500"}`}
          >
            NGN Naira
          </p>
        </div>

        <div style={{ marginTop: isMobile ? "-50px" : "" }}>
          <p
            className="text-gray-500 text-sm flex"
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
            className={`text-3xl font-semibold ${
              theme === "dark" ? "text-[#f5f5f5]" : "text-gray-500"
            }`}
          >
            {viewBalance ? (
              <span>₦ {balance}</span>
            ) : (
              <span className="flex gap-1">
                {Array.from({ length: 4 }, (_, i) => (
                  <FaAsterisk key={i} style={{ fontSize: "16px" }} />
                ))}
              </span>
            )}
          </h1>
        </div>
        {isMobile ? null : (
          <div>
            <Button />
          </div>
        )}
      </div>
    </div>
  );
}

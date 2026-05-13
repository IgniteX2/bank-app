import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function TransactionCard({ title, type, amount, date }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{ marginBottom: "20px" }}
      className={`flex justify-between p-3 border-b ${theme === "dark" ? "border-[#5e6774]" : "border-[#EBEBEB]"}`}
    >
      <div>
        <p
          style={{
            color: theme === "dark" ? "#f5f5f5" : "#0d1b2e",
          }}
          className="font-medium text-sm"
        >
          {title}
        </p>
        <p
          style={{
            marginBottom: "20px",
            color: theme === "dark" ? "#f5f5f5" : "grey",
          }}
          className="text-xs  "
        >
          {type}
        </p>
      </div>

      <div className="text-right">
        <p
          className={`font-semibold text-sm ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#0d1b2e]"}`}
        >
          {amount}
        </p>
        <p
          className={`text-xs text-xs ${theme === "dark" ? "text-[#f5f5f5]" : "text-gray-400"}`}
        >
          {date}
        </p>
      </div>
    </div>
  );
}

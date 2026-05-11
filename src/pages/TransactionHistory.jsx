import { useContext, useEffect, useState } from "react";

import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MobileNav from "../components/layout/MobileNav";
import backgroundImage from "../assets/Background.png";

import TransactionCard from "../components/cards/TransactionCard";

import { ThemeContext } from "../context/ThemeContext";

import { getTransactions } from "../services/transactionService";

function TransactionHistory() {
  const { theme } = useContext(ThemeContext);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSidebarToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();

        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div
      style={{
        background: theme === "dark" ? "rgb(13, 27, 46)" : "#F6F8FA",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "1000px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <DashboardLayout
        sidebar={
          <Sidebar
            setIsOpen={handleSidebarToggle}
            isOpen={isOpen}
            isMobile={isMobile}
          />
        }
        topbar={
          <Topbar
            isOpen={isOpen}
            setIsOpen={handleSidebarToggle}
            isMobile={isMobile}
          />
        }
        mobilebar={<MobileNav isMobile={isMobile} />}
      >
        <div
          className={`mt-6 ${theme === "dark" ? "bg-[#354151]" : "bg-white"}`}
          style={{
            width: "94%",
            marginLeft: "3%",
            border: theme === "dark" ? "none" : "1px solid #EBEBEB",

            borderRadius: "15px",

            minHeight: "500px",

            marginTop: isMobile ? "20px" : "80px",

            marginBottom: isMobile ? "85px" : "",

            background: isMobile ? "transparent" : "",
          }}
        >
          <div
            className="border-b border-[#EBEBEB]"
            style={{
              padding: "20px",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color: theme === "dark" ? "#f5f5f5" : "#0D0D12",
              }}
            >
              View all your recent transactions
            </p>

            {/* <p
              className="text-sm mt-2"
              style={{
                color: theme === "dark" ? "#B0B7C3" : "#818898",
              }}
            >
              View all your recent transactions
            </p> */}
          </div>

          <div
            style={{
              padding: "20px",
            }}
          >
            {loading ? (
              <p
                style={{
                  color: theme === "dark" ? "#f5f5f5" : "#0D0D12",
                }}
              >
                Loading transactions...
              </p>
            ) : transactions.length === 0 ? (
              <p
                style={{
                  color: theme === "dark" ? "#f5f5f5" : "#0D0D12",
                }}
              >
                No transactions yet
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {transactions.map((tx) => (
                  <TransactionCard key={tx.id} tx={tx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default TransactionHistory;

import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../components/layout/Dashboard";
import AppSidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import BalanceCard from "../components/cards/BalanceCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ThemeContext } from ".././context/ThemeContext";
import MobileNav from "../components/layout/MobileNav";
import ActionButtons from "../components/ui/ActionsButtons";
import backgroundImage from "../assets/Background.png";
import { getUser } from "../services/authService";
import { Logs } from "lucide-react";
import TransactionsTable from "../components/cards/DashboardTransactionTable";

// import TransactionsList from "../components/cards/TransactionsList";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSidebarToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await getUser(userId);

        console.log("loggedUser:", res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        background: theme === "dark" ? "rgb(13, 27, 46)" : "#F6F8FA",
        height: "100vh",
      }}
    >
      <DashboardLayout
        sidebar={
          <AppSidebar
            setIsOpen={handleSidebarToggle}
            isOpen={isOpen}
            isMobile={isMobile}
            userName={user?.userId || "Name"}
            userEmail={user?.email || "Email"}
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
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundImage: theme === "dark" ? "" : `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: isMobile ? "400px" : "1000px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{ marginTop: isMobile ? "20px" : "50px", marginLeft: "3%" }}
            className={`${!isMobile ? "grid grid-cols-3 gap-4" : ""}`}
          >
            <BalanceCard
              balance={user?.balance || 0.0}
              isMobile={isMobile}
              accountNum={user?.account_number || "#0000000000"}
            />
          </div>

          {isMobile ? (
            <div>
              <ActionButtons isMobile={isMobile} />
            </div>
          ) : null}

          <div
            className={`mt-6 ${theme === "dark" ? "bg-[#354151]" : "bg-white"}`}
            style={{
              width: "75%",
              marginLeft: "3%",
              border: theme === "dark" ? "none" : "1px solid #EBEBEB",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              justifyContent: "space-between",
              marginBottom: isMobile ? "85px" : "",
              background: isMobile ? "transparent" : " ",
            }}
          >
            <div style={{ width: "96%", marginLeft: "2%" }}>
              <h3
                className="p-3 font-semibold text-sm"
                style={{
                  marginTop: "20px",
                  color: theme === "dark" ? "#f5f5f5" : "",
                }}
              >
                <div
                  className="text-gray-700"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Logs className="mr-2 h-4 w-4" />
                  Recent Transactions
                </div>
              </h3>

              <div style={{ marginTop: "20px" }}>
                <TransactionsTable />
              </div>
            </div>
            <NavLink to="../transactions">
              <div
                style={{
                  background: theme === "dark" ? "#0a1628" : "#DFE1E7",
                  padding: "5px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    color: theme === "dark" ? "#f5f5f5" : "",
                  }}
                  className="text-xs"
                >
                  See All &nbsp;{" "}
                  <FaLongArrowAltRight style={{ alignSelf: "center" }} />
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

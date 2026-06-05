import { useContext, useEffect, useMemo, useState } from "react";
import { useTransactionHistoryStore } from "../stores/useTransactionsStore";
import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MobileNav from "../components/layout/MobileNav";
import backgroundImage from "../assets/Background.png";

import { ThemeContext } from "../context/ThemeContext";

import { FiSearch } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

import TransactionsTableSkeleton from "../skeletons/transactionTableSkeleton";
import TransactionsTable from "../components/cards/DashboardTransactionTable";
import MainTransactionsTable from "../components/cards/TransactionTable";

function TransactionHistory() {
  const { theme } = useContext(ThemeContext);

  // UI states
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // all | income | expense
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [showFilter, setShowFilter] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // dropdown actions
  const [openMenu, setOpenMenu] = useState(null);
  const transactions = useTransactionHistoryStore(
    (state) => state.transactions,
  );

  const handleSidebarToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FILTER LOGIC (source of truth)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.transactionType?.toLowerCase().includes(search.toLowerCase()) ||
        tx.description?.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        filterType === "all"
          ? true
          : filterType === "income"
            ? tx.transactionType === "DEPOSIT"
            : tx.transactionType !== "DEPOSIT";

      const txDate = new Date(tx.transactionCreatedAt);

      const matchesDate =
        (!dateFilter.from || txDate >= new Date(dateFilter.from)) &&
        (!dateFilter.to || txDate <= new Date(dateFilter.to));

      return matchesSearch && matchesType && matchesDate;
    });
  }, [transactions, search, filterType, dateFilter]);

  // pagination logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage),
  );

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  return (
    <div
      style={{
        background: theme === "dark" ? "rgb(13, 27, 46)" : "#F6F8FA",
        height: "100vh",
        width: "100%",
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
          style={{
            width: "96%",
            marginLeft: "2%",
            padding: "20px",
            height: isMobile ? "90vh" : "85vh",
            marginTop: "20px",
            backgroundImage: theme === "dark" ? "" : `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: isMobile ? "100px" : "1000px",
            backgroundRepeat: "no-repeat",
            overflowX: "hidden",
          }}
        >
          {/* TOP CONTROLS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              marginBottom: 10,
              width: "92%",
              height: isMobile ? "40px" : "50px",
              marginLeft: "4%",
            }}
          >
            {/* FILTER BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: 10,
                // border: "1px solid red",
                height: "35px",
              }}
            >
              {["all", "income", "expense"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  style={{
                    padding: isMobile ? "5px 15px" : "0px 10px",
                    borderRadius: isMobile ? 7 : 5,
                    border: "none",
                    background: filterType === type ? "#C9A227" : "transparent",
                    color: filterType === type ? "#fff" : "#888",
                    cursor: "pointer",
                    fontSize: isMobile ? "14px" : "10px",
                  }}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                height: isMobile ? "40px" : "35px",
                marginTop: isMobile ? "20px" : "",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: 10,
                }}
              >
                <FiSearch className="text-sm" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  style={{
                    border: "none",
                    outline: "none",
                    marginLeft: 10,
                    fontSize: "10px",
                    width: isMobile ? "170px" : "190px",
                  }}
                />
              </div>

              {/* DATE FILTER */}
              <button
                onClick={() => setShowFilter(true)}
                style={{
                  border: "1px solid #E5E5E5",
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: isMobile ? "5px 22px" : "5px 22px",
                  cursor: "pointer",
                  color: "#666",
                  fontSize: "17px",
                  display: isMobile ? "flex" : "block",
                  height: "35px",
                }}
              >
                <span>▼</span> Filter
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div
            className={`mt-6 ${theme === "dark" ? "bg-[#354151]" : "bg-white"}`}
            style={{
              width: "94%",
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
              <div style={{ marginTop: "20px" }}>
                <MainTransactionsTable />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>

            <div style={{ display: "flex", gap: 10 }} className="text-sm">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                Prev
              </button>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default TransactionHistory;

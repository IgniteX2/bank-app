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
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // dropdown actions
  // const [openMenu, setOpenMenu] = useState(null);
  const transactions = useTransactionHistoryStore(
    (state) => state.transactions,
  );

  const handleSidebarToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const matchesSearch = useMemo(() => {
    const q = search.toLowerCase().trim();

    return (tx) => {
      if (!q) return true;

      return (
        tx.transactionType?.toLowerCase().includes(q) ||
        tx.description?.toLowerCase().includes(q) ||
        tx.status?.toLowerCase().includes(q) ||
        String(tx.amount)?.includes(q) ||
        String(tx.transactionId)?.includes(q) ||
        String(tx.senderAccountId)?.includes(q) ||
        String(tx.receiverAccountId)?.includes(q) ||
        new Date(tx.transactionCreatedAt)
          ?.toLocaleString()
          .toLowerCase()
          .includes(q)
      );
    };
  }, [search]);

  // FILTER LOGIC (source of truth)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch = matchesSearch(tx);

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

      return matchSearch && matchesType && matchesDate;
    });
  }, [transactions, matchesSearch, filterType, dateFilter]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort(
      (a, b) =>
        new Date(b.transactionCreatedAt) - new Date(a.transactionCreatedAt),
    );
  }, [filteredTransactions]);

  // pagination logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage),
  );

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(start, start + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

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
              minHeight: "150px",
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
                <MainTransactionsTable
                  transactionData={paginatedTransactions}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginBottom: 20,
                width: "98%",
                marginLeft: "1%",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              className="bg-gray-50"
            >
              <p className="text-sm">
                Page {currentPage} of {totalPages}
              </p>

              <div style={{ display: "flex", gap: 10 }} className="text-sm">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="cursor-pointer"
                >
                  Prev
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className="cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {showFilter && (
            <div
              onClick={() => setShowFilter(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.4)",
                zIndex: 50,
              }}
            />
          )}

          <div
            style={{
              position: "fixed",
              top: 0,
              right: showFilter ? 0 : "-400px",
              width: "380px",
              height: "100vh",
              background: "#fff",
              zIndex: 60,
              transition: "right 0.3s ease-in-out",
              boxShadow: "-5px 0 20px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>Filter Transactions</h2>

              <button
                onClick={() => setShowFilter(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* TYPE FILTER */}
            <div>
              <p style={{ fontWeight: "600" }}>Transaction Type</p>

              {["all", "income", "expense"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    border:
                      filterType === type ? "2px solid #111" : "1px solid #ddd",
                    background: filterType === type ? "#f5f5f5" : "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {/* DATE FILTER */}
            <div>
              <p style={{ fontWeight: "600" }}>Date Range</p>

              <input
                type="date"
                value={dateFilter.from}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, from: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />

              <input
                type="date"
                value={dateFilter.to}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, to: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* RESET BUTTON */}
            <button
              onClick={() => {
                setFilterType("all");
                setSearch("");
                setDateFilter({ from: "", to: "" });
              }}
              style={{
                marginTop: "auto",
                padding: "12px",
                background: "#C9A227",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default TransactionHistory;

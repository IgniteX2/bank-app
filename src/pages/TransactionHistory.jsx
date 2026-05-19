import { useContext, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MobileNav from "../components/layout/MobileNav";
import backgroundImage from "../assets/Background.png";

import { ThemeContext } from "../context/ThemeContext";
import { getTransactions } from "../services/transactionService";

import { FiSearch } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import TableSkeleton from "../components/layout/TableSkeleton";

function TransactionHistory() {
  const { theme } = useContext(ThemeContext);

  // raw data from API
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleSidebarToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // FILTER LOGIC (source of truth)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.name.toLowerCase().includes(search.toLowerCase()) ||
        tx.type.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        filterType === "all"
          ? true
          : filterType === "income"
            ? tx.amount.startsWith("+")
            : tx.amount.startsWith("-");

      const txDate = new Date(tx.date);

      const matchesDate =
        (!dateFilter.from || new Date(dateFilter.from) <= txDate) &&
        (!dateFilter.to || new Date(dateFilter.to) >= txDate);

      return matchesSearch && matchesType && matchesDate;
    });
  }, [transactions, search, filterType, dateFilter]);

  // pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

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
              width: "100%",
              height: isMobile ? "40px" : "50px",
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
          {!loading ? (
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                marginTop: isMobile ? "80px" : "20px",
              }}
            >
              {/* TABLE HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 20px",
                  background: "#f8fafc",
                  fontWeight: 600,
                  color: "#555",
                  borderBottom: "1px solid #e5e7eb",
                }}
                className="text-sm"
              >
                {/* LEFT */}
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  Transaction
                </div>

                {/* RIGHT */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? 15 : 30,
                  }}
                >
                  {/* AMOUNT */}
                  {!isMobile && (
                    <div
                      style={{
                        minWidth: 100,
                      }}
                    >
                      Amount
                    </div>
                  )}

                  {/* DATE */}
                  <div
                    style={{
                      minWidth: isMobile ? "auto" : 100,
                      textAlign: "right",
                    }}
                  >
                    Date
                  </div>

                  {/* ACTION */}
                  {!isMobile && (
                    <div
                      style={{
                        width: 50,
                        textAlign: "center",
                      }}
                    >
                      Action
                    </div>
                  )}
                </div>
              </div>

              {/* TABLE BODY */}
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "18px 20px",
                        borderBottom: "1px solid #f1f5f9",
                        background: openMenu === index ? "#f9fafb" : "#fff",
                        transition: "0.3s ease",
                        gap: 15,
                      }}
                      className="text-xs"
                    >
                      {/* LEFT SIDE */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          flex: 1,
                        }}
                      >
                        {/* NAME */}
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#111827",
                            fontSize: 15,
                          }}
                        >
                          {tx.name}
                        </span>

                        {/* TYPE */}
                        <span
                          style={{
                            fontSize: 13,
                            color: "#6b7280",
                            background: "#eef2ff",
                            width: "fit-content",
                            padding: "4px 10px",
                            borderRadius: 20,
                          }}
                        >
                          {tx.type}
                        </span>

                        {/* AMOUNT ON MOBILE */}
                        {isMobile && (
                          <span
                            style={{
                              fontWeight: 600,
                              marginTop: 4,
                              color:
                                tx.type?.toLowerCase() === "income"
                                  ? "#16a34a"
                                  : "#dc2626",
                            }}
                          >
                            {tx.type?.toLowerCase() === "income" ? "+" : "-"}₦
                            {tx.amount}
                          </span>
                        )}
                      </div>

                      {/* RIGHT SIDE */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? 10 : 30,
                        }}
                      >
                        {/* DESKTOP AMOUNT */}
                        {!isMobile && (
                          <div
                            style={{
                              fontWeight: 600,
                              color:
                                tx.type?.toLowerCase() === "income"
                                  ? "#16a34a"
                                  : "#dc2626",
                              minWidth: 100,
                            }}
                          >
                            {tx.type?.toLowerCase() === "income" ? "+" : "-"}₦
                            {tx.amount}
                          </div>
                        )}

                        {/* DATE */}
                        <div
                          style={{
                            color: "#6b7280",
                            fontSize: 14,
                            minWidth: isMobile ? "auto" : 100,
                            textAlign: "right",
                          }}
                        >
                          {tx.date}
                        </div>

                        {/* ACTION MENU */}
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <BsThreeDots
                            onClick={() =>
                              setOpenMenu(openMenu === index ? null : index)
                            }
                            style={{
                              cursor: "pointer",
                              fontSize: 20,
                              color: "#4b5563",
                            }}
                          />

                          {openMenu === index && (
                            <div
                              style={{
                                position: "absolute",
                                top: 30,
                                right: 0,
                                width: 140,
                                background: "#fff",
                                borderRadius: 12,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                                border: "1px solid #eee",
                                overflow: "hidden",
                                zIndex: 100,
                              }}
                            >
                              <div
                                style={{
                                  padding: "12px 14px",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </div>

                              <div
                                style={{
                                  padding: "12px 14px",
                                  cursor: "pointer",
                                }}
                              >
                                Edit
                              </div>

                              <div
                                style={{
                                  padding: "12px 14px",
                                  cursor: "pointer",
                                  color: "#dc2626",
                                  borderTop: "1px solid #f3f4f6",
                                }}
                              >
                                Delete
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: 40,
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                  className="text-sm"
                >
                  No transaction found
                </div>
              )}
            </div>
          ) : (
            <TableSkeleton isMobile={isMobile} />
          )}

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

          {/* PAGINATION */}
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

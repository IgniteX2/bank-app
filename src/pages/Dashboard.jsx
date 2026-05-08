import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import BalanceCard from "../components/cards/BalanceCard";
import TransactionCard from "../components/cards/TransactionCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{ marginTop: "80px", marginLeft: "3%" }}
          className="grid grid-cols-3 gap-4 "
        >
          <BalanceCard balance="67,480,100" />
        </div>

        <div
          className="mt-6 bg-white"
          style={{
            width: "94%",
            marginLeft: "3%",
            border: "1px solid #EBEBEB",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "96%", marginLeft: "2%" }}>
            <h3 className="p-3 font-semibold" style={{ marginTop: "20px" }}>
              Recent Transactions
            </h3>

            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                borderBottom: "1px solid #EBEBEB",
                background: "transparent",
                width: "100%",
              }}
              className="flex items-center justify-between"
            >
              <div
                style={{
                  padding: "3px 25px",
                  columnGap: "15px",
                  marginBottom: "25px",
                }}
                className="flex items-center bg-[#F4F2EE] rounded-lg p-1 gap-1"
              >
                <button
                  className="
            px-12 py-4
            rounded-lg
            text-[#8B8B8B]
            font-medium
            transition
            cursor-pointer
          "
                >
                  Income
                </button>

                <button
                  style={{ padding: " 10px 10px" }}
                  className="
            rounded-lg
            bg-white
            text-[#1A1A1A]
            font-semibold
            shadow-sm
            border border-[#E7E5E4]
            transition
            cursor-pointer
          "
                >
                  Outcome
                </button>

                <button
                  className="
            px-12 py-4
            rounded-2xl
            text-[#8B8B8B]
            font-medium
            transition
            cursor-pointer
          "
                >
                  Pending
                </button>
              </div>

              {/* DROPDOWN */}
              <button
                className="
          flex items-center gap-2
          text-[#8B8B8B]
          font-medium
          cursor-pointer
        "
              >
                Last Week
                <span className="text-[10px]">▼</span>
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <TransactionCard
                title="Netflix Monthly"
                type="Subscription"
                amount="₦3,839.91"
                date="06/27"
              />

              <TransactionCard
                title="Spotify Premium"
                type="Subscription"
                amount="₦1,200"
                date="06/26"
              />
            </div>
          </div>
          <div
            style={{
              background: "#FAFAFA",
              padding: "10px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink to="./transactions">
              <p style={{ display: "flex", cursor: "pointer" }}>
                See All &nbsp;{" "}
                <FaLongArrowAltRight style={{ alignSelf: "center" }} />
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

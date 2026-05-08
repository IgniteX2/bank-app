import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import BalanceCard from "../components/cards/BalanceCard";
import TransactionCard from "../components/cards/TransactionCard";

export default function Dashboard() {
  return (
    <DashboardLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div className="grid grid-cols-3 gap-4">
        <BalanceCard balance="67,480,100" />
      </div>

      <div className="mt-6 bg-white rounded-xl shadow">
        <h3 className="p-3 font-semibold">Recent Transactions</h3>

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
    </DashboardLayout>
  );
}

import { useEffect, useState } from "react";
import { getBalance } from "../services/authService";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await getBalance();
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {loading ? (
        <p>Loading balance...</p>
      ) : (
        <h1>₦{balance.toLocaleString()}</h1>
      )}
    </div>
  );
}

export default Dashboard;

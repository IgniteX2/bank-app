import { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";
import TransactionCard from "./TransactionCard";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading transactions...</p>;

  if (transactions.length === 0) {
    return <p>No transactions yet</p>;
  }

  return (
    <div style={{ padding: "15px" }}>
      <h2>Transaction History</h2>

      {transactions.map((tx) => (
        <TransactionCard key={tx.id} tx={tx} />
      ))}
    </div>
  );
}

export default TransactionHistory;

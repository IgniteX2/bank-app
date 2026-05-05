import { useNavigate } from "react-router-dom";

function TransactionCard({ tx }) {
  const isDebit = tx.type === "DEBIT";
  const navigate = useNavigate();

  return (
    <div style={card}>
      <div style={left}>
        <div
          style={{
            ...icon,
            background: isDebit ? "#ffecec" : "#e6fffa",
          }}
        >
          {isDebit ? "⬆️" : "⬇️"}
        </div>

        <div>
          <p style={{ fontWeight: "bold" }}>
            {isDebit ? "Transfer Sent" : "Money Received"}
          </p>

          <p style={subText}>
            {isDebit ? `To: ${tx.toAccount}` : `From: ${tx.fromAccount}`}
          </p>

          <p style={date}>{new Date(tx.date).toLocaleString()}</p>
        </div>
      </div>

      <p
        style={{
          color: isDebit ? "red" : "green",
          fontWeight: "bold",
        }}
      >
        {isDebit ? "-" : "+"}₦{Number(tx.amount).toLocaleString()}
      </p>
      <button onClick={() => navigate(`/transaction/${tx.id}`)}>
        View Details
      </button>
    </div>
  );
}

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px",
  marginBottom: "10px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
};

const left = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const icon = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const subText = {
  fontSize: "12px",
  color: "#666",
};

const date = {
  fontSize: "11px",
  color: "#aaa",
};

export default TransactionCard;

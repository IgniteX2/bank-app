export default function TransactionCard({ title, type, amount, date }) {
  return (
    <div
      style={{ marginBottom: "20px" }}
      className="flex justify-between p-3 border-b border-[#EBEBEB]"
    >
      <div>
        <p className="font-medium">{title}</p>
        <p style={{ marginBottom: "20px" }} className="text-xs text-gray-500 ">
          {type}
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold">{amount}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
}

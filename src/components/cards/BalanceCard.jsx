export default function BalanceCard({ balance }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500">My Balance</p>
      <h1 className="text-2xl font-bold">₦{balance}</h1>

      <div className="flex gap-3 mt-3">
        <button className="bg-green-500 text-white px-3 py-1 rounded">
          Send
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Request
        </button>
      </div>
    </div>
  );
}

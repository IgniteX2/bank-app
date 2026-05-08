import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

export default function BalanceCard({ balance }) {
  return (
    <div
      style={{
        width: "100%",
        height: "250px",
        background: "#ffffff",
        border: "1px solid #EBEBEB",
      }}
      className=" p-4 rounded-xl "
    >
      <div
        style={{
          width: "90%",
          height: "200px",
          marginLeft: "5%",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="text-gray-500">My Balance</p>
          <p className="text-gray-500">NGN Naira</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Available balance</p>
          <h1 className="text-3xl font-semibold">₦{balance}</h1>
        </div>

        <div className="flex gap-3 mt-3">
          <button
            style={{ padding: "10px 15px", display: "flex", cursor: "pointer" }}
            className="bg-[#C9A227] text-white px-3 py-1 rounded-lg"
          >
            <FaLongArrowAltUp style={{ alignSelf: "center" }} /> Send
          </button>
          <button
            style={{ padding: "10px", display: "flex", cursor: "pointer" }}
            className="bg-[#C9A227] text-white rounded-lg"
          >
            <FaLongArrowAltDown style={{ alignSelf: "center" }} /> Request
          </button>
        </div>
      </div>
    </div>
  );
}

import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

export default function Button({ isMobile }) {
  return (
    <div className={`flex gap-3 mt-3 ${isMobile ? "justify-center" : ""}`}>
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
  );
}

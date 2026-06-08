import { NavLink, useNavigate } from "react-router-dom";

import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

export default function MyButton({ isMobile }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex gap-3  ${isMobile ? "justify-center" : ""}`}
      style={{ marginBottom: "30px" }}
    >
      <button
        style={{ padding: "10px 15px", display: "flex", cursor: "pointer" }}
        className="bg-[#C9A227] text-white px-3 py-1 rounded-lg text-xs self-center"
      >
        <FaLongArrowAltUp style={{ alignSelf: "center" }} />{" "}
        <NavLink to="/transfer" end>
          Send
        </NavLink>
      </button>
      <button
        style={{ padding: "10px", display: "flex", cursor: "pointer" }}
        className="bg-[#C9A227] text-white rounded-lg text-xs self-center"
      >
        <FaLongArrowAltDown style={{ alignSelf: "center" }} /> Request
      </button>
    </div>
  );
}

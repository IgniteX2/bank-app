import { FiHome, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { FaAngleLeft } from "react-icons/fa6";

import { RiExchangeLine } from "react-icons/ri";

const navItems = [
  { label: "Dashboard", icon: <FiHome /> },
  { label: "Transactions", icon: <RiExchangeLine /> },
];

const otherItems = [
  { label: "Settings", icon: <FiSettings /> },
  { label: "Get Help", icon: <FiHelpCircle /> },
  { label: "Logout", icon: <FiLogOut /> },
];

export default function Sidebar() {
  return (
    <aside className="sidebar w-84 h-screen bg-white shadow-md flex flex-col justify-between">
      {/* TOP */}
      <div>
        <div
          style={{ marginTop: "30px" }}
          className="flex items-center justify-between "
        >
          <div className="p-4 font-bold text-xl">IGNITE X BANKING</div>
          <FaAngleLeft />
        </div>

        <div className="p-4" style={{ marginTop: "60px" }}>
          <p className="text-xs text-gray-400 mb-2">MAIN</p>
          {navItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-400 mb-2">OTHER</p>
          {otherItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <div className="text-sm font-semibold">Alexajohn</div>
        <div className="text-xs text-gray-500">John@mail.com</div>
      </div>
    </aside>
  );
}

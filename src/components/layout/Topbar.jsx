import { FiSearch, FiBell } from "react-icons/fi";

export default function Topbar() {
  return (
    <div className="topbar flex justify-between items-center p-4 border-b">
      <div>
        <h2 className="text-xl font-bold">Your Financial Dashboard</h2>
        <p className="text-sm text-gray-500">Welcome back, Max Verstappen!</p>
      </div>

      <div className="flex items-center gap-3">
        <FiSearch />
        <FiBell />
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

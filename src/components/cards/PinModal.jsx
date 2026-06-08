import { useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

function PinModal({ isOpen, onClose, onConfirm, loading }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  if (!isOpen) return null;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(pin)) {
      toast.error("PIN must be 4 digits");
      triggerShake();
      return;
    }

    onConfirm(pin);
    setPin("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`
          relative w-[90%] max-w-md bg-white rounded-2xl shadow-xl p-6
          animate-fade-in
          ${shake ? "animate-shake" : ""}
        `}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#141414]">
            Enter Transaction PIN
          </h3>

          <button
            onClick={onClose}
            className="text-[#818898] hover:text-[#141414]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#818898] mb-6">
          Secure authorization required to complete this transfer
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="password"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            className="w-full h-12 text-center text-lg tracking-[0.5em] font-bold border border-[#EBEBEB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C2C]"
          />

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-[#EBEBEB] text-sm font-semibold text-[#141414] hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-[#C69C2C] text-white text-sm font-bold shadow-[0_4px_14px_rgba(198,156,44,0.39)] hover:scale-[1.02] transition-all disabled:opacity-60"
            >
              {loading ? "Processing..." : "Confirm"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default PinModal;
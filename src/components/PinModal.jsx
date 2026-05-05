import { useState } from "react";
import { toast } from "react-toastify";

function PinModal({ isOpen, onClose, onConfirm, loading }) {
  const [pin, setPin] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(pin)) {
      toast.error("PIN must be 4 digits");
      return;
    }

    onConfirm(pin);
    setPin("");
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Enter Transaction PIN</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="****"
            style={input}
          />

          <div style={{ marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Confirm"}
            </button>

            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const input = {
  fontSize: "20px",
  textAlign: "center",
  letterSpacing: "10px",
};

export default PinModal;

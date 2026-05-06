import { useState } from "react";
import { transferMoney } from "../services/transactionService";
import { toast } from "react-toastify";
import PinModal from "./PinModal";

function Transfer() {
  const [form, setForm] = useState({
    toAccount: "",
    amount: "",
  });

  const [showPinModal, setShowPinModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.toAccount || !form.amount) {
      return "All fields are required";
    }

    if (!/^\d{10}$/.test(form.toAccount)) {
      return "Account number must be 10 digits";
    }

    if (Number(form.amount) <= 0) {
      return "Invalid amount";
    }

    return null;
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setShowPinModal(true);
  };

  const handleConfirmTransfer = async (pin) => {
    setLoading(true);

    try {
      await transferMoney({
        ...form,
        amount: Number(form.amount),
        pin,
      });

      toast.success("Transfer successful", {
        onClose: () => {
          setShowPinModal(false);
        },
      });

      setForm({ toAccount: "", amount: "" });

      setTimeout(() => {
        setShowPinModal(false);
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <>
      <form onSubmit={handleInitialSubmit}>
        <input
          placeholder="Account Number"
          value={form.toAccount}
          onChange={(e) => setForm({ ...form, toAccount: e.target.value })}
        />

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <button>Send Money</button>
      </form>

      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onConfirm={handleConfirmTransfer}
        loading={loading}
      />
    </>
  );
}

export default Transfer;

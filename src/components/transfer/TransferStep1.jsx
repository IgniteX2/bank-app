"use client";

import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
// import { getSenderAccount } from "../../services/transactionService";

export default function TransferStep1({
  onContinue,
  transferData,
  accountDetails,
  beneficiary,
  resolving,
  setBeneficiary,
  handleBeneficiaryConfirmation,
  errorBeneficiary,
  setErrorBeneficiary,
}) {
  const senderAccount = accountDetails || "";

  const [accountNumber, setAccountNumber] = useState(
    transferData?.accountNumber || "",
  );

  const [amount, setAmount] = useState(() => transferData?.amount || "");

  const [bank, setBank] = useState(() => transferData?.bank || "Signature X");

  const [narration, setNarration] = useState(
    () => transferData?.narration || "",
  );

  const [errors, setErrors] = useState({});
  const [beneficiaryError, setBeneficiaryError] = useState("");

  const ourFee = 10;
  // VAT is 7.5% of our fee (not a fixed value)
  const vatFee = ourFee * 0.075;

  const total = parseFloat(amount || "0") + ourFee + vatFee;

  const validate = () => {
    const newErrors = {};

    if (!senderAccount.trim()) {
      newErrors.senderAccount = "Sender account number is required";
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = "Recipient account number is required";
    }

    if (
      !amount.trim() ||
      isNaN(parseFloat(amount)) ||
      parseFloat(amount) <= 0
    ) {
      newErrors.amount = "Enter a valid amount";
    }

    if (!narration.trim()) {
      newErrors.narration = "Narration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setBeneficiary("");
    setBeneficiaryError("");
    setErrorBeneficiary("");
  }, [accountNumber, setBeneficiary, setBeneficiaryError, setErrorBeneficiary]);

  const handleContinue = () => {
    if (!validate()) return;
    if (!beneficiary) {
      setBeneficiaryError("Verify beneficiary again!");
      return;
    }

    onContinue({
      senderAccount,
      accountNumber,
      amount,
      bank,
      narration,
      fees: {
        ourFee,
        vatFee,
        total,
      },
      beneficiaryName: "Adebayo O. Lawal",
    });
  };

  return (
    <div className="transfer-page">
      {/* Header */}
      <div className="transfer-header">
        <div>
          <h1 className="transfer-title" style={{ color: "#818898" }}>
            Send Money
          </h1>
          <p className="transfer-subtitle" style={{ color: "#818898" }}>
            Enter transfer details to continue
          </p>
        </div>

        <button className="icon-btn">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Card */}
      <div className="transfer-card">
        {/* Sender */}
        <div className="field">
          <label style={{ color: "#818898" }}>Sender Account</label>
          <input
            type="text"
            value={accountDetails}
            readOnly
            disabled
            className="w-full h-12 px-4 border border-[#EBEBEB] rounded-xl bg-[#F9FAFB] text-sm text-[#141414] cursor-not-allowed"
          />
          {errors.senderAccount && (
            <span className="error-text">{errors.senderAccount}</span>
          )}
        </div>

        {/* Recipient */}
        <div className="field">
          <label style={{ color: "#818898" }}>Recipient Account</label>
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            onBlur={() => handleBeneficiaryConfirmation(accountNumber)}
            className={errors.accountNumber ? "error" : ""}
          />
          {errors.accountNumber && (
            <span className="error-text">{errors.accountNumber}</span>
          )}
          <span
            className={`text-xs text-gray-700 ${beneficiary ? "text-green-700" : "text-red-600"}`}
          >
            {resolving ? "Checking..." : beneficiary || errorBeneficiary}
          </span>

          <span className="text-xs text-red-600">{beneficiaryError}</span>
        </div>

        {/* Amount */}
        <div className="field">
          <label style={{ color: "#818898" }}>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? "error" : ""}
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        {/* Bank */}
        <div className="field">
          <label style={{ color: "#818898" }}>Bank</label>
          <div className="select-box">
            <input value={bank} readOnly />
            <ChevronDown className="icon" />
          </div>
        </div>

        {/* Narration */}
        <div className="field">
          <label style={{ color: "#818898" }}>Narration</label>
          <input
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            className={errors.narration ? "error" : ""}
          />
          {errors.narration && (
            <span className="error-text">{errors.narration}</span>
          )}
        </div>

        {/* Fees */}
        <div className="fees">
          <div>
            <span style={{ color: "#818898" }}>Fee</span>
            <b>{ourFee.toFixed(2)} NGN</b>
          </div>
          <div>
            <span style={{ color: "#818898" }}>VAT</span>
            <b>{vatFee.toFixed(2)} NGN</b>
          </div>
        </div>

        {/* Total */}
        <div className="summary">
          <span style={{ color: "#818898" }}>You Send</span>
          <h2>
            NGN{" "}
            {isNaN(total)
              ? "0.00"
              : total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
          </h2>
        </div>
      </div>

      {/* Button */}
      <div className="transfer-actions">
        <button onClick={handleContinue} className="primary-btn">
          Continue
        </button>
      </div>
    </div>
  );
}

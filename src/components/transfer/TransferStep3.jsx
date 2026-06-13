import React from "react";
import { Check, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TransferStep3({ data, beneficiary, onBack }) {
  const navigate = useNavigate();
  const {
    accountNumber,
    amount,
    bank,
    fees,
    beneficiaryName,
    narration = "Payment for website design",
    transactionRef = "KDP/260514/TRF/8H2K9L",
  } = data;

  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="transfer-page">
      {/* Success icon */}
      <div className="flex flex-col items-center mb-6">
        <div className="success-badge">
          <Check className="w-6 h-6 text-white" />
        </div>

        <h1 className="transfer-title mt-4">Transfer successful</h1>

        <p className="transfer-subtitle">
          ₦
          {Number(fees?.total || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          has been sent
        </p>
      </div>

      {/* Receipt Card */}
      <div className="transfer-card">
        <div className="receipt-grid">
          <div className="receipt-row">
            <span className="label">Beneficiary</span>
            <span className="value">{beneficiary}</span>
          </div>

          <div className="receipt-row">
            <span className="label">Bank / Account</span>
            <span className="value">
              {bank} • {accountNumber}
            </span>
          </div>

          <div className="receipt-row">
            <span className="label">Amount</span>
            <span className="value highlight">
              ₦{Number(amount || 0).toLocaleString()}
            </span>
          </div>

          <div className="receipt-row">
            <span className="label">Transfer fee</span>
            <span className="value">₦{fees?.ourFee?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="receipt-row">
            <span className="label">VAT</span>
            <span className="value">₦{fees?.vatFee?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="divider" />

          <div className="receipt-row">
            <span className="label strong">Total debited</span>
            <span className="value strong">
              ₦{Number(fees?.total || 0).toLocaleString()}
            </span>
          </div>

          <div className="meta-box">
            <div className="receipt-row">
              <span className="label">Date & time</span>
              <span className="value">
                {formattedDate} • {formattedTime}
              </span>
            </div>

            <div className="receipt-row">
              <span className="label">Reference</span>
              <span className="value break">{transactionRef}</span>
            </div>

            <div className="receipt-row">
              <span className="label">Narration</span>
              <span className="value">{narration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="transfer-actions">
        <button className="primary-btn" onClick={onBack}>
          Continue
        </button>

        <button className="secondary-btn">
          <FileText className="w-4 h-4" />
          Share receipt
        </button>

        <a href="/dashboard" className="link-btn">
          Back to dashboard
        </a>
      </div>

      <p className="footer-note">Powered by FASYL Instant Payment</p>
    </div>
  );
}

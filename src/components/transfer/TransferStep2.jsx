import React from "react";

export default function TransferStep2({
  onContinue,
  onBack,
  data,
  beneficiary,
}) {
  const { accountNumber, amount, bank, fees, beneficiaryName, narration } =
    data;

  return (
    <div className="transfer-page">
      {/* Header */}
      <div className="transfer-header">
        <div>
          <h1 className="transfer-title">Review Transfer</h1>
          <p className="transfer-subtitle">
            Confirm details before sending money
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="transfer-card">
        {/* Beneficiary */}
        <div className="review-section">
          <div className="review-left">
            <span className="label">Beneficiary</span>
            <h2 className="value-lg">{beneficiary}</h2>

            <div className="meta">
              <p>
                <span>Account:</span> {accountNumber}
              </p>
              <p>
                <span>Bank:</span> {bank}
              </p>
              <p>
                <span>Type:</span> NUBAN / NIP
              </p>
            </div>
          </div>

          <div className="avatar-box">
            <span>KDP</span>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Details */}
        <div className="section">
          <div className="row">
            <span>Amount</span>
            <b className="big">
              ₦
              {parseFloat(amount || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </b>
          </div>

          <div className="row">
            <span>Transfer Fee</span>
            <b>₦{fees?.ourFee?.toFixed(2) || "0.00"}</b>
          </div>

          <div className="row">
            <span>VAT (7.5%)</span>
            <b>₦{fees?.vatFee?.toFixed(2) || "0.00"}</b>
          </div>
        </div>

        <div className="divider" />

        {/* Total */}
        <div className="row total">
          <span>Total Debit</span>
          <b>
            ₦
            {fees?.total?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) || "0.00"}
          </b>
        </div>

        {/* Narration */}
        <div className="narration">
          <span className="label">Narration</span>
          <p>{narration}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="transfer-actions row-center gap">
        <button onClick={onBack} className="secondary-btn">
          Go Back
        </button>

        <button onClick={() => onContinue({})} className="primary-btn">
          Continue
        </button>
      </div>
    </div>
  );
}

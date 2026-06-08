'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { getSenderAccount } from '../../services/transactionService';

export default function TransferStep1({ onContinue, data }) {
  const senderAccount = data?.senderAccount || getSenderAccount() || "";

  const [accountNumber, setAccountNumber] = useState(
    () => data?.accountNumber || ''
  );

  const [amount, setAmount] = useState(() => data?.amount || '');

  const [bank, setBank] = useState(() => data?.bank || 'Signature X');

  const [narration, setNarration] = useState(
    () => data?.narration || ''
  );

  const [errors, setErrors] = useState({});  

  const ourFee = 10;
  // VAT is 7.5% of our fee (not a fixed value)
  const vatFee = ourFee * 0.075;

  const total = parseFloat(amount || '0') + ourFee + vatFee;


  const validate = () => {
    const newErrors = {};

    if (!senderAccount.trim()) {
      newErrors.senderAccount = 'Sender account number is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Recipient account number is required';
    }

    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }

    if (!narration.trim()) {
      newErrors.narration = 'Narration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

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
      beneficiaryName: 'Adebayo O. Lawal',
    });
  };

  return (
    <div className="transfer-page">
      {/* Header */}
      <div className="transfer-header">
        <div>
          <h1 className="transfer-title">Send Money</h1>
          <p className="transfer-subtitle">
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
          <label>Sender Account</label>
          <input
            type="text"
            value={senderAccount}
            readOnly
            disabled
            className="w-full h-12 px-4 border border-[#EBEBEB] rounded-xl bg-[#F9FAFB] text-sm text-[#141414] cursor-not-allowed"
        />
          {errors.senderAccount && <span className="error-text">{errors.senderAccount}</span>}
        </div>

        

        {/* Recipient */}
        <div className="field">
          <label>Recipient Account</label>
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className={errors.accountNumber ? 'error' : ''}
          />
          {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
        </div>

        {/* Amount */}
        <div className="field">
          <label>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        {/* Bank */}
        <div className="field">
          <label>Bank</label>
          <div className="select-box">
            <input value={bank} readOnly />
            <ChevronDown className="icon" />
          </div>
        </div>

        {/* Narration */}
        <div className="field">
          <label>Narration</label>
          <input
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            className={errors.narration ? 'error' : ''}
          />
          {errors.narration && <span className="error-text">{errors.narration}</span>}
        </div>

        {/* Fees */}
        <div className="fees">
          <div>
            <span>Fee</span>
            <b>{ourFee.toFixed(2)} NGN</b>
          </div>
          <div>
            <span>VAT</span>
            <b>{vatFee.toFixed(2)} NGN</b>
          </div>
        </div>

        {/* Total */}
        <div className="summary">
          <span>You Send</span>
          <h2>
            NGN{' '}
            {isNaN(total)
              ? '0.00'
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
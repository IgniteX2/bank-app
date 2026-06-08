import React, { useState } from 'react';
import ProgressSidebar from '../components/transfer/ProgressSidebar';
import TransferStep1 from '../components/transfer/TransferStep1';
import TransferStep2 from '../components/transfer/TransferStep2';
import TransferStep3 from '../components/transfer/TransferStep3';
import { executeTransfer } from '../services/transactionService';
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from 'lucide-react';

export default function Transfer() {
  const [step, setStep] = useState(1);

  const [transferData, setTransferData] = useState({
    senderAccount: '',
    accountNumber: '',
    amount: '',
    bank: '',
    narration: '',
    fees: { ourFee: 0, vatFee: 0, total: 0 },
    beneficiaryName: '',
    transactionRef: 'KDP/260514/TRF/8H2K9L'
  });

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleStep1Continue = (data) => {
    setTransferData({ ...transferData, ...data });
    setStep(2);
  };

  const handleStep2Continue = () => {
    setPin(['', '', '', '']);
    setApiError(null);
    setShowPinModal(true);
  };

  const handleFallbackTransfer = () => {
    setTransferData((prev) => ({
      ...prev,
      transactionRef:
        'SIM/' +
        Math.floor(100000 + Math.random() * 900000) +
        '/TRF/' +
        Math.random().toString(36).substring(2, 8).toUpperCase()
    }));

    setShowPinModal(false);
    setStep(3);
  };

  const handlePinConfirm = async () => {
    setApiLoading(true);
    setApiError(null);

    try {
      const payload = {
        senderAccount: transferData.senderAccount,
        receiverAccount: transferData.accountNumber,
        amount: parseFloat(transferData.amount),
        narration: transferData.narration
      };

      const response = await executeTransfer(payload);

      if (response.data && (response.data.success || response.data.transactionId)) {
        setTransferData((prev) => ({
          ...prev,
          transactionRef:
            response.data.transactionId ||
            'KDP/' +
              Math.floor(100000 + Math.random() * 900000) +
              '/TRF/' +
              Math.random().toString(36).substring(2, 8).toUpperCase()
        }));

        setShowPinModal(false);
        setStep(3);
      } else {
        setApiError(
          response.data?.message || 'Transfer validation failed. Please try again.'
        );
      }
    } catch (err) {
      console.error('API Error during transfer:', err);

      let errorMsg =
        'Authorize failed: Please ensure you are logged in and have sufficient balance.';

      if (err?.response?.status === 401) {
        errorMsg =
          'Error 401: Unauthorized session (JWT Token invalid or missing). Click below to proceed using demo mode.';
      } else if (err?.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err?.message) {
        errorMsg = err.message;
      }

      setApiError(errorMsg);
    } finally {
      setApiLoading(false);
    }
  };

  const handlePinChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">

      {/* Sidebar */}
      <div className="w-[300px] h-screen sticky top-0 bg-[#F9FAFB]">
        <ProgressSidebar currentStep={step} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-y-auto bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {step === 1 && (
              <TransferStep1
                onContinue={handleStep1Continue}
                data={transferData}
              />
            )}

            {step === 2 && (
              <TransferStep2
                onContinue={handleStep2Continue}
                onBack={() => setStep(1)}
                data={transferData}
              />
            )}

            {step === 3 && <TransferStep3 data={transferData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!apiLoading) setShowPinModal(false);
              }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <button
                onClick={() => {
                  if (!apiLoading) setShowPinModal(false);
                }}
                disabled={apiLoading}
                className="absolute top-4 right-4 text-[#818898] hover:text-[#141414] disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#141414] mb-2">
                Transaction PIN
              </h3>

              <p className="text-sm text-[#818898] mb-6">
                Enter your 4-digit PIN to authorize transfer.
              </p>

              {apiError && (
                <div className="text-xs font-semibold text-red-500 bg-red-50 border border-red-200 px-4 py-4 rounded-2xl mb-6 flex flex-col gap-3">
                  <span>{apiError}</span>

                  <button
                    onClick={handleFallbackTransfer}
                    className="w-full bg-[#10B981] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#059669]"
                  >
                    Proceed with Demo Transfer
                  </button>
                </div>
              )}

              <div className="flex justify-center gap-4 mb-8">
                {pin.map((digit, i) => (
                  <input
                    key={i}
                    id={`pin-${i}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    disabled={apiLoading}
                    onChange={(e) => handlePinChange(i, e.target.value)}
                    className="w-14 h-14 border border-[#EBEBEB] rounded-2xl text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#C69C2C] bg-[#F9FAFB]"
                  />
                ))}
              </div>

              <button
                onClick={handlePinConfirm}
                disabled={pin.some((d) => !d) || apiLoading}
                className="w-full bg-[#C69C2C] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {apiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Authorize Payment'
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
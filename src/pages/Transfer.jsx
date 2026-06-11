import { useState, useContext, useEffect } from "react";
import ProgressSidebar from "../components/transfer/ProgressSidebar";
import TransferStep1 from "../components/transfer/TransferStep1";
import TransferStep2 from "../components/transfer/TransferStep2";
import TransferStep3 from "../components/transfer/TransferStep3";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MobileNav from "../components/layout/MobileNav";
import { ThemeContext } from "../context/ThemeContext";
import { useAccountStore } from "../stores/useAccountStore";
import { useTransferStore } from "../stores/useTransferStore";
import { useUserStore } from "../stores/useUserStore";
import { useAllAccountsStore } from "../stores/useAllAccountsStore";
import PinCreationDialog from "../components/transfer/CreatePinDialog";
import PinModal from "../components/transfer/TransferPin";

export default function Transfer() {
  const [step, setStep] = useState(1);
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(true);
  const { account } = useAccountStore();
  const { makeTransfer, isLoadingTransfer } = useTransferStore();
  // const fetchAccount = useAccountStore((state) => state.fetchAccount);
  const [isMobile] = useState(window.innerWidth < 768);
  const handleSidebarToggle = () => setIsOpen((prev) => !prev);
  const user = useUserStore((state) => state.user);
  const { accounts, fetchAccounts } = useAllAccountsStore();
  const [errorBeneficiary, setErrorBeneficiary] = useState("");

  const [transferData, setTransferData] = useState({
    senderAccount: "",
    accountNumber: "",
    amount: "",
    bank: "",
    narration: "",
    fees: { ourFee: 0, vatFee: 0, total: 0 },
    beneficiaryName: "",
    transactionRef: "",
  });

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [showCreatePinDialog, setShowCreatePinDialog] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const accountDetails = account?.accountNumber
    ? `${account.accountNumber}`
    : "Loading account details...";

  const accountNumberSender = account?.accountNumber;

  const handleStep1Continue = (data) => {
    setTransferData({ ...transferData, ...data });
    setStep(2);
  };

  const handleBeneficiaryConfirmation = (accountNumber) => {
    if (!accountNumber) return;

    setResolving(true);

    console.log("Searching for:", accountNumber);
    console.log("Accounts:", accounts);

    const match = accounts?.find(
      (acc) => String(acc.accountNumber) === String(accountNumber),
    );

    setTimeout(() => {
      if (match) {
        setBeneficiary(match.accountName);
      } else {
        setBeneficiary("");
        setErrorBeneficiary("Beneficiary not found");
      }

      setResolving(false);
    }, 300);
  };

  const handleStep2Continue = () => {
    if (!user?.transactionPin) {
      setShowCreatePinDialog(true);
    } else {
      setShowPinModal(true);
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

  const handleSubmitTransfer = async () => {
    const payload = {
      senderAccountNumber: accountNumberSender,
      receiverAccountNumber: transferData.accountNumber,
      amount: Number(transferData.amount),
      pin: pin.join(""),
      description: transferData.narration,
    };

    const response = await makeTransfer(payload);

    if (!response.success) {
      return;
    }

    setTransferData((prev) => ({
      ...prev,
      transactionRef:
        response.data?.transactionId ||
        `KDP/${Math.floor(100000 + Math.random() * 900000)}/TRF/${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`,
    }));

    setShowPinModal(false);
    setStep(3);
  };

  return (
    <div
      style={{
        background: theme === "dark" ? "rgb(13, 27, 46)" : "#F6F8FA",
        height: "100vh",
        width: "100%",
      }}
    >
      <DashboardLayout
        sidebar={
          <Sidebar
            setIsOpen={handleSidebarToggle}
            isOpen={isOpen}
            isMobile={isMobile}
          />
        }
        topbar={
          <Topbar
            isOpen={isOpen}
            setIsOpen={handleSidebarToggle}
            isMobile={isMobile}
          />
        }
        mobilebar={<MobileNav isMobile={isMobile} />}
      >
        <div
          style={{ marginTop: 50 }}
          className="flex min-h-screen bg-white font-sans flex-col "
        >
          {/* Sidebar */}
          <div className="w-full h-[100px] sticky top-0 bg-[#F9FAFB]">
            <ProgressSidebar currentStep={step} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-screen overflow-y-auto bg-white text-gray-500">
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
                    transferData={transferData}
                    accountDetails={accountDetails}
                    handleBeneficiaryConfirmation={
                      handleBeneficiaryConfirmation
                    }
                    beneficiary={beneficiary}
                    resolving={resolving}
                    setBeneficiary={setBeneficiary}
                    errorBeneficiary={errorBeneficiary}
                    setErrorBeneficiary={setErrorBeneficiary}
                  />
                )}

                {step === 2 && (
                  <TransferStep2
                    onContinue={handleStep2Continue}
                    onBack={() => setStep(1)}
                    data={transferData}
                    beneficiary={beneficiary}
                  />
                )}

                {step === 3 && (
                  <TransferStep3
                    data={transferData}
                    beneficiary={beneficiary}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* create pin if pin does not exist */}
          <div>
            <PinCreationDialog
              open={showCreatePinDialog}
              onOpenChange={setShowCreatePinDialog}
              setShowCreatePinDialog={setShowCreatePinDialog}
            />
          </div>

          <div>
            {/* enter pin if it exist for transfer post */}
            <PinModal
              showPinModal={showPinModal}
              setShowPinModal={setShowPinModal}
              transferData={transferData}
              beneficiary={beneficiary}
              pin={pin}
              handlePinChange={handlePinChange}
              handleSubmitTransfer={handleSubmitTransfer}
              isLoadingTransfer={isLoadingTransfer}
            />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { FaStar } from "react-icons/fa6";
// import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { Input } from "../../components/ui/input";

import { Checkbox } from "../../components/ui/checkbox";
import { useGetBeneficiaryStore } from "../../stores/useGetBeneficiary";
import { useFavouriteBeneficiaryStore } from "../../stores/useFavouriteBeneficiaryStore";

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
  showBeneficiaryDialog,
  setShowBeneficiaryDialog,
  addFavBeneficiary,
  setAddFavBeneficiary,
  beneficiaryTransferData,
  setTransferData,
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
  const [searchBeneficiary, setSearchBeneficiary] = useState("");

  const { getBeneficiariesAction } = useGetBeneficiaryStore();

  const { favouriteBeneficiaries, getFavouriteBeneficiariesAction } =
    useFavouriteBeneficiaryStore();

  useEffect(() => {
    getFavouriteBeneficiariesAction();
  }, []);

  useEffect(() => {
    getBeneficiariesAction();
  }, []);

  const ourFee = 10;
  // VAT is 7.5% of our fee (not a fixed value)
  const vatFee = ourFee * 0.075;

  const total = parseFloat(amount || "0") + ourFee + vatFee;

  const validate = () => {
    const newErrors = {};

    if (!String(senderAccount).trim()) {
      newErrors.senderAccount = "Sender account number is required";
    }

    if (!String(accountNumber).trim()) {
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

  const beneficiaryExists = Array.isArray(beneficiaryTransferData)
    ? beneficiaryTransferData.some(
        (b) => String(b.accountNumber) === String(accountNumber),
      )
    : false;

  console.log("beneficiariesTransferData", beneficiaryTransferData);
  console.log("accountNumber", accountNumber);
  console.log(
    "match",
    beneficiaryTransferData?.some(
      (b) => String(b.accountNumber) === String(accountNumber),
    ),
  );

  const filtered = Array.isArray(beneficiaryTransferData)
    ? beneficiaryTransferData?.filter((b) =>
        b.beneficiaryName
          .toLowerCase()
          .includes(searchBeneficiary.toLowerCase()),
      )
    : [];

  const filteredFav = Array.isArray(beneficiaryTransferData)
    ? beneficiaryTransferData?.filter((b) => b.favorite === true)
    : [];

  console.log("favoriteBeneficiaries", favouriteBeneficiaries);

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
        <div className="flex flex-col">
          <div style={{ float: "right" }}>
            <p
              className="text-[#c69c2c] text-xs cursor-pointer hover:underline float-right"
              onClick={() => setShowBeneficiaryDialog(true)}
            >
              Select Beneficiary
            </p>
          </div>
          <div className="field">
            <label style={{ color: "#818898" }}>Recipient Account</label>
            <input
              maxLength={10}
              value={accountNumber || beneficiaryTransferData.accountNumber}
              // onChange={(e) => setAccountNumber(e.target.value)}
              // onBlur={() => handleBeneficiaryConfirmation(accountNumber)}
              onChange={(e) => {
                const value = e.target.value;
                setAccountNumber(String(value));

                if (/^\d{10}$/.test(value)) {
                  handleBeneficiaryConfirmation(value);
                }
              }}
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

        <div
          className={`${beneficiaryExists ? "block" : "hidden"} flex items-center space-x-2`}
        >
          <Checkbox
            id="add-beneficiary"
            checked={addFavBeneficiary}
            onCheckedChange={(checked) =>
              setAddFavBeneficiary(checked === true)
            }
          />

          <label
            htmlFor="add-beneficiary"
            className="font-medium cursor-pointer text-xs"
            style={{ marginLeft: "5px" }}
          >
            Add to Favorites
          </label>
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

      <Dialog
        open={showBeneficiaryDialog}
        onOpenChange={setShowBeneficiaryDialog}
      >
        <div style={{ height: "350px", width: "90%" }} className="bg-white">
          <DialogContent className="bg-white w-[70%] h-[500px] overflow-y-scroll">
            <DialogHeader style={{ marginTop: "20px" }}>
              <DialogTitle style={{ marginLeft: "5%" }}>
                Select Beneficiary
              </DialogTitle>
            </DialogHeader>

            <div className="">
              <Input
                placeholder="Search beneficiary..."
                value={searchBeneficiary}
                onChange={(e) => setSearchBeneficiary(e.target.value)}
              />
            </div>

            {filteredFav ? (
              <div
                style={{ marginLeft: "5%", width: "90%", marginBottom: "20px" }}
              >
                {filteredFav?.map((fav) => (
                  <div
                    key={fav.id}
                    style={{
                      padding: "10px 10px 10px 10px",
                      marginTop: "15px",
                      width: "100%",
                    }}
                    className="flex justify-between bg-gray-100 hover:bg-gray-200 rounded-lg hover:bg-muted"
                  >
                    <div
                      className="cursor-pointer p-3 flex gap-3 "
                      onClick={() => {
                        setAccountNumber(fav.accountNumber);

                        if (/^\d{10}$/.test(fav.accountNumber)) {
                          handleBeneficiaryConfirmation(fav.accountNumber);
                        }
                        setShowBeneficiaryDialog(false);
                      }}
                    >
                      <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-gray-400 flex justify-center items-center">
                        {fav.beneficiaryName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col self-center">
                        <h4 className="font-medium text-gray-700 text-xs">
                          {fav.beneficiaryName.toUpperCase()}
                        </h4>

                        <p className="text-xs text-muted-foreground text-gray-400 ">
                          {`# ${fav.accountNumber}`}
                        </p>
                      </div>
                    </div>
                    <div className="justify-self-end float-right self-center">
                      <FaStar className="text-yellow-300 text-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span
                style={{ marginBottom: "10px" }}
                className="text-center text-gray-400 text-xs"
              >
                No favorite found
              </span>
            )}

            {filtered ? (
              <div
                style={{ marginLeft: "5%", width: "90%", marginBottom: "20px" }}
              >
                {filtered?.map((benefi) => (
                  <div
                    key={benefi.id}
                    style={{
                      padding: "10px 10px 10px 10px",
                      marginTop: "15px",
                    }}
                    className="cursor-pointer rounded-lg p-3 hover:bg-muted bg-gray-100 flex gap-3 hover:bg-gray-200"
                    onClick={() => {
                      setAccountNumber(benefi.accountNumber);

                      if (/^\d{10}$/.test(benefi.accountNumber)) {
                        handleBeneficiaryConfirmation(benefi.accountNumber);
                      }
                      setShowBeneficiaryDialog(false);
                    }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-gray-400 flex justify-center items-center">
                      {benefi.beneficiaryName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col self-center">
                      <h4 className="font-medium text-gray-700 text-xs">
                        {benefi.beneficiaryName.toUpperCase()}
                      </h4>

                      <p className="text-xs text-muted-foreground text-gray-400 ">
                        {`# ${benefi.accountNumber}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span
                style={{ marginBottom: "10px" }}
                className="text-center text-gray-400 text-xs"
              >
                No beneficiary found
              </span>
            )}
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

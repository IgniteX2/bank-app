import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePinStore } from "../../stores/usePinStore";

export default function PinCreationDialog({
  open,
  onOpenChange,
  setShowCreatePinDialog,
}) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const { createTransactionPin, isLoadingCreation } = usePinStore();

  const handlePinChange = (index, value, setter) => {
    if (!/^\d*$/.test(value)) return;

    setter((prev) => {
      const updated = [...prev];
      updated[index] = value.slice(-1);
      return updated;
    });
  };

  const handleCreatePin = async () => {
    const enteredPin = pin.join("");
    const confirmedPin = confirmPin.join("");

    if (enteredPin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }

    if (enteredPin !== confirmedPin) {
      toast.error("PINs do not match");
      return;
    }

    try {
      await createTransactionPin(enteredPin, confirmedPin);

      // Optional
      setPin(["", "", "", ""]);
      setConfirmPin(["", "", "", ""]);

      setShowCreatePinDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1], // smooth spring-like easing
        }}
      >
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
            style={{ height: "380px" }}
            className="sm:max-w-md bg-white"
          >
            <DialogHeader>
              <DialogTitle
                style={{ marginTop: "30px", textAlign: "center" }}
                className="font-bold"
              >
                Create Transaction PIN
              </DialogTitle>

              <DialogDescription
                style={{ textAlign: "center" }}
                className="text-xs"
              >
                Create a secure 4-digit PIN for authorizing transactions.
              </DialogDescription>
            </DialogHeader>

            <div
              style={{ width: "76%", marginLeft: "12%", marginTop: "-40px" }}
            >
              <div>
                <label className="font-medium text-xs">Enter PIN</label>

                <div
                  className="flex justify-between gap-3 mt-3"
                  style={{ marginTop: "10px" }}
                >
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      type="password"
                      id={`pin-${index}`}
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handlePinChange(index, e.target.value, setPin)
                      }
                      className="h-15 w-15 rounded-md border text-center text-lg font-semibold"
                    />
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "4%" }}>
                <label className="text-xs font-medium">Confirm PIN</label>

                <div
                  className="flex justify-between gap-3"
                  style={{ marginTop: "10px" }}
                >
                  {confirmPin.map((digit, index) => (
                    <input
                      key={index}
                      type="password"
                      id={`confirm-pin-${index}`}
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handlePinChange(index, e.target.value, setConfirmPin)
                      }
                      className="h-15 w-15 rounded-md border text-center text-lg font-semibold"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button
                style={{
                  marginTop: "7%",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  height: "45px",
                }}
                className="w-full bg-[#c69c2c] text-white"
                onClick={handleCreatePin}
                disabled={
                  isLoadingCreation ||
                  pin.some((d) => !d) ||
                  confirmPin.some((d) => !d)
                }
              >
                {isLoadingCreation ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Create pin"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
}

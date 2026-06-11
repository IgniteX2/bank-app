import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function PinModal({
  showPinModal,
  setShowPinModal,
  transferData,
  beneficiary,
  pin,
  handlePinChange,
  handleSubmitTransfer,
  isLoadingTransfer,
}) {
  return (
    <AnimatePresence>
      {showPinModal && (
        <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
          <DialogContent
            style={{ height: "350px" }}
            className="sm:max-w-md p-0 overflow-hidden border-none bg-white shadow-2xl"
          >
            {/* Animated wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className=" bg-white border-none">
                {/* Close */}
                <button
                  onClick={() => setShowPinModal(false)}
                  className="absolute right-4 top-4  p-2 text-gray-400 hover:bg-gray-100"
                >
                  {/* <X className="h-5 w-5" /> */}
                </button>

                <DialogHeader className="text-center ">
                  <DialogTitle
                    style={{ marginTop: "35px" }}
                    className="text-2xl font-bold "
                  >
                    Authorize Transfer
                  </DialogTitle>
                  <DialogDescription>
                    Enter your transaction PIN to complete this transfer.
                  </DialogDescription>
                </DialogHeader>

                {/* Summary */}
                <Card className="mt-6 bg-gray-50 w-full rounded-none">
                  <div style={{ marginLeft: "5%", width: "90%" }}>
                    <div
                      style={{ marginTop: 5 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xs text-gray-700">Amount</span>
                      <span className="font-semibold text-gray-700">
                        ₦{Number(transferData.amount).toLocaleString()}
                      </span>
                    </div>

                    <div
                      style={{ marginTop: 10, marginBottom: 5 }}
                      className="mt-2 flex justify-between"
                    >
                      <span className="text-xs text-gray-700">Beneficiary</span>
                      <span className="font-medium text-gray-700">
                        {beneficiary}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* PIN Inputs */}
                <div
                  className="mt-8 flex justify-center gap-3"
                  style={{ marginTop: "10px" }}
                >
                  {pin.map((digit, i) => (
                    <Input
                      key={i}
                      id={`pin-${i}`}
                      value={digit ? "*" : ""}
                      maxLength={1}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      className="h-16 w-16 text-center text-2xl font-bold"
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="">
                  <Button
                    style={{
                      marginTop: "10px",
                      marginLeft: "5%",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      height: "40px",
                    }}
                    onClick={handleSubmitTransfer}
                    disabled={pin.some((d) => !d) || isLoadingTransfer}
                    className="w-[90%] bg-[#c69c2c] text-white"
                  >
                    {isLoadingTransfer ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Transfer"
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

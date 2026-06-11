import React from "react";
import { Check, Headset, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgressSidebar({ currentStep }) {
  const steps = [
    { id: 1, name: "Transfer Details" },
    { id: 2, name: "Review and Pay" },
    { id: 3, name: "Success" },
  ];

  return (
    <div className="progress-sidebar">
      {/* Header */}
      <div>
        <div className="progress-steps flex">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="progress-step">
                {/* Circle */}
                <div
                  className={`progress-circle ${
                    isCompleted ? "completed" : isActive ? "active" : ""
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={`step-number ${
                        isActive ? "active-number" : ""
                      }`}
                    >
                      {step.id}
                    </span>
                  )}

                  {/* Active ring animation */}
                  {isActive && (
                    <motion.div
                      layoutId="active-step"
                      className="active-ring"
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`progress-label ${isActive ? "active-label" : ""}`}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

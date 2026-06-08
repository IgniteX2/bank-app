import React from "react";
import { Check, Headset, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgressSidebar({ currentStep }) {
  const steps = [
    { id: 1, name: "Transfer" },
    { id: 2, name: "Review and Pay" },
    { id: 3, name: "Success" },
  ];

  return (
    <div className="progress-sidebar">
      
      {/* Header */}
      <div>
        <h3 className="progress-title">
          Sending Money Process
        </h3>

        <div className="progress-steps">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="progress-step">

                {/* Circle */}
                <div
                  className={`progress-circle ${
                    isCompleted
                      ? "completed"
                      : isActive
                      ? "active"
                      : ""
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
                  className={`progress-label ${
                    isActive ? "active-label" : ""
                  }`}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Box */}
      <div className="progress-support">

        <button className="close-btn">
          <X className="w-4 h-4" />
        </button>

        <div className="support-header">
          <div className="support-icon">
            <Headset className="w-5 h-5 text-[#141414]" />
          </div>

          <div>
            <h4 className="support-title">Need Support?</h4>
            <p className="support-text">
              Contact our support team if you need help with your transfer.
            </p>
          </div>
        </div>

        <button className="support-btn">
          Get Help
        </button>
      </div>
    </div>
  );
}
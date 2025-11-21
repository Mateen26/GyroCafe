"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";

export function ToastNotification({ isOpen, onClose, message, type = "info" }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Toast Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
              aria-label="Close"
            >
              <HiMiniXMark className="text-xl" />
            </button>

            <div className="space-y-4 text-center">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                  type === "warning"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-brand-red/10 text-brand-red"
                }`}
              >
                {type === "warning" ? (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-tight text-brand-dark">
                  {type === "warning" ? "Pricing Notice" : "Information"}
                </h3>
                <p className="text-base leading-relaxed text-neutral-600">
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-brand-red/20 transition hover:opacity-90"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


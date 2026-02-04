"use client";

import { useCartStore } from "@/store/useCartStore";

export default function Toast() {
  const toasts = useCartStore((s) => s.toasts);
  const removeToast = useCartStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item toast-${toast.type} cursor-pointer`}
          onClick={() => removeToast(toast.id)}
          role="alert"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

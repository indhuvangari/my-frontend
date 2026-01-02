
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/toast.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Auto-remove toasts after 2.5s
  useEffect(() => {
    const timers = toasts.map(t =>
      setTimeout(() => removeToast(t.id), t.ttl ?? 2500)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  const showToast = (message, type = "info", opts = {}) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type, ...opts }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const value = { showToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="toast-wrap">
          {toasts.map(t => (
            <div key={t.id} className={`toast ${t.type}`}>
              <span>{t.message}</span>
              <button className="toast-close" onClick={() => removeToast(t.id)}>×</button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

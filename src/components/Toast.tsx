"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";
import gsap from "gsap";

type Status = "info" | "success" | "warning" | "error";

interface ToastProps {
  status?: Status;
  children: ReactNode;
  onDismiss?: () => void;
  autoDismiss?: number;
  className?: string;
}

const statusConfig: Record<
  Status,
  { icon: typeof CheckCircle | null; border: string; iconColor: string }
> = {
  info: { icon: null, border: "border-l-border", iconColor: "" },
  success: {
    icon: CheckCircle,
    border: "border-l-success",
    iconColor: "text-success",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-warning",
    iconColor: "text-warning",
  },
  error: {
    icon: XCircle,
    border: "border-l-error",
    iconColor: "text-error",
  },
};

export function Toast({
  status = "info",
  children,
  onDismiss,
  autoDismiss = 5000,
  className,
}: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);
  const config = statusConfig[status];
  const Icon = config.icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!onDismiss || autoDismiss <= 0) return;

    const timer = setTimeout(() => {
      const el = ref.current;
      if (!el) {
        onDismiss();
        return;
      }

      gsap.to(el, {
        y: 16,
        opacity: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: onDismiss,
      });
    }, autoDismiss);

    return () => clearTimeout(timer);
  }, [autoDismiss, onDismiss]);

  const handleDismiss = () => {
    const el = ref.current;
    if (!el) {
      onDismiss?.();
      return;
    }

    gsap.to(el, {
      y: 16,
      opacity: 0,
      duration: 0.2,
      ease: "power3.in",
      onComplete: () => onDismiss?.(),
    });
  };

  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-6 right-6 z-40 bg-surface-overlay border border-border border-l-4 rounded-xl p-4",
        "flex items-start gap-3 max-w-sm shadow-md",
        config.border,
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn("w-5 h-5 shrink-0 mt-0.5", config.iconColor)}
          strokeWidth={1.5}
        />
      )}
      <div className="flex-1 min-w-0 text-sm font-body text-ink-secondary">
        {children}
      </div>
      {onDismiss && (
        <button
          onClick={handleDismiss}
          className="text-ink-muted hover:text-ink-primary transition-colors duration-fast shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

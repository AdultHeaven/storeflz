"use client";
import { useEffect, useState } from "react";

export default function AdClickGate({
  delayMs = 0,
  onFirstClick,
  className = "ads-class",
}: {
  delayMs?: number;
  onFirstClick?: () => void;
  className?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  if (!show) return null;

  const handleClick = () => {
    // fire your ad code here
    try { onFirstClick?.(); } catch {}
    // remove completely
    setShow(false);
  };

  return (
    <div
      className={className}
      onClick={handleClick}
      role="button"
      aria-label="ad-capture"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "transparent",
        zIndex: 2147483647, // on top of everything
        cursor: "pointer",
        // only intercept when visible:
        pointerEvents: "auto",
      }}
    />
  );
}

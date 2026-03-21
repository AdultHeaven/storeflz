"use client";

import { useEffect } from "react";

export default function SmartlinkTrigger() {
  useEffect(() => {
    const SMARTLINK = "https://roomsmergeshipwreck.com/mi2s67uf8m?key=035ff8cf9ce79ba1d043006022dcb0d5";
    let fired = false;

    const handler = (e: MouseEvent | TouchEvent) => {
      // @ts-ignore
      if (e?.isTrusted === false) return;
      if (fired) return;

      fired = true;

      setTimeout(() => {
        window.open(SMARTLINK, "_blank", "noopener,noreferrer");
      }, 30);

      document.removeEventListener("click", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };

    document.addEventListener("click", handler, true);
    document.addEventListener("touchstart", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, []);

  return null;
}
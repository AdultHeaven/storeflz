"use client";

import { useEffect } from "react";

export default function SmartlinkAnchorGate() {
  useEffect(() => {
    const SMARTLINK = "/out"; // your own redirect endpoint (see below)
    let fired = false;

    const handler = (e: any) => {
      if (e?.isTrusted === false) return;
      if (fired) return;

      fired = true;

      const a = document.createElement("a");
      a.href = SMARTLINK;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      // must be in DOM for some browsers
      document.body.appendChild(a);
      a.click();
      a.remove();

      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };

    document.addEventListener("mousedown", handler, true);
    document.addEventListener("touchstart", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, []);

  return null;
}
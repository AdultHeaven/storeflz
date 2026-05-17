"use client";

import { useEffect } from "react";

export default function TrafficStarsPush() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.tsyndicate.com/sdk/v1/inpage.push.js";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      if (window.TsInPagePush) {
        // @ts-ignore
        window.TsInPagePush({
          spot: "c3302512064346ea962e84353ae54263",
          verticalPosition: "bottom",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
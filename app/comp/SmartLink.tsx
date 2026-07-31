"use client";

import React, { useEffect, useState } from "react";

export function SmartLink({
  href,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [computedTarget, setComputedTarget] = useState<string | undefined>(target);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      setComputedTarget("_self");
    } else {
      setComputedTarget(target);
    }
  }, [target]);

  return (
    <a href={href} target={computedTarget} rel={rel} {...props}>
      {children}
    </a>
  );
}

export function openSmartLink(url: string, defaultTarget: string = "_blank") {
  if (typeof window === "undefined") return;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, defaultTarget);
  }
}

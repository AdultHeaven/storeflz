"use client";

import { useEffect, useRef } from 'react';

export default function HilltopAd() {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adContainerRef.current && adContainerRef.current.innerHTML === "") {
      const script = document.createElement('script');
      script.src = "//nervous-tell.com/bHX.V/sxd/Gilc0jYbW-cE/WeFmL9YujZOULlDkiPRTDYe4nOSDpck3YMxDBUet/N_jrga4jNnzncjwXObQx";
      script.async = true;
      script.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      adContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', // Keeps it in the vertical flow
        justifyContent: 'center', // Centers vertically if the parent has height
        alignItems: 'center', // Centers horizontally
        minHeight: '300px', // Adjust this based on your ad size
        width: '100%',
        margin: 'auto 0' // Helps push it into the center of available space
      }} 
    >
      <div 
        ref={adContainerRef} 
        id="hilltop-anchor"
        style={{ width: '100%', textAlign: 'center' }}
      />
    </div>
  );
}
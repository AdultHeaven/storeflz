'use client';
import { useEffect } from 'react';

export default function AdCenter() {
  useEffect(() => {
    // Load ad-provider.js script
    const script = document.createElement("script");
    script.src = "https://a.magsrv.com/ad-provider.js";
    script.async = true;
    script.type = "application/javascript";
    document.body.appendChild(script);

    // Push the ad serve call
    window.AdProvider = window.AdProvider || [];
    window.AdProvider.push({ serve: {} });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px"
      }}
    >
      <ins 
        className="eas6a97888e2" 
        data-zoneid="5777364"
        style={{ display: "block" }}
      ></ins>
    </div>
  );
}

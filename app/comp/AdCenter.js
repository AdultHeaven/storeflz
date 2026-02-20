// 'use client';
// import { useEffect } from 'react';

// export default function AdCenter() {
//   useEffect(() => {
//     // Load ad-provider.js script
//     const script = document.createElement("script");
//     script.src = "https://a.magsrv.com/ad-provider.js";
//     script.async = true;
//     script.type = "application/javascript";
//     document.body.appendChild(script);

//     // Push the ad serve call
//     window.AdProvider = window.AdProvider || [];
//     window.AdProvider.push({ serve: {} });

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div 
//       style={{
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "20px"
//       }}
//     >
//       <ins 
//         className="eas6a97888e2" 
//         data-zoneid="5777364"
//         style={{ display: "block" }}
//       ></ins>
//     </div>
//   );
// }
'use client';
import { useEffect, useRef } from 'react';

export default function HilltopAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    const script = document.createElement('script');

    script.innerHTML = `
      (function(vqexh){
        var d = document,
            s = d.createElement('script'),
            l = document.currentScript;
        s.settings = vqexh || {};
        s.src = "//amazingmeaning.com/b/XcV.sadOGhlA0/YiWxch/RehmC9/uZZ/UglpkwPTTUYS4EMuTpUP4tMFj-U/tZNWjngOx/NdTCgRybOnQx";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';
        l.parentNode.insertBefore(s, l);
      })({});
    `;

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current?.contains(script)) {
        adRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <div ref={adRef} />
    </div>
  );
}
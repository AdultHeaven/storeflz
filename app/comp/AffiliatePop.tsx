// 'use client';

// import Script from 'next/script';

// export default function AffiliatePop() {
//   return (
//     <Script
//       src="//static.scptp9.com/mnpw3.js"
//       strategy="afterInteractive"
//       onLoad={() => {
//         if (typeof window !== 'undefined' && (window as any).mnpw) {
//           (window as any).mnpw.add(
//             'https://t.acrsmartcam.com/384478/7683/0?po=6533&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0005&pud=scptp9',
//             {
//               newTab: true,
//               cookieExpires: 86401,
//             }
//           );
//         }
//       }}
//     />
//   );
// }

'use client';

import Script from 'next/script';

export default function AffiliatePop() {
  return (
    <Script
      src="//static.scptp9.com/mnpw3.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).mnpw) {
          (window as any).mnpw.add(
            'https://t.vlmai-1.com/384478/9022/0?aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0005&pud=scptp9',
            {
              newTab: true,
              cookieExpires: 86401,
            }
          );
        }
      }}
    />
  );
}
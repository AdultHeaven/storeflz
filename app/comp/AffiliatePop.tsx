'use client';

import Script from 'next/script';

export default function AffiliatePop() {
  return (
    <>
      <Script
        src="//static.scptp9.com/mnpw3.js"
        strategy="afterInteractive"
      />

      <Script id="mnpw-pop" strategy="afterInteractive">
        {`
          mnpw.add(
            'https://t.vlmai-1.com/384478/7793?aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0005&pud=scptp9',
            {
              newTab: true,
              cookieExpires: 86401
            }
          );
        `}
      </Script>
    </>
  );
}
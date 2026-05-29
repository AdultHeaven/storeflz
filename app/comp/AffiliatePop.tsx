import Script from "next/script";

export default function AffiliatePop() {
  return (
    <>
      <Script
        src="https://crxcra.com/popin/latest/affstitial-min.js"
        strategy="afterInteractive"
      />

      <Script id="affiliate-popin" strategy="afterInteractive">
        {`
          var crakPopInParamsOverlay = {
            url: 'https://t.vlmai-1.com/384478/7793?aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0019',
            decryptUrl: false,
            contentType: 'overlay',
            coverOverlay: true,
            expireDays: 0.01
          };
        `}
      </Script>
    </>
  );
}
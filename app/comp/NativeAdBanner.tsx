'use client';

import Script from 'next/script';

export default function NativeAdBanner() {
  return (
    <div className="native-ad-banner-wrap" style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <div id="container-6736fe12ee184733bf2b50f38e703b00" className="native-ad-container" style={{ width: '100%', maxWidth: '728px' }} />
      <Script
        src="https://roomsmergeshipwreck.com/6736fe12ee184733bf2b50f38e703b00/invoke.js"
        strategy="afterInteractive"
        async
        data-cfasync="false"
      />
    </div>
  );
}

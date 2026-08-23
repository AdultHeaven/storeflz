'use client';

import { useEffect, useState } from 'react';
import AdIframe from './AdIframe';

export default function CandyAdBanner() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return <div className="candy-ad-banner-wrap" style={{ width: '100%', minHeight: '90px' }} />;
  }

  return (
    <div className="candy-ad-banner-wrap" style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {isMobile ? (
        <AdIframe
          keyId="de969ad072620e41fdeb02d6cf68cc07"
          width={300}
          height={250}
        />
      ) : (
        <AdIframe
          keyId="fe46f19e5475072c83548bb833418bee"
          width={728}
          height={90}
        />
      )}
    </div>
  );
}

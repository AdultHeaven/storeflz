'use client';

import { useEffect, useState } from 'react';

export default function CandyVideoOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('candy-video-dismissed');

    if (dismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closeOverlay = () => {
    sessionStorage.setItem('candy-video-dismissed', 'true');
    setVisible(false);
  };

  const handleVideoClick = () => {
    window.open(
      '/api/go/candi?plc=videoModal',
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (!visible) return null;

  return (
    <div className="candy-overlay">
      <div className="candy-modal">
        <button
          className="candy-close"
          onClick={closeOverlay}
          aria-label="Close"
        >
          ✕
        </button>

        <video
          className="candy-video"
          autoPlay
          muted
          playsInline
          loop
          onClick={handleVideoClick}
        >
          <source
            src="https://ads.storeflz.com/candy-ai-6.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

export default function StripchatOverlay() {
  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const videoSources = [
  'https://video.mavrtracktor.com/production/prerolls/EvaElfie.mp4',
  'https://video.mavrtracktor.com/production/prerolls/angel_inoprofile_v2-zh.mp4',
  'https://video.mavrtracktor.com/production/prerolls/sharasuo.mp4',
  'https://video.mavrtracktor.com/production/prerolls/squirtinglinsey_v2-nl.mp4'
];

const videoSrc =
  videoSources[Math.floor(Math.random() * videoSources.length)];

  const offerLink =
    'https://t.acrsmartcam.com/384478/3778/8996?po=6533&aff_sub5=SF_006OG000004lmDN';

  useEffect(() => {
    const dismissedAt = localStorage.getItem(
      'video-overlay-dismissed'
    );

    if (dismissedAt) {
const fiveMinutes = 5 * 60 * 1000;
      if (Date.now() - Number(dismissedAt) < fiveMinutes) {
        return;
      }
    }

    let preloadReady = false;
    let delayPassed = false;

    const tryShow = () => {
      if (preloadReady && delayPassed) {
        setVisible(true);
      }
    };

    const preloadVideo = document.createElement('video');
    preloadVideo.preload = 'auto';
    preloadVideo.src = videoSrc;

    preloadVideo.onloadeddata = () => {
      preloadReady = true;
      tryShow();
    };

    const timer = setTimeout(() => {
      delayPassed = true;
      tryShow();
    }, 3000);

    preloadVideo.load();

    return () => clearTimeout(timer);
  }, []);

  const closeOverlay = () => {
    localStorage.setItem(
      'video-overlay-dismissed',
      Date.now().toString()
    );

    setVisible(false);
  };

  const handleOfferClick = () => {
    window.open(
      offerLink,
      '_blank',
      'noopener,noreferrer'
    );

    localStorage.setItem(
      'video-overlay-dismissed',
      Date.now().toString()
    );

    setVisible(false);
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
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.15s ease'
          }}
        >
          <source
            src={videoSrc}
            type="video/mp4"
          />
        </video>

        {/* BELOW VIDEO PROMO SECTION */}

        {/* <div className="promo-section">
          <div className="promo-badge">
            🔥 LIMITED TIME OFFER
          </div>

          <h3 className="promo-title">
            Summer Sale - 50% OFF
          </h3>

          <p className="promo-description">
            Unlock premium access and chat with your
            favorite creators today.
          </p>

          <button
            className="promo-button"
            onClick={handleOfferClick}
          >
            Claim Offer Now
          </button>
        </div> */}
        <div className="promo-section">
  <div className="promo-badge">
    🔥 50% OFF TODAY
  </div>

  <h3 className="promo-title">
    Stripchat Summer Sale
  </h3>

  <p className="promo-description">
    Limited-time offer. Upgrade now and save 50%.
  </p>

  <button
    className="promo-button"
    onClick={handleOfferClick}
  >
            Claim Offer Now
  </button>
</div>
      </div>
    </div>
  );
}
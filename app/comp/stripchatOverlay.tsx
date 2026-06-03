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
    'https://go.mavrtracktor.com?userId=854cac3f51668e345a459ed6181f323836ec70a9c81fb259c414f2d3887ff355';

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
    }, 1500);

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

    <a
      href={offerLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        localStorage.setItem(
          'video-overlay-dismissed',
          Date.now().toString()
        );
        setVisible(false);
      }}
    >
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
          transition: 'opacity 0.15s ease',
          cursor: 'pointer'
        }}
      >
        <source
          src={videoSrc}
          type="video/mp4"
        />
      </video>
    </a>
  </div>
</div>
  );
}
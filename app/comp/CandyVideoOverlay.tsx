// // 'use client';

// // import { useEffect, useState } from 'react';

// // export default function CandyVideoOverlay() {
// //   const [visible, setVisible] = useState(false);

// //   useEffect(() => {
// //     const dismissed = sessionStorage.getItem('candy-video-dismissed');

// //     if (dismissed) return;

// //     const timer = setTimeout(() => {
// //       setVisible(true);
// //     }, 3000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   const closeOverlay = () => {
// //     sessionStorage.setItem('candy-video-dismissed', 'true');
// //     setVisible(false);
// //   };

// //   const handleVideoClick = () => {
// //     window.open(
// //     //   '/api/go/candi?plc=videoModal',
// //     'https://candyai.gg/home2?via=lxrukg',
// //       '_blank',
// //       'noopener,noreferrer'
// //     );
// //   };

// //   if (!visible) return null;

// //   return (
// //     <div className="candy-overlay">
// //       <div className="candy-modal">
// //         <button
// //           className="candy-close"
// //           onClick={closeOverlay}
// //           aria-label="Close"
// //         >
// //           ✕
// //         </button>

// //         <video
// //           className="candy-video"
// //           autoPlay
// //           muted
// //           playsInline
// //           loop
// //           onClick={handleVideoClick}
// //         >
// //           <source
// //             src="https://ads.storeflz.com/candy-ai-6.mp4"
// //             type="video/mp4"
// //           />
// //         </video>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';

// export default function CandyVideoOverlay() {
//   const [visible, setVisible] = useState(false);
//   const [videoReady, setVideoReady] = useState(false);

//   useEffect(() => {
//     const dismissed = sessionStorage.getItem('candy-video-dismissed');

//     if (dismissed) return;

//     // Preload video immediately
//     const video = document.createElement('video');
//     video.preload = 'auto';
//     video.src = 'https://ads.storeflz.com/candy-ai-6.mp4';

//     video.oncanplaythrough = () => {
//       setVideoReady(true);
//     };

//     video.load();

//     const timer = setTimeout(() => {
//       setVisible(true);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   const closeOverlay = () => {
//     sessionStorage.setItem('candy-video-dismissed', 'true');
//     setVisible(false);
//   };

//   const handleVideoClick = () => {
//     window.open(
//       '/api/go/candi?plc=video',
//       '_blank',
//       'noopener,noreferrer'
//     );
//   };

//   if (!visible) return null;

//   return (
//     <div className="candy-overlay">
//       <div className="candy-modal">
//         <button
//           className="candy-close"
//           onClick={closeOverlay}
//           aria-label="Close"
//         >
//           ✕
//         </button>

//         {!videoReady && (
//           <div className="candy-loading">
//             Loading...
//           </div>
//         )}

//         <video
//           className="candy-video"
//           autoPlay
//           muted
//           playsInline
//           loop
//           preload="auto"
//           onClick={handleVideoClick}
//           style={{ display: videoReady ? 'block' : 'none' }}
//         >
//           <source
//             src="https://ads.storeflz.com/candy-ai-6.mp4"
//             type="video/mp4"
//           />
//         </video>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

type Offer = 'candi' | 'ourdream';

export default function CandyVideoOverlay() {
  const [visible, setVisible] = useState(false);
  const [offer, setOffer] = useState<Offer>('candi');
  const [videoSrc, setVideoSrc] = useState('');
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem('video-overlay-dismissed');

    if (dismissedAt) {
      const tenMinutes = 5 * 60 * 1000;

      if (Date.now() - Number(dismissedAt) < tenMinutes) {
        return;
      }
    }

    const selectedOffer: Offer ='candi';
      // Math.random() < 0.5 ? 'candi' : 'ourdream';

    setOffer(selectedOffer);

    // const selectedVideoSrc =
    //   selectedOffer === 'candi'
    //     ? 'https://ads.storeflz.com/candy-ai-6.mp4'
    //     : 'https://ads.storeflz.com/ourdream-4-final-draft.mp4';

    const videoSources = [
  // 'https://ads.storeflz.com/candy-ai-6.mp4',
  'https://ads.storeflz.com/preroll_realistic_hook_2_cmai%20(top%20perf%F0%9F%94%A5).mp4',
  'https://ads.storeflz.com/preroll_realistic_hook_4_cmai.mp4',
  // add more here
];

const selectedVideoSrc =
  videoSources[Math.floor(Math.random() * videoSources.length)];


    setVideoSrc(selectedVideoSrc);

    let preloadReady = false;
    let delayPassed = false;

    const tryShow = () => {
      if (preloadReady && delayPassed) {
        setVisible(true);
      }
    };

    // preload video immediately
    const preloadVideo = document.createElement('video');
    preloadVideo.preload = 'auto';
    preloadVideo.src = selectedVideoSrc;

    preloadVideo.onloadeddata = () => {
      preloadReady = true;
      tryShow();
    };

    const timer = setTimeout(() => {
      delayPassed = true;
      tryShow();
    }, 1500);

    preloadVideo.load();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const closeOverlay = () => {
    localStorage.setItem(
      'video-overlay-dismissed',
      Date.now().toString()
    );

    setVisible(false);
  };

  const handleVideoClick = () => {
    const target =
      offer === 'candi'
        ? 'https://landing.candynetwork.ai/lp1?var_text=28&via=lxrukg'
        : 'https://t.vlmai-1.com/384478/10139/0?aff_sub5=SF_006OG000004lmDN';

    window.open(
      target,
      '_blank',
      'noopener,noreferrer'
    );

      localStorage.setItem(
    'video-overlay-dismissed',
    Date.now().toString()
  );

  setVisible(false);
  };

  if (!visible || !videoSrc) return null;

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
          key={videoSrc}
          className="candy-video"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onClick={handleVideoClick}
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
      </div>
    </div>
  );
}
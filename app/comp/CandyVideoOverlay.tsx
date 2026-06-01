// 'use client';

// import { useEffect, useState } from 'react';

// export default function CandyVideoOverlay() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const dismissed = sessionStorage.getItem('candy-video-dismissed');

//     if (dismissed) return;

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
//     //   '/api/go/candi?plc=videoModal',
//     'https://candyai.gg/home2?via=lxrukg',
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

//         <video
//           className="candy-video"
//           autoPlay
//           muted
//           playsInline
//           loop
//           onClick={handleVideoClick}
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

export default function CandyVideoOverlay() {
  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('candy-video-dismissed');

    if (dismissed) return;

    // Preload video immediately
    const video = document.createElement('video');
    video.preload = 'auto';
    video.src = 'https://ads.storeflz.com/candy-ai-6.mp4';

    video.oncanplaythrough = () => {
      setVideoReady(true);
    };

    video.load();

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
      'https://candyai.gg/home2?via=lxrukg',
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

        {!videoReady && (
          <div className="candy-loading">
            Loading...
          </div>
        )}

        <video
          className="candy-video"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onClick={handleVideoClick}
          style={{ display: videoReady ? 'block' : 'none' }}
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
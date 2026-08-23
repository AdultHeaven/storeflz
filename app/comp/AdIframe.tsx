'use client';

import { useEffect, useRef } from 'react';

interface AdIframeProps {
  keyId: string;
  width: number | string;
  height: number | string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdIframe({ keyId, width, height, style, className }: AdIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = typeof width === 'number' ? `${width}px` : String(width);
    iframe.height = typeof height === 'number' ? `${height}px` : String(height);
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.background = 'transparent';
    iframe.scrolling = 'no';

    containerRef.current.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              background: transparent;
            }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key': '${keyId}',
              'format': 'iframe',
              'height': ${typeof height === 'number' ? height : 250},
              'width': ${typeof width === 'number' ? width : 300},
              'params': {}
            };
          </script>
          <script type="text/javascript" src="https://roomsmergeshipwreck.com/${keyId}/invoke.js"></script>
        </body>
        </html>
      `);
      doc.close();
    }
  }, [keyId, width, height]);

  return <div ref={containerRef} style={style} className={className} />;
}

// app/layout.tsx
import { Suspense } from 'react'
import { PostHogProvider } from './providers'
import PostHogPageView from './comp/PostHogPageView'
import "./globals.css";

export const metadata = {
  title: "Create Shareable Link Pages",
  description: "Create a shareable page to organize useful links in one place.",
};
//https://t.vlmai-1.com/384478/9022/39455?aff_sub5=SF_006OG000004lmDN

function TopPromoBar() {
  return (
    <a
      href="https://t.anadw.link/384478/9248/35232?po=6532&aff_sub5=SF_006OG000004lmDN"
      className="ai-gf-banner"
    >
      <span className="ai-gf-banner-text">
  1000000+ premium videos in one subscription
      </span>

      <span className="ai-gf-banner-button">
        GET ACCESS →
      </span>
    </a>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="juicyads-site-verification" content="c93c385f09b1340182a5953a3550fd2b" />
<meta name="Trafficstars" content="85613"/>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <TopPromoBar />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}


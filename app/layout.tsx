// app/layout.tsx
// app/layout.tsx
export const metadata = {
  title: "Storeflz — Create Mirror Links",
  description: "Add a title and mirrors; get a short share link.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="juicyads-site-verification" content="c93c385f09b1340182a5953a3550fd2b" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}


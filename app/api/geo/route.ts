import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Extract country from Cloudflare or Vercel headers
  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('x-country') ||
    '';

  return NextResponse.json({
    country: country.toUpperCase().trim(),
  });
}

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const url = new URL(req.url);

  const page = url.searchParams.get('page');

  await supabase.from('affiliate_clicks').insert({
    offer_slug: 'faphouse',
    placement: 'top_anchor',
    page_url: page,
    user_agent: req.headers.get('user-agent'),
    referrer: req.headers.get('referer'),
  });

  return NextResponse.redirect(
    'https://fhgte.com/?utm_campaign=ai.4HZ'
  );
}
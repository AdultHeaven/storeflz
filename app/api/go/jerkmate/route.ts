
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const url = new URL(req.url);

  const page = url.searchParams.get('page');
  const placement = url.searchParams.get('plc');

  await supabase.from('affiliate_clicks').insert({
    offer_slug: 'candi',
    placement,
    page_url: page,
    user_agent: req.headers.get('user-agent'),
    referrer: req.headers.get('referer'),
  });

  return NextResponse.redirect(
    'https://t.ajrkmx1.com/384478/8780/32505?po=6533&aff_sub5=SF_006OG000004lmDN'
  );
}
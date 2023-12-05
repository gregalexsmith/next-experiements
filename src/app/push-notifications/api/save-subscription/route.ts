import { NextRequest } from 'next/server';
import { saveSubscription } from '../utils';

/**
 * this route is called from the service worker directly
 * when the sw is registered - see /public/sw.js
 */
export async function POST(req: NextRequest) {
  const json = await req.json();
  saveSubscription(json);
  return Response.json({ status: 'Success', message: 'Subscription saved!' });
}

import crypto from "crypto";

const BASE_URL = 'https://api.binance.com';
const API_KEY = process.env.BINANCE_API_KEY;
const API_SECRET = process.env.BINANCE_API_SECRET;

if (!API_KEY) {
  throw new Error('API_KEY must be set in .env');
}

if (!API_SECRET) {
  throw new Error('API_SECRET must be set in .env');
}

function sign(query: string): string {
  if(!API_SECRET) {
    throw new Error('API_SECRET is not set');
  }
  return crypto.createHmac('sha256', API_SECRET).update(query).digest('hex');
}

export async function callBinancePrivate(method: 'GET' | 'POST' | 'DELETE', path: string, params: Record<string, any> = {}) {
  if (!API_KEY) {
    throw new Error('API_KEY is not set');
  }
  const timestamp = Date.now().toString();
  const searchParams = new URLSearchParams({ ...params, timestamp });
  const signature = sign(searchParams.toString());
  searchParams.append('signature', signature);

  const url = `${BASE_URL}${path}?${searchParams.toString()}`;

  console.log(`➡️ Binance Request: ${method} ${url}`);

  const response = await fetch(url, {
    method,
    headers: { 'X-MBX-APIKEY': API_KEY }
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Binance error: ${response.status} ${errorBody}`);
  }

  return response.json();
}

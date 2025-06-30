import { describe, it, expect } from "bun:test";

describe('Binance Proxy', () => {
  it('should respond to /binance-proxy with account info', async () => {
     const body = {
      method: 'GET',
      path: '/api/v3/account',
      params: {}
    };
    const response = await fetch('http://localhost:3000/binance-proxy',
       { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

    expect(response.status).toBe(200);
    const responseText = await response.text();
    const { data } = JSON.parse(responseText);

    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    data.forEach((balance: { asset: any; free: string; locked: string; }) => {
      expect(balance.asset).toBeDefined();
      expect(balance.free).toBeDefined();
      expect(balance.locked).toBeDefined();
      expect(parseFloat(balance.free)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(balance.locked)).toBeGreaterThanOrEqual(0);
    });
  });

});

describe('placeMarketOrder', () => {
  it('should place a market order', async () => {
    const body = {
        symbol: 'BTCUSDT',
        side: 'BUY',
        type: 'MARKET',
        quantity: 0.0001
    };
    const response = await fetch('http://localhost:3000/place-market-order',
        { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
    expect(response.status).toBe(200);
    const responseText = await response.text();
    const { success, message, data } = JSON.parse(responseText);
    expect(success).toBe(true);
    expect(message).toBe('Order placed successfully');
    expect(data).toBeDefined();});
});
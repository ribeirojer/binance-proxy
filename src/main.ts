import { Elysia, t } from "elysia";
import { callBinancePrivate } from "./utils";

const app = new Elysia();

app.post(
  "/binance-proxy",
  async ({ body, set }) => {
    const { method, path, params } = body;

    try {
      const data = await callBinancePrivate(method, path, params);

      if (path === '/api/v3/account' && data?.balances) {
        data.balances = data.balances.filter(
          (          b: { free: string; locked: string; }) => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0
        );

      }

      return { success: true, data: data.balances };

    } catch (err: any) {
      console.error("❌ Binance Proxy Error:", err);
      set.status = 502;
      return { success: false, error: err.message };
    }
  },
  {
    body: t.Object({
      method: t.Union([t.Literal('GET'), t.Literal('POST'), t.Literal('DELETE')]),
      path: t.String(),
      params: t.Optional(t.Record(t.String(), t.Any()))
    })
  }
);

app.post(
  "/place-market-order",
  async ({ body, set }) => {
    const { symbol, quantity, side, type } = body;
    
    if (!symbol || !quantity || !side || !type) {
      set.status = 400;
      return { success: false, error: 'Missing required order parameters' };
    }

    try {
      const data = await callBinancePrivate('POST', '/api/v3/order', {
        symbol,
        quantity: quantity.toString(),
        side,
        type
      });

      return { success: true, message: 'Order placed successfully', data };
    } catch (err: any) {
      console.error("❌ Order Error:", err);
      set.status = 502;
      return { success: false, error: err.message };
    }
  },
  {
    body: t.Object({
      symbol: t.String(),
      quantity: t.Number(),
      side: t.String(),
      type: t.String()
    })
  }
);

app.listen(3000);

console.log(`🦊 Elysia is running at http://localhost:3000`);

import { Elysia } from "elysia";
import { binanceProxy, placeMarketOrder } from "./controller";
import { binanceProxyType, placeMarketOrderType } from "./types";

const app = new Elysia();

app.post(
	"binance-proxy",
	async ({ body, set }) => {
		return await binanceProxy(body, set);
	},
	binanceProxyType,
);

app.post(
	"/place-market-order",
	async ({ body, set }) => {
		return await placeMarketOrder(body, set);
	},
	placeMarketOrderType,
);

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`🦊 Elysia is running at http://localhost:${port}`);

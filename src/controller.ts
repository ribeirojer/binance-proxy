import { callBinancePrivate } from "./utils";

export async function binanceProxy(body: any, set: any) {
	console.log("Received request:", body);
	const { method, path, params } = body;

	try {
		const data = await callBinancePrivate(method, path, params);

		if (path === "/api/v3/account" && data?.balances) {
			data.balances = data.balances.filter(
				(b: { free: string; locked: string }) =>
					parseFloat(b.free) > 0 || parseFloat(b.locked) > 0,
			);
		}

		return { success: true, data: data.balances };
	} catch (err: any) {
		console.error("❌ Binance Proxy Error:", err);
		set.status = 502;
		return { success: false, error: err.message };
	}
}

export async function placeMarketOrder(body: any, set: any) {
	const { symbol, quantity, side, type } = body;

	if (!symbol || !quantity || !side || !type) {
		set.status = 400;
		return { success: false, error: "Missing required order parameters" };
	}

	try {
		const data = await callBinancePrivate("POST", "/api/v3/order", {
			symbol,
			quantity: quantity.toString(),
			side,
			type,
		});

		return { success: true, message: "Order placed successfully", data };
	} catch (err: any) {
		console.error("❌ Order Error:", err);
		set.status = 502;
		return { success: false, error: err.message };
	}
}

import crypto from "crypto";
import { API_KEY, API_SECRET, BASE_URL } from "./config";

function sign(query: string): string {
	return crypto.createHmac("sha256", API_SECRET).update(query).digest("hex");
}

export async function callBinancePrivate(
	method: "GET" | "POST" | "DELETE",
	path: string,
	params: Record<string, any> = {},
) {
	const timestamp = Date.now().toString();
	const searchParams = new URLSearchParams({ ...params, timestamp });
	const signature = sign(searchParams.toString());
	searchParams.append("signature", signature);

	const url = `${BASE_URL}${path}?${searchParams.toString()}`;

	console.log(`➡️ Binance Request: ${method} ${url}`);

	const response = await fetch(url, {
		method,
		headers: { "X-MBX-APIKEY": API_KEY },
	});

	if (!response.ok) {
		const errorBody = await response.text();
		throw new Error(`Binance error: ${response.status} ${errorBody}`);
	}

	return response.json();
}

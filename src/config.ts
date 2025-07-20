const BASE_URL = "https://api.binance.com";
const API_KEY = process.env.BINANCE_API_KEY || "";
const API_SECRET = process.env.BINANCE_API_SECRET || "";

if (!API_KEY) {
	throw new Error("API_KEY must be set in .env");
}

if (!API_SECRET) {
	throw new Error("API_SECRET must be set in .env");
}

export { BASE_URL, API_KEY, API_SECRET };

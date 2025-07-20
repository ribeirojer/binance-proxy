import { t } from "elysia";

export const placeMarketOrderType = {
	body: t.Object({
		symbol: t.String(),
		quantity: t.Number(),
		side: t.String(),
		type: t.String(),
	}),
};

export const binanceProxyType = {
	body: t.Object({
		method: t.Union([t.Literal("GET"), t.Literal("POST"), t.Literal("DELETE")]),
		path: t.String(),
		params: t.Optional(t.Record(t.String(), t.Any())),
	}),
};

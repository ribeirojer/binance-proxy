export interface BinanceAccount {
	makerCommission: number;
	takerCommission: number;
	buyerCommission: number;
	sellerCommission: number;
	commissionRates: CommissionRates;
	canTrade: boolean;
	canWithdraw: boolean;
	canDeposit: boolean;
	brokered: boolean;
	requireSelfTradePrevention: boolean;
	preventSor: boolean;
	updateTime: number;
	accountType: string;
	balances: Balance[];
	permissions: string[];
	uid: number;
}

export interface CommissionRates {
	maker: string;
	taker: string;
	buyer: string;
	seller: string;
}

export interface Balance {
	asset: string;
	free: string;
	locked: string;
}

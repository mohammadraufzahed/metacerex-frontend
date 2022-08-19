export type AutocompleteAssets = {
  code: string;
  name?: string;
  name_farsi?: string;
  icon: string;
  q?: string;
  networks: {
    name: string;
    name_detailed: string;
    site_wallet_address: string;
  };
};

export type BaseAsset = {
  code: string;
  name?: string;
  name_farsi?: string;
  icon: string;
  precision?: number;
};

export type Buy = {
  id: number;
  added_on: string;
  updated_on: string;
  quantity: string;
  quote_asset_equivalent: string;
  market_price: string;
  network_fee: string;
  final_payable: string;
  state: State914Enum;
  user: number;
  symbol: number;
};

export type BuyCreate = {
  id: number;
  is_preview: boolean;
  added_on: string;
  updated_on: string;
  quantity?: string;
  quote_asset_equivalent?: string;
  market_price: string;
  network_fee: string;
  final_payable: string;
  state: State914Enum;
  user: number;
};

export type CustomTokenObtain = {
  access: string;
  refresh: string;
  user_display_name: string;
  is_password_entered: boolean;
  is_mobile_verified: boolean;
  is_identity_verified: boolean;
  is_shetab_cards_verified: boolean;
  username: string;
  password: string;
};

export type DepositStateEnum = "new" | "waiting" | "verified" | "failed";

export type Deposit = {
  id: number;
  added_on: string;
  updated_on: string;
  amount_toman: number;
  state?: DepositStateEnum;
  user: number;
  card: number;
  transaction: number;
};

export type DepositCreate = {
  amount_toman: number;
  gateway: GatewayEnum;
  card_number: string;
  short_desc?: string;
  callback_url: string;
  redirect_url: string;
};

export type DepositVerify = {
  token: string;
  payment_status: string;
  error: string;
  ref_number: string;
  tracking_code: string;
  transaction_id: string;
};

export type GatewayEnum = "VANDAR";

export type QuoteAssetEnum = "USDT" | "BUSD" | "DAI" | "USDC";

export type State914Enum =
  | "NEW"
  | "SCHEDULED"
  | "VERIFIED"
  | "CANCELLED"
  | "REJECTED";

export type WithdrawStateEnum = "NEW" | "VERIFIED" | "FAILED";

export type WsStateEnum = "new" | "read" | "ignored";

export type Networks = {
  name: string;
  name_detailed: string;
  site_wallet_address: string;
};

export type NewsArticleDetail = {
  author: string;
  cover: string;
  title: string;
  description: string;
  body: string;
  tags: string;
  added_on: string;
  updated_on: string;
};

export type NewsArticleList = {
  pk: number;
  author: string;
  cover: string;
  title: string;
  description: string;
  added_on: string;
};

export type Notifications = {
  id: number;
  message: string;
  ws_state?: WsStateEnum;
  added_on: string;
};

export type PasswordSet = {
  password1: string;
  password2: string;
};

export type ProfileReadOnly = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  is_mobile_verified: boolean;
  melli_code: string;
  is_identity_verified: boolean;
  is_shetab_cards_verified: boolean;
  referral_code: string;
  referred_by: ReferredByReadOnly;
  balance_toman: number;
  cards: UserCardsReadonly[];
};

export type UserCardsReadonly = {
  number: string;
  sheba: string;
  is_verified: boolean;
};

export type ReferredByReadOnly = {
  name: string;
  code: string;
};

export type RegisterMobileRequest = {
  mobile: string;
  uuid: string;
  referrer_code?: string;
};

export type RegisterMobileVerify = {
  uuid: string;
  response: string;
  access: string;
  refresh: string;
  user_display_name: string;
};

export type ReportEOD = {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  email?: string;
  period_deposit_toman: number;
  period_withdraw_toman: number;
  period_balance_toman: number;
  total_balance_toman: number;
};

export type Status = {
  is_maintenance_mode: boolean;
  allowed_qoute_assets: string[];
  shetab_gateways: string[];
};

export type TickerTable = {
  code: string;
  base_asset: {
    code: string;
    name?: string;
    name_farsi?: string;
    icon: string;
    precision: number;
  };
  quote_asset?: QuoteAssetEnum;
  price?: string;
  price_toman: string;
};

export type TokenRefresh = {
  access: string;
  refresh: string;
};

export type UserAdmin = {
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile?: string;
  password: string;
};

export type VerifyIdentity = {
  melli_code: string;
  first_name: string;
  last_name: string;
  photo_melli_card: string;
  photo_with_melli_card: string;
};

export type VerifyShetab = {
  card_number: string;
  sheba_number: string;
  photo_bank_card: string;
  photo_with_bank_card: string;
};

export type Withdraw = {
  id: number;
  card: ShetabCard;
  transaction: Transaction;
  added_on: string;
  updated_on: string;
  state?: WithdrawStateEnum;
  user: number;
};

export type WithdrawCreate = {
  amount_toman: number;
  sheba_number: string;
  short_desc?: string;
  withdraw_id: string;
};

export type ShetabCard = {
  number: string;
  sheba: string;
};

export type Transaction = {
  uuid: string;
  ref_number: string;
  tracking_code: string;
};

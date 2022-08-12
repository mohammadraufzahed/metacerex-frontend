export type AutocompleteAssets = {
  code: String;
  name?: String;
  name_farsi?: String;
  icon: String;
  q?: String;
  networks: {
    name: String;
    name_detailed: String;
    site_wallet_address: String;
  };
};

export type BaseAsset = {
  code: String;
  name?: String;
  name_farsi?: String;
  icon: String;
  precision?: Number;
};

export type Buy = {
  id: Number;
  added_on: String;
  updated_on: String;
  quantity: string;
  quote_asset_equivalent: String;
  market_price: String;
  network_fee: String;
  final_payable: String;
  state: State914Enum;
  user: Number;
  symbol: Number;
};

export type BuyCreate = {
  id: Number;
  is_preview: Boolean;
  added_on: String;
  updated_on: String;
  quantity?: String;
  quote_asset_equivalent?: String;
  market_price: String;
  network_fee: String;
  final_payable: String;
  state: State914Enum;
  user: Number;
};

export type CustomTokenObtain = {
  access: String;
  refresh: String;
  user_display_name: String;
  is_password_entered: Boolean;
  is_mobile_verified: Boolean;
  is_identity_verified: Boolean;
  is_shetab_cards_verified: Boolean;
  username: String;
  password: String;
};

export type DepositStateEnum = "new" | "waiting" | "verified" | "failed";

export type Deposit = {
  id: Number;
  added_on: String;
  updated_on: String;
  amount_toman: Number;
  state?: DepositStateEnum;
  user: Number;
  card: Number;
  transaction: Number;
};

export type DepositCreate = {
  amount_toman: Number;
  gateway: GatewayEnum;
  card_number: String;
  short_desc?: String;
  callback_url: String;
  redirect_url: String;
};

export type DepositVerify = {
  token: String;
  payment_status: String;
  error: String;
  ref_number: String;
  tracking_code: String;
  transaction_id: String;
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
  name: String;
  name_detailed: String;
  site_wallet_address: String;
};

export type NewsArticleDetail = {
  author: String;
  cover: String;
  title: String;
  description: String;
  body: String;
  tags: String;
  added_on: String;
  updated_on: String;
};

export type NewsArticleList = {
  pk: Number;
  author: String;
  cover: String;
  title: String;
  description: String;
  added_on: String;
};

export type Notifications = {
  id: Number;
  message: String;
  ws_state?: WsStateEnum;
  added_on: String;
};

export type PasswordSet = {
  password1: String;
  password2: String;
};

export type ProfileReadOnly = {
  username: String;
  first_name: String;
  last_name: String;
  email: String;
  mobile: String;
  is_mobile_verified: Boolean;
  melli_code: String;
  is_identity_verified: Boolean;
  is_shetab_cards_verified: Boolean;
  referral_code: String;
  referred_by: ReferredByReadOnly;
  balance_toman: Number;
  cards: UserCardsReadonly[];
};

export type UserCardsReadonly = {
  number: String;
  sheba: String;
  is_verified: Boolean;
};

export type ReferredByReadOnly = {
  name: String;
  code: String;
};

export type RegisterMobileRequest = {
  mobile: String;
  uuid: String;
  referrer_code?: String;
};

export type RegisterMobileVerify = {
  uuid: String;
  response: String;
  access: String;
  refresh: String;
  user_display_name: String;
};

export type ReportEOD = {
  id: Number;
  username: String;
  first_name?: String;
  last_name?: String;
  mobile?: String;
  email?: String;
  period_deposit_toman: Number;
  period_withdraw_toman: Number;
  period_balance_toman: Number;
  total_balance_toman: Number;
};

export type Status = {
  is_maintenance_mode: Boolean;
  allowed_qoute_assets: String[];
  shetab_gateways: String[];
};

export type TickerTable = {
  code: String;
  base_asset: {
    code: String;
    name?: String;
    name_farsi?: String;
    icon: String;
    precision: Number;
  };
  quote_asset?: QuoteAssetEnum;
  price?: String;
  price_toman: String;
};

export type TokenRefresh = {
  access: String;
  refresh: String;
};

export type UserAdmin = {
  username: String;
  first_name?: String;
  last_name?: String;
  email?: String;
  mobile?: String;
  password: String;
};

export type VerifyIdentity = {
  melli_code: String;
  first_name: String;
  last_name: String;
  photo_melli_card: String;
  photo_with_melli_card: String;
};

export type VerifyShetab = {
  card_number: String;
  sheba_number: String;
  photo_bank_card: String;
  photo_with_bank_card: String;
};

export type Withdraw = {
  id: Number;
  card: ShetabCard;
  transaction: Transaction;
  added_on: String;
  updated_on: String;
  state?: WithdrawStateEnum;
  user: Number;
};

export type WithdrawCreate = {
  amount_toman: Number;
  sheba_number: String;
  short_desc?: String;
  withdraw_id: String;
};

export type ShetabCard = {
  number: String;
  sheba: String;
};

export type Transaction = {
  uuid: String;
  ref_number: String;
  tracking_code: String;
};

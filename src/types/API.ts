export type AutocompleteAssets = {
  code: string;
  name?: string;
  name_farsi?: string;
  icon: string;
  q?: string;
  networks: {
    name: string;
    name_detailed: string;
    exchange_network_address: string;
    has_memo: boolean;
  }[];
  precision: number;
};

export type AssetBalanceResponse = {
  balances: AssetBalance[];
};

export type AssetBalance = {
  asset: Asset;
  total_deposits: string;
  total_withdraws: string;
  total_buys: string;
  total_sells: string;
  total_blocked: string;
  total_balance: string;
};

export type OrderStatus = "OPEN" | "CANCELED" | "REJECTED" | "EXPIRED" | "DONE";

export type OrderType = "INSTANT" | "MAIN";

export type OrderHistory = {
  order_id: string;
  added_on: string;
  base_asset: Asset;
  quote_asset: Asset;
  base_asset_unit_price_toman: string;
  api_quantity: string;
  type: OrderType;
  value_toman: string;
  fee_total_usdt: string;
  fee_total_toman: string;
  state: OrderStatus;
};

export type PaginatedOrderHistory = Paginated & {
  results: OrderHistory[];
};

export type Asset = {
  code: string;
  name?: string;
  name_farsi?: string;
  icon: string;
};

export type OrdersOpen = {
  type: OrderType;
  side: "BUY" | "SELL";
  order_id: string;
  base_asset: Asset;
  quote_asset: Asset;
  added_on: string;
  api_quantity: number;
  value_usdt: string;
  value_toman: string;
};

export type PaginatedOrdersOpen = Paginated & {
  results: OrdersOpen[];
};

export type TransactionHistory = {
  nanoid: string;
  added_on: string;
  asset: Asset;
  type: "DEPOSIT" | "WITHDRAW";
  quantity: string;
  state: "NEW" | "PROGRESS" | "DONE" | "CANCELLED" | "REJECTED";
  description: string;
};

export type PaginatedTransactionHistory = Paginated & {
  results: TransactionHistory[];
};

export type AssetList = BaseAsset & {
  networks: Networks[];
  balance: string;
  value_quote: string;
  value_toman: string;
  is_depositable?: boolean;
  is_withdrawable?: boolean;
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
  session_id: string;
  user_display_name: string;
  is_password_entered: boolean;
  is_mobile_verified: boolean;
  is_identity_verified: boolean;
  is_shetab_cards_verified: boolean;
  username: string;
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
  name_detailed?: string;
  exchange_network_address: string;
  has_memo: boolean;
};

export type NewsArticleDetail = {
  author: string;
  cover: {
    crop: string;
  };
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
  cover: {
    thumb: string;
  };
  slug: string;
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

export type PaginatedNotifications = Paginated & {
  results: Notifications[];
};

export type TOTPState = {
  url: string;
  secret: string;
  is_totp_enabled: boolean;
};

export type PasswordSet = {
  password1: string;
  password2: string;
};

export type ProfileReadOnly = {
  username: string;
  first_name: string;
  last_name: string;
  father_name: string;
  birth_date: string;
  postal_code: string;
  address: string;
  email: string;
  mobile: string;
  phone: string;
  is_mobile_verified: boolean | null;
  is_email_verified: boolean | null;
  melli_code: string;
  is_identity_verified: boolean | null;
  is_shetab_cards_verified: boolean | null;
  referral_code: string;
  referred_by: ReferredByReadOnly;
  balance_toman: number;
  cards: UserCardsReadonly[];
};

export type Wallet = {
  is_faved: boolean;
  asset: Asset;
  amount: number;
  value: number;
  price_buy: number;
  price_sell: number;
};

export type PaginatedWallet = Paginated & {
  results: Wallet[];
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

export type RegisterRequest = {
  mobile?: string;
  email?: string;
  password: string;
  referrer_code?: string;
};

export type RegisterRequestResponse = {
  mobile?: string;
  email?: string;
  uuid: string;
};

export type RegisterVerify = {
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
  oa2_google_client_id: string;
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
  price?: string;
  price_toman: string;
};

export type PaginatedTickerTable = Paginated & {
  results: TickerTable[];
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

export type UserLogs = {
  requested_at: string;
  remote_addr: string;
  action: string;
};

export type Paginated = {
  count: number;
  next: string;
  previous: string;
};

export type PaginatedNewsList = Paginated & {
  results: NewsArticleList[];
};

export type PaginatedUserLogs = Paginated & {
  results: UserLogs[];
};

export type PaginatedCardList = Paginated & {
  results: Card[];
};

export type Card = {
  id: number;
  number: string;
  sheba: string;
  bank?: Bank;
  branch?: string;
  account_type?: AccountType;
  is_verified: boolean;
  is_active: boolean;
};

export type AccountType =
  | "SAVING_LOAN"
  | "CURRENT_LOAN"
  | "SHORT_DEPOSIT"
  | "LONG_DEPOSIT"
  | "PLANNED_DEPOSIT";

export type Bank =
  | "MELLI"
  | "PARSIAN"
  | "ENBANK"
  | "PASARGAD"
  | "KESHAVARZI"
  | "SAMAN"
  | "MELLAT"
  | "SADERAT"
  | "REFAH"
  | "SARMAYEH";

export type ShetabCard = {
  number: string;
  sheba: string;
};

export type Transaction = {
  uuid: string;
  ref_number: string;
  tracking_code: string;
};

export type Earning = {
  currency: string;
  date: string;
  date_confirmed: number;
  eps: string;
  eps_est: string;
  eps_prior: string;
  eps_surprise: string;
  eps_surprise_percent: string;
  eps_type: string;
  exchange: string;
  id: string;
  importance: number;
  name: string;
  notes: string;
  period: string;
  period_year: number;
  revenue: string;
  revenue_est: string;
  revenue_prior: string;
  revenue_surprise: string;
  revenue_surprise_percent: string;
  revenue_type: string;
  ticker: string;
  time: string;
  updated: number;
};

export type EarningsApiResponse = {
  earnings: Earning[];
};

type FileData = {
  mark_vector_light: string;
};

export type LogoData = {
  id: string;
  search_key: string;
  files: FileData;
  created_at: string;
  updated_at: string;
};

export type LogoApiResponse = {
  ok: boolean;
  data: LogoData[];
};

export type BeforeOpen = "Before Open";
export type AfterClose = "After Close";

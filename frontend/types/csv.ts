export type CSVRow = {
  test_id: number | string;
  result: number;
};

export type CSVStats = {
  mean: number;
  median: number;
  min: number;
  max: number;
};

export type CSVResponse = {
  stats: CSVStats;
  data: CSVRow[];
};

export type APIError = {
  error: string;
};

import axios from "axios";
import { getLastQuarterDates } from "./utils";
import { DEFAULT_API_KEY } from "./constants";
import { EarningsApiResponse, LogoApiResponse } from "./types";

const API_KEY = import.meta.env.VITE_BENZINGA_API_KEY || DEFAULT_API_KEY;

export const fetchLastQuarterEarnings =
  async (): Promise<EarningsApiResponse> => {
    const { startDate, endDate } = getLastQuarterDates();

    try {
      const response = await axios.get<EarningsApiResponse>(
        `https://api.benzinga.com/api/v2.1/calendar/earnings?token=${API_KEY}&parameters[date_from]=${startDate}&parameters[date_to]=${endDate}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching earnings data:", error);
      throw error;
    }
  };

export const fetchLogos = async (
  tickers: string[]
): Promise<LogoApiResponse> => {
  const response = await axios.get<LogoApiResponse>(
    `https://api.benzinga.com/api/v2/logos/search?token=${API_KEY}&search_keys=${tickers.join(
      ","
    )}&fields=mark_vector_light`
  );
  return response.data;
};

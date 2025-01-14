import axios from "axios";
import { getLastQuarterDates } from "./utils";

const API_KEY =
  import.meta.env.VITE_BENZINGA_API_KEY || "f090a778d74f4450a11ad417ad72740c";

export const fetchLastQuarterEarnings = async () => {
  const { startDate, endDate } = getLastQuarterDates();

  try {
    const response = await axios.get(
      `https://api.benzinga.com/api/v2.1/calendar/earnings?token=${API_KEY}&parameters[date_from]=${startDate}&parameters[date_to]=${endDate}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    throw error;
  }
};

export const fetchLogos = async (tickers) => {
  const response = await axios.get(
    `https://api.benzinga.com/api/v2/logos/search?token=${API_KEY}&search_keys=${tickers.join(
      ","
    )}&fields=mark_vector_light`
  );
  return response.data;
};

import React, { useState, useEffect } from "react";
import EarningsGrid from "../EarningsGrid/EarningsGrid";
import { fetchLastQuarterEarnings, fetchLogos } from "../../utils/api";
import styles from "./EarningsCalendarWidget.module.css";

const EarningsCalendarWidget = ({ customStyle = {} }) => {
  const [earningsData, setEarningsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEarningsData = async () => {
      try {
        setLoading(true);
        // Fetch earnings data
        const { earnings } = await fetchLastQuarterEarnings();

        // Group earnings by day of the week into "Before Open" and "After Close"
        const groupedEarnings = earnings.reduce((acc, item) => {
          const day = new Date(item.date).toLocaleDateString("en-US", {
            weekday: "long",
          });

          // Time thresholds in EST
          const marketOpenTime = "09:30:00";
          const marketCloseTime = "16:00:00";

          let timeCategory = null;
          if (item.time < marketOpenTime) {
            timeCategory = "Before Open";
          } else if (item.time >= marketCloseTime) {
            timeCategory = "After Close";
          }

          if (timeCategory) {
            if (!acc[day]) acc[day] = { "Before Open": [], "After Close": [] };
            acc[day][timeCategory].push(item);
          }

          return acc;
        }, {});

        // Fetch logos for the tickers
        const tickers = earnings.map((item) => item.ticker);
        const { data: logos } = await fetchLogos(tickers);

        // Add logo URLs to grouped earnings
        Object.keys(groupedEarnings).forEach((day) => {
          Object.keys(groupedEarnings[day]).forEach((timeCategory) => {
            groupedEarnings[day][timeCategory] = groupedEarnings[day][
              timeCategory
            ].map((item) => ({
              ...item,
              logo: logos.find((logo) => logo.search_key === item.ticker)?.files
                ?.mark_vector_light,
            }));
          });
        });

        setEarningsData(groupedEarnings);
      } catch (err) {
        setError("Failed to fetch earnings data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEarningsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.widget} style={{ ...customStyle }}>
      <div className={styles.headerRow}>
        <h2>
          Earnings<br></br>Calendar
        </h2>
        <div className={styles.headerRHS}>
          <h3>
            Most Anticipated Earnings Releases<br></br>In the last Quarter
          </h3>
        </div>
      </div>
      <EarningsGrid data={earningsData} />
    </div>
  );
};

export default EarningsCalendarWidget;

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import EarningsGrid from "../EarningsGrid/EarningsGrid";
import { fetchLastQuarterEarnings, fetchLogos } from "../../utils/api";
import { MARKET_CLOSE_TIME, MARKET_OPEN_TIME } from "../../utils/constants";
import { AfterClose, BeforeOpen, Earning } from "../../utils/types";
import styles from "./EarningsCalendarWidget.module.css";

interface GroupedEarnings {
  [day: string]: {
    "Before Open": Earning[];
    "After Close": Earning[];
  };
}

interface EarningsCalendarWidgetProps {
  customStyle?: React.CSSProperties;
}

const EarningsCalendarWidget: React.FC<EarningsCalendarWidgetProps> = ({
  customStyle = {},
}) => {
  const [searchParams] = useSearchParams();

  const widgetStyle = {
    ...customStyle,
    width:
      parseInt(searchParams.get("width") || "") || customStyle.width || 800,
    height:
      parseInt(searchParams.get("height") || "") || customStyle.height || 600,
  };

  const [earningsData, setEarningsData] = useState<GroupedEarnings>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEarningsData = async () => {
      try {
        setLoading(true);
        const { earnings } = await fetchLastQuarterEarnings();

        // Group earnings by day of the week into "Before Open" and "After Close"
        const groupedEarnings = earnings.reduce(
          (acc: GroupedEarnings, item) => {
            const day = new Date(item.date).toLocaleDateString("en-US", {
              weekday: "long",
            });

            let timeCategory: BeforeOpen | AfterClose | null = null;
            if (item.time < MARKET_OPEN_TIME) {
              timeCategory = "Before Open";
            } else if (item.time >= MARKET_CLOSE_TIME) {
              timeCategory = "After Close";
            }

            if (timeCategory) {
              if (!acc[day])
                acc[day] = { "Before Open": [], "After Close": [] };
              acc[day][timeCategory].push(item);
            }

            return acc;
          },
          {}
        );

        const tickers = earnings.map((item) => item.ticker);
        const { data: logos } = await fetchLogos(tickers);

        // Add logo URLs to grouped earnings
        Object.keys(groupedEarnings).forEach((day) => {
          Object.keys(groupedEarnings[day]).forEach((timeCategory) => {
            groupedEarnings[day][timeCategory as BeforeOpen | AfterClose] =
              groupedEarnings[day][timeCategory as BeforeOpen | AfterClose].map(
                (item) => ({
                  ...item,
                  logo: logos.find((logo) => logo.search_key === item.ticker)
                    ?.files?.mark_vector_light,
                })
              );
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

  const loaderConfig = useMemo(
    () => [
      {
        type: "container",
        style: {
          display: "grid",
          gridTemplateRows: "100px auto",
          gap: 4,
          backgroundColor: "#ddb785",
          padding: 8,
          boxSizing: "border-box" as const,
          overflow: "hidden",
          ...widgetStyle,
        },
        childrens: [
          { shape: "rect", style: { width: "100%", height: "100%" } },
          ,
          {
            type: "container",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(140px, 1fr))",
              gridAutoFlow: "column",
              gap: 4,
              overflow: "auto",
            },
            childrens: Array(5).fill({
              shape: "rect",
            }),
          },
        ],
      },
    ],
    [widgetStyle]
  );

  if (error) return <p>{error}</p>;

  console.log("earningsData---->", earningsData);

  return (
    <Loader config={loaderConfig} isLoading={loading}>
      <div className={styles.widget} style={{ ...widgetStyle }}>
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
    </Loader>
  );
};

export default EarningsCalendarWidget;

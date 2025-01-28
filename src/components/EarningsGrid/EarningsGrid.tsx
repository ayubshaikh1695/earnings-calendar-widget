import React from "react";
import EarningsCell from "../EarningsCell/EarningsCell";
import styles from "./EarningsGrid.module.css";
import { DAYS } from "../../utils/constants";

interface EarningsData {
  [day: string]: {
    "Before Open"?: any[];
    "After Close"?: any[];
  };
}

interface EarningsGridProps {
  data: EarningsData;
}

const EarningsGrid: React.FC<EarningsGridProps> = ({ data }) => {
  return (
    <div className={styles.grid}>
      {/* Header Row */}
      <div className={styles.headerRow}>
        {DAYS.map((day) => (
          <div key={day}>
            <div className={styles.dayHeader}>{day}</div>
            <div className={styles.subHeaderContent}>
              <span className={styles.subHeader}>Before Open</span>
              <span className={styles.subHeader}>After Close</span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Rows */}
      <div className={styles.dataRow}>
        {DAYS.map((day) => (
          <div key={day} className={styles.dayColumn}>
            <div className={styles.daySubColumns}>
              <EarningsCell earnings={data[day]?.["Before Open"] || []} />
              <EarningsCell earnings={data[day]?.["After Close"] || []} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsGrid;

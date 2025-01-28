import React from "react";
import Logo from "../Logo/Logo";
import styles from "./EarningsCell.module.css";

interface EarningItem {
  ticker: string;
  logo: string;
}

interface EarningsCellProps {
  earnings: EarningItem[];
}

const EarningsCell: React.FC<EarningsCellProps> = ({ earnings }) => {
  return (
    <div className={styles.cell}>
      {earnings.map((item, index) => (
        <Logo
          key={`${item.ticker}-${index}`}
          ticker={item.ticker}
          imgUrl={item.logo}
        />
      ))}
    </div>
  );
};

export default EarningsCell;

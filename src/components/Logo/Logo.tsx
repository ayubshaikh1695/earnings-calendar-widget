import React from "react";
import { BENZINGA_QUOTE_ENDPOINT_BASE_URL } from "../../utils/constants";
import styles from "./Logo.module.css";

interface LogoProps {
  ticker: string;
  imgUrl: string;
}

const Logo: React.FC<LogoProps> = ({ ticker, imgUrl }) => {
  const redirectToQuote = () => {
    window.open(`${BENZINGA_QUOTE_ENDPOINT_BASE_URL}/${ticker}`, "_blank");
  };

  return (
    <div className={styles.container} onClick={redirectToQuote}>
      <div className={styles.ticker}>{ticker}</div>
      <img src={imgUrl} alt={ticker} className={styles.logo} />
    </div>
  );
};

export default Logo;

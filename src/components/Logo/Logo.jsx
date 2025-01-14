import React from "react";
import styles from "./Logo.module.css";

const Logo = ({ ticker, imgUrl }) => {
  const redirectToQuote = () => {
    window.open(`https://www.benzinga.com/quote/${ticker}`, "_blank");
  };

  return (
    <div className={styles.container} onClick={redirectToQuote}>
      <div className={styles.ticker}>{ticker}</div>
      <img src={imgUrl} alt={ticker} className={styles.logo} />
    </div>
  );
};

export default Logo;

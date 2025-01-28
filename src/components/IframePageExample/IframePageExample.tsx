import styles from "./IframePageExample.module.css";

const WIDGET_WIDTH: number = 700;
const WIDGET_HEIGHT: number = 500;

function IframePageExample(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Example iframe implementation</h2>
        <iframe
          src={`/calendar?width=${WIDGET_WIDTH}&height=${WIDGET_HEIGHT}`}
          title="Earnings Calendar"
          style={{
            width: WIDGET_WIDTH,
            height: WIDGET_HEIGHT,
            overflow: "hidden",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}

export default IframePageExample;

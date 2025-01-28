import React from "react";
import styles from "./Loader.module.css";

interface SkeletonItem {
  type?: string;
  shape?: string;
  style?: React.CSSProperties;
  childrens?: (SkeletonItem | undefined)[];
}

interface LoaderProps {
  config: SkeletonItem[];
  isLoading: boolean;
  children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ config, isLoading, children }) => {
  if (!isLoading) return children;

  const renderSkeletonItem = (item: SkeletonItem | undefined) => {
    if (item?.type === "container") {
      return (
        <div style={item.style}>
          {item.childrens?.map((child, index) => (
            <React.Fragment key={index}>
              {renderSkeletonItem(child)}
            </React.Fragment>
          ))}
        </div>
      );
    }

    if (item?.shape === "circle") {
      return <div className={styles.skeletonCircle} style={item.style} />;
    }

    if (item?.shape === "rect") {
      return <div className={styles.skeletonRect} style={item.style} />;
    }

    return null;
  };

  return (
    <div className={styles.loaderContainer}>
      {config.map((item, index) => (
        <React.Fragment key={index}>{renderSkeletonItem(item)}</React.Fragment>
      ))}
    </div>
  );
};

export default Loader;

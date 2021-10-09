import React from "react";

import styles from "./cardLayout.module.css";

const CardLayout = (props) => {
  return <div  className={styles.cardLayout}>{props.children}</div>;
};

export default React.memo(CardLayout);

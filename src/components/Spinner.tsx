import { createPortal } from "react-dom";
import styles from "./Spinner.module.css"

const Spinner = () => {
    return(
    createPortal( <>
        <div className={styles['lds-ring']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>,document.getElementById('root'))
    );
};

export default Spinner;

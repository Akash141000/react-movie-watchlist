import styles from "./form.module.css";

const FormLayout = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <h1 className={styles.heading}>{props.heading}</h1>
        
        {props.children}
      </div>
    </div>
  );
};

export default FormLayout;

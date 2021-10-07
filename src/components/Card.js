import FavouriteIcon from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <>
      <div className={styles.card_title}>
        <h3>{props.title}</h3>
      </div>
      <div className={styles.card_image}>
        <img alt="nothing" className={styles.img_prop} src={props.imgSrc} />
      </div>
      <div className={styles.card_description}>
        <p>{props.description}</p>
      </div>

      <div className={styles.card_input}>
        <IconButton onClick={() => console.log("clicked...")}>
          <FavouriteIcon className={styles.btn} />
        </IconButton>
      </div>
    </>
  );
};

export default Card;

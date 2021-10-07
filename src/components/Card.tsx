import FavouriteIcon from "@mui/icons-material/FavoriteOutlined";
import NotFavouriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import styles from "./Card.module.css";
import React from "react";
import { Post } from "../util/types";

const Card: React.FC<{
  title: string;
  imgSrc: string;
  description: string;
  isFav: boolean;
  addOrRemoveFromFav: () => void;
}> = (props) => {
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
        <IconButton onClick={props.addOrRemoveFromFav}>
          {props.isFav ? (
            <FavouriteIcon className={styles.btn} />
          ) : (
            <NotFavouriteIcon />
          )}
        </IconButton>
      </div>
    </>
  );
};

export default Card;

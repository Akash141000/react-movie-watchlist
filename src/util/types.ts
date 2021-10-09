export interface formFieldsObj {
  [key: string]: {
    initial: string;
    type: string;
    label: string;
  };
}

export type Post = {
  title: string;
  image: string;
  description: string;
  _id: string;
  isFav?: boolean;
};

export interface requestObj {
  headers?: {};
  method?: string;
  body?: {};
}

export enum dispatchType {
  movies,
  favourites,
}

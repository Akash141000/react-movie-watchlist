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
};

export interface requestObj {
  headers?: {};
  method?: string;
  body?: {};
}

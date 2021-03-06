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

export enum formReducer {
  submit,
  error,
  isSubmitting,
}

export interface initialFormReducerState {
  formData: any;
  hasError:boolean;
  submit:boolean;
}

export interface httpResponse {
  error?: string;
  message?: string;
}

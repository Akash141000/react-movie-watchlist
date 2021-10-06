import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import * as yup from "yup";
import FormLayout from "../layout/formLayout";

const initialState = {
  formData: null,
};

const addMovieReducer = (state, action) => {
  if (action.type === "SUBMIT") {
    return {
      formData: action.val,
    };
  }
  return state;
};

const AddMovie = () => {
  const [response, setResponse] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  const [formState, formStateDispatch] = useReducer(
    addMovieReducer,
    initialState
  );
  const inputFields = {
    title: "",
    image: "",
    description: "",
  };

  const validationSchema = yup.object({
    title: yup
      .string("Enter a title")
      .required("Title is required"),
    image: yup
      .string("Enter your email")
      .url("Enter valid url")
      .required("Image url is required"),
    description: yup
      .string("Enter movie description")
      .required("Description is required"),
  });
  const Form = useForm(inputFields, validationSchema, formStateDispatch);

  useEffect(() => {
    if (formState.formData !== null) {
      sendResponse(
        "/addPost",
        {
          method: "POST",
          body: formState.formData,
        },
        setResponse
      );
    }
  }, [formState.formData]);

  return <FormLayout heading="Add Movie">{Form}</FormLayout>;
};
export default AddMovie;

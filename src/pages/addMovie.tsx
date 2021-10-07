import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import { object, SchemaOf, string } from "yup";
import FormLayout from "../layout/formLayout";
import { formFieldsObj } from "../util/types";

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

  const inputFields: formFieldsObj = {
    title: {
      initial: "",
      type: "text",
      label: "Title",
    },
    imageUrl: {
      initial: "",
      type: "text",
      label: "Image",
    },
    description: {
      initial: "",
      type: "text",
      label: "Description",
    },
  };
  interface yupSchema {
    title: string;
    imageUrl: string;
    description: string;
  }

  const validationSchema: SchemaOf<yupSchema> = object({
    title: string().required("Title is required"),
    imageUrl: string().required("Image url is required"),
    description: string().required(
      "Description is required"
    ),
  });
  const Form = useForm(inputFields, validationSchema, formStateDispatch);

  useEffect(() => {
    if (formState.formData !== null) {
      sendResponse(
        "/addPost",
        {
          method: "POST",
          body: formState.formData,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      
        setResponse
      );
    }
  }, [formState.formData]);

  return <FormLayout heading="Add Movie">{Form}</FormLayout>;
};
export default AddMovie;

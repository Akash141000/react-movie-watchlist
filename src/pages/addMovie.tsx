import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import { object, SchemaOf, string } from "yup";
import FormLayout from "../layout/formLayout";
import { formFieldsObj, formReducer } from "../util/types";
import { useHistory } from "react-router";

const initialState = {
  formData: null,
};

const addMovieReducer = (state, action) => {
  if (action.type === formReducer.submit) {
    return {
      formData: action.val,
    };
  }
  return state;
};

const AddMovie = () => {
  const [responseData, setResponseData] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();
  const history = useHistory();
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
    description: string().required("Description is required"),
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
        setResponseData
      );
    }
  }, [formState]);

  useEffect(()=>{
    if(!isLoading && !error){
      history.push("/movies");
    }
  },[isLoading,error]);

  return <FormLayout heading="Add Movie">{Form}</FormLayout>;
};
export default AddMovie;

import { useEffect, useReducer, useState,useContext } from "react";
import * as yup from "yup";
import { SchemaOf, object } from "yup";

//
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";

//
import AuthContext from "../store/auth-context";
import FormLayout from "../layout/formLayout";
import { formFieldsObj, formReducer, initialFormReducerState } from "../util/types";





const initialState:initialFormReducerState = {
  formData: null,
};


const loginReducer = (state, action) => {
  if (action.type === formReducer.submit) {
    return {
      formData: action.val,
    };
  }
  return state;
};

const Login = () => {
  const context = useContext(AuthContext);
  const [responseData, setResponse] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  const [formState, formStateDispatch] = useReducer(loginReducer, initialState);
  const inputFields: formFieldsObj = {
    username: {
      initial: "",
      type: "text",
      label: "Title",
    },
    password: {
      initial: "",
      type: "password",
      label: "Password",
    },
  };

  //
  interface yupSchema {
    username: string;
    password: string;
  }

  //yup validation schema
  const validationSchema: SchemaOf<yupSchema> = object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password should be minimum 8 characters length")
      .required("Password is required"),
  });

  //useForm Hook
  const Form = useForm(inputFields, validationSchema, formStateDispatch);

  useEffect(() => {
    if (formState.formData !== null) {
      sendResponse(
        "/postLogin",
        {
          method: "POST",
          body: formState.formData,
        },
        setResponse
      );
    }
  }, [formState]);


  useEffect(() => {
    if (!isLoading && !error) {
      context.setAuthentication(responseData);
    }
  }, [isLoading, error]);

  return <FormLayout heading="Login">{Form}</FormLayout>;
};
export default Login;

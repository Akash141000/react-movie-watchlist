import { useEffect, useReducer, useState,useContext } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import * as yup from "yup";
import { SchemaOf, object, string } from "yup";
import AuthContext from "../store/auth-context";
import FormLayout from "../layout/formLayout";
import { formFieldsObj } from "../util/types";

const initialState = {
  formData: null,
};

const loginReducer = (state, action) => {
  if (action.type === "SUBMIT") {
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

  interface yupSchema {
    username: string;
    password: string;
  }

  const validationSchema: SchemaOf<yupSchema> = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password should be minimum 8 characters length")
      .required("Password is required"),
  });

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
  }, [formState.formData]);

  useEffect(()=>{
    context.autoLogin();
  },[])

  useEffect(() => {
    if (!isLoading && !error) {
      context.setAuthentication(responseData);
    }
  }, [isLoading, error]);

  return <FormLayout heading="Login">{Form}</FormLayout>;
};
export default Login;

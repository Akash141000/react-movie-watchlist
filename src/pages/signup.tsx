import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import * as yup from "yup";
import FormLayout from "../layout/formLayout";
import { formFieldsObj } from "../util/types";
import { SchemaOf,object, string } from "yup";

const initialState = {
  formData: null,
};

const signupReducer = (state, action) => {
  if (action.type === "SUBMIT") {
    return {
      formData: action.val,
    };
  }
  return state;
};

const Signup = () => {
  const [responseData, setResponseData] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  const [formState, formStateDispatch] = useReducer(
    signupReducer,
    initialState
  );
  const inputFields: formFieldsObj = {
    username: {
      initial: "",
      type: "text",
      label: "Username",
    },
    email: {
      initial: "",
      type: "email",
      label: "Email",
    },
    password: {
      initial: "",
      type: "password",
      label: "Password",
    },
    confirmPassword: {
      initial: "",
      type: "password",
      label: "Confirm Password",
    },
  };

  interface yupSchema{
    username:string,
    email:string,
    password:string,
    confirmPassword:string,
  }

  const validationSchema:SchemaOf<yupSchema> = object({
    username: string().required("Username is required"),
    email: string().email("Enter valid email").required("Email is required"),
    password: string()
      .min(8, "Password should be minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: string()
      .min(8, "Password should be minimum 8 characters length")
      .min(8, "Password should be minimum 8 characters length")
      .required("Confirm Password is required"),
  });
  const Form = useForm(inputFields, validationSchema, formStateDispatch);

  useEffect(() => {
    if (formState.formData !== null) {
      sendResponse(
        "/postSignup",
        {
          method: "POST",
          body: formState.formData,
        },
        setResponseData
      );
    }
  }, [formState.formData]);

  return <FormLayout heading="Signup">{Form}</FormLayout>;
};
export default Signup;

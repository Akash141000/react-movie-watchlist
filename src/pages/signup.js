import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";

import * as yup from "yup";

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
  const [response, setResponse] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  const [formState, formStateDispatch] = useReducer(
    signupReducer,
    initialState
  );
  const inputFields = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  };
  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("Username is required!"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be minimum 8 characters length")
      .required("Password is required!"),
    email: yup
      .string("Enter your email")
      .email("Enter valid email")
      .required("Email is required!"),
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
        setResponse
      );
    }
  }, [formState.formData]);

  return Form;
};
export default Signup;

import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import * as yup from "yup";
import FormLayout from "../layout/formLayout";

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
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("Username is required"),
    email: yup
      .string("Enter your email")
      .email("Enter valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: yup
      .string("Enter same password as above")
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
        setResponse
      );
    }
  }, [formState.formData]);

  return <FormLayout heading="Signup">{Form}</FormLayout>;
};
export default Signup;

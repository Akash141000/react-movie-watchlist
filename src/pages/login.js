import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

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
const initialStoreState = {
  isAuthenticated: false,
};

const Login = () => {
  const history = useHistory();
  const storeState = useSelector(
    (state = initialStoreState) => state.isAuthenticated
  );
  const dispatch = useDispatch();
  const [responseData, setResponse] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  const [formState, formStateDispatch] = useReducer(loginReducer, initialState);
  const inputFields = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("Username is required"),
    password: yup
      .string("Enter your password")
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

  useEffect(() => {
    if (!isLoading && !error) {
      localStorage.setItem("token", responseData.token);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      dispatch({ type: "AUTHENTICATION", val: true });
      history.push("/movies");
    }
  }, [isLoading, error]);

  return Form;
};
export default Login;

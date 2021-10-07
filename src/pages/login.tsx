import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
import * as yup from "yup";
import { SchemaOf, object, string } from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import FormLayout from "../layout/formLayout";
import { formFieldsObj } from "../util/types";
import { initialStoreState } from "../store/store";

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
  const history = useHistory();
  const storeState = useSelector<initialStoreState,boolean>(
    (state) => state.isAuthenticated
  );
  const dispatch = useDispatch();
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

  return <FormLayout heading="Login">{Form}</FormLayout>;
};
export default Login;

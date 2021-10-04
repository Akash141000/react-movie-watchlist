import { useEffect, useReducer, useState } from "react";
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";

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
  const [response, setResponse] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  const [formState, formStateDispatch] = useReducer(loginReducer, initialState);
  const inputFields = {
    username: "",
    password: "",
  };

  const Form = useForm(inputFields, formStateDispatch);

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

  return Form;
};
export default Login;

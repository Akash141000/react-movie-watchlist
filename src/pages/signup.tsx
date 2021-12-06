import { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { SchemaOf, object, string } from "yup";

//
import useForm from "../hooks/use-form";
import useHttp from "../hooks/use-http";
//
import FormLayout from "../layout/formLayout";
import {
  formFieldsObj,
  formReducer,
  initialFormReducerState,
} from "../util/types";

const initialState: initialFormReducerState = {
  formData: null,
  hasError: false,
  submit:false,
};


const signupReducer = (state:initialFormReducerState, action:{type:formReducer,val:any}) => {
  if (action.type === formReducer.submit) {
    return {
      formData: action.val,
      hasError : false,
      submit:false,
    };
  }
  if(action.type === formReducer.error){
    return{
      formData:state.formData,
      hasError:action.val,
      submit:state.submit
    };
  }
  if(action.type === formReducer.isSubmitting){
    return{
      formData:null,
      hasError:false,
      submit:true,
    };
  }
  return state;
};

const Signup = () => {
  const history = useHistory();
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

  interface yupSchema {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const validationSchema: SchemaOf<yupSchema> = object({
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

  //useForm hook
  const Form = useForm(inputFields, validationSchema, formState,formStateDispatch);


  useEffect(() => {
    if (formState.formData !== null && !formState.submit) {
      sendResponse(
        "/postSignup",
        {
          method: "POST",
          body: formState.formData,
        },
        setResponseData
      );
      formStateDispatch({
        type:formReducer.isSubmitting,
        val:true,
      })
    }
  }, [formState]);

  useEffect(() => {
    if (!isLoading && !error) {
      history.push("/login");
    }else if(!isLoading && error){
      formStateDispatch({
        type:formReducer.error,
        val:true,
      })
      console.log("Error while signing up");
    }
  }, [isLoading, error]);

  return <FormLayout heading="Signup">{Form}</FormLayout>;
};
export default Signup;

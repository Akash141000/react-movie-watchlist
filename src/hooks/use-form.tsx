import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import {
  formFieldsObj,
  formReducer,
  initialFormReducerState,
} from "../util/types";
import { SchemaOf } from "yup";
import { useEffect, useState } from "react";

const useForm = (
  fieldsObj: formFieldsObj,
  validationSchema: SchemaOf<any>,
  formState: initialFormReducerState,
  sendFormDataDispatch: any
) => {
  const [hasError, setError] = useState<boolean>(false);
  type field = {
    [index: string]: string;
  };
  const formFields: field = {};
  (function () {
    for (const key in fieldsObj) {
      formFields[key] = fieldsObj[key].initial;
    }
  })();

  useEffect(() => {
    if (formState.hasError) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [formState]);

  const formik = useFormik({
    initialValues: {
      ...formFields,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendFormDataDispatch({
        type: formReducer.submit,
        val: values,
      });
      formik.resetForm();
    },
  });

  const fields: any[] = [];
  const FormFields = () => {
    for (const key in fieldsObj) {
      fields.push(
        <div key={key} style={{ margin: "1rem 0" }}>
          <TextField
            fullWidth
            id={key}
            type={fieldsObj[key].type}
            name={key}
            label={fieldsObj[key].label}
            value={formik.values[key]}
            onChange={formik.handleChange}
            error={formik.touched[key] && Boolean(formik.errors[key])}
            helperText={formik.touched[key] && formik.errors[key]}
          />
        </div>
      );
    }
    return [...fields];
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {FormFields()}
      <Button
        fullWidth
        color="primary"
        variant="outlined"
        type="submit"
        disabled={formik.isSubmitting}
      >
        Submit
      </Button>
      {hasError && (
        <div style={{ textAlign: "center", color: "red", margin: "0.5rem" }}>
          Bad credentials!
        </div>
      )}
    </form>
  );
};

export default useForm;

// Render Prop
import React from "react";
import { Formik, ErrorMessage, useFormik } from "formik";
import useHttp from "./use-http";
import { Button, TextField } from "@mui/material";

const useForm = (fieldsObj, validationSchema, sendFormDataDispatch) => {
  const formik = useFormik({
    initialValues: {
      ...fieldsObj,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendFormDataDispatch({
        type: "SUBMIT",
        val: values,
      });
    },
  });

  let fields = [];
  const FormFields = () => {
    for (const key in fieldsObj) {
      fields.push(
        <div key={key} style={{"margin":"1rem 0"}}>
          <TextField
          fullWidth
            id={key}
            type={key}
            name={key}
            label={key}
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
          <Button fullWidth  color="primary" variant="outlined" type="submit" disabled={formik.isSubmitting}>
            Submit
          </Button>
        </form>
  );
};

export default useForm;

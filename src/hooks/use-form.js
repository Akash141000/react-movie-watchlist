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
        <div key={key}>
          <TextField
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        {FormFields()}
        <Button color={"primary"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default useForm;

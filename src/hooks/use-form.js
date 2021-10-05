// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useHttp from "./use-http";

const useForm = (fieldsObj, sendFormDataDispatch) => {
  let fields = [];
  for (const key in fieldsObj) {
    fields.push(
      <div key={key}>
        <Field type={key} name={key} />
        <ErrorMessage name={key} component="div" />
      </div>
    );
  }
  return (
    <Formik
      initialValues={{ ...fieldsObj }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          sendFormDataDispatch({
            type: "SUBMIT",
            val: values,
          });
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {[...fields]}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default useForm;

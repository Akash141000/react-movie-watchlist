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

// <Formik
// initialValues={{ email: '', password: '' }}   //specify fields {...props.fields}
// validate={values => {
//   const errors = {};
//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//   ) {
//     errors.email = 'Invalid email address';
//   }
//   return errors;
// }}
// onSubmit={(values, { setSubmitting }) => {
//   setTimeout(() => {
//     alert(JSON.stringify(values, null, 2));
//     setSubmitting(false);
//   }, 400);
// }}
// >
// {({ isSubmitting }) => (
//   <Form>
//     <Field type="email" name="email" />
//     <ErrorMessage name="email" component="div" />
//     <Field type="password" name="password" />
//     <ErrorMessage name="password" component="div" />
//     <button type="submit" disabled={isSubmitting}>
//       Submit
//     </button>
//   </Form>
// )}
// </Formik>

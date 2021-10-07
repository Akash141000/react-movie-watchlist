// Render Prop
import React from "react";
import { Formik, ErrorMessage, useFormik } from "formik";
import useHttp from "./use-http";
import { Button, TextField } from "@mui/material";
import { formFieldsObj } from "../util/types";
import { SchemaOf } from "yup";

const useForm = (
  fieldsObj: formFieldsObj,
  validationSchema: SchemaOf<any>,
  sendFormDataDispatch: any ////////////////////////
) => {
  ///////////////
  type field = {
    [index: string]: string;
  };
  const formFields: field = {};
  const getFields = (fieldsObj: formFieldsObj): void => {
    for (const key in fieldsObj) {
      // const value = fieldsObj[key];
       formFields[key] = "";
      //formFields[key] = fieldsObj[key].initial;
    }
  };

  const formik = useFormik({
    initialValues: {
      ...formFields,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendFormDataDispatch({
        type: "SUBMIT",
        val: values,
      });
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
    </form>
  );
};

export default useForm;

// // Render Prop
// import React from "react";
// import { Formik, ErrorMessage, useFormik } from "formik";
// import useHttp from "./use-http";
// import { Button, TextField } from "@mui/material";

// const useForm = (fieldsObj, validationSchema, sendFormDataDispatch) => {
//   let fields = [];

//   const formik = useFormik({
//     initialValues: {
//       ...fieldsObj,
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       sendFormDataDispatch({
//         type: "SUBMIT",
//         val: values,
//       });
//     },
//   });

//   let fields = [];
//   const FormFields = () => {
//     for (const key in fieldsObj) {
//       fields.push(
//         <div key={key} style={{ margin: "1rem 0" }}>
//           <TextField
//             fullWidth
//             id={key}
//             type={key}
//             name={key}
//             label={key}
//             value={formik.values[key]}
//             onChange={formik.handleChange}
//             error={formik.touched[key] && Boolean(formik.errors[key])}
//             helperText={formik.touched[key] && formik.errors[key]}
//           />
//         </div>
//       );
//     }
//     return [...fields];
//   };

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       {FormFields()}
//       <Button
//         fullWidth
//         color="primary"
//         variant="outlined"
//         type="submit"
//         disabled={formik.isSubmitting}
//       >
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default useForm;

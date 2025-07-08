import React, { useState } from "react";
import { Formik, Form } from "formik";
import TextInput from "../lib/components/TextInput/TextInput.js";

// Simple validation logic
const validateFields = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.code) {
    errors.code = "Code is required";
  }

  return errors;
};

const FormikForm = () => {
  const [httpState, setHttpState] = useState({ loading: false });

  const defaultValues = {
    email: "",
    code: "",
  };

  
  return (
    <Formik
      initialValues={defaultValues}
      validate={validateFields}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={(values) => {
        setHttpState({ loading: true });
        console.log("Submitting:", values);

        setTimeout(() => {
          setHttpState({ loading: false });
          alert("Form submitted successfully");
        }, 1000);
      }}
    >
      {(formik) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          dirty,
          isSubmitting,
        } = formik;

        return (
          <Form>
            <div className="control-with-help">
              <TextInput
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                feedbackText={touched.email && errors.email}
                autoComplete="email"
                required
              />
            </div>

            <div className="control-with-help">
              <TextInput
                id="code"
                label="Code"
                name="code"
                value={values.code}
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={touched.code && !errors.code}
                feedbackText={touched.code && errors.code}
                required
              />
            </div>

            <div className="centered-controls">
              <button
                type="submit"
                className="btn btn-call-to-action btn-blue btn-icon-right"
                disabled={!dirty || !isValid || isSubmitting}
                aria-disabled={!dirty || !isValid || isSubmitting}
              >
                {httpState.loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikForm;

import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { string, ref } from "yup";
import { FormHelperText } from "@mui/material";
import authService from "./authService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function Signup() {

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username should not be empty"),
    email: Yup.string().email().required("email should not be empty"),
    age: Yup.number().min(18),
    password: string().required("Please enter a password")
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: string()
      .required("Please re-type your password")
      .oneOf([ref("password")], "Passwords does not match"),
  });

  const handleSubmit = async (values) => {

    const payload = {
      firstName: values.username,
      lastName: "test",
      email: values.email,
      roleId: 2,
      password: values.password,
    }
    await authService.Register(payload).then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        toast.success("Registered Successfully");
      } else {
        toast.error("Unable to Register");
      }
    });
  };

  return (
    <div>
      <ToastContainer />
      <br></br>
      <center><h2 className="headingwriting">Registeration</h2>
        <br></br>
        <Formik
          initialValues={{ username: "", email: "", age: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {({ values, errors, setFieldValue, handleBlur }) => {
            console.log(errors);
            return (
              <Form>
                <TextField
                  variant="standard"
                  id="outlined-required"
                  name="username"
                  label="Username"
                  error={errors.username}
                  value={values.username}
                  onChange={(e) => setFieldValue("username", e.target.value)}
                  onBlur={handleBlur}
                  style={{ color: "#213555", fontSize: "16px", margin: "2%", padding: "2%", width: "80%", borderColor: "#213555" }}
                />
                <FormHelperText error>
                  <ErrorMessage name="username" />
                </FormHelperText>
                <br />
                <TextField
                variant="standard"
                  id="outlined-required"
                  name="email"
                  label="Email"
                  error={errors.email}
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  style={{ color: "#213555", fontSize: "16px", margin: "2%", padding: "2%", width: "80%", borderColor: "#213555" }}
                />
                <FormHelperText error>
                  <ErrorMessage name="email" />
                </FormHelperText>
                <br />
                <TextField
                variant="standard"
                  id="outlined-required"
                  name="age"
                  label="Age"
                  error={errors.age}
                  value={values.age}
                  onChange={(e) => setFieldValue("age", e.target.value)}
                  style={{ color: "#213555", fontSize: "16px", margin: "2%", padding: "2%", width: "80%", borderColor: "#213555" }}
                />
                <FormHelperText error>
                  <ErrorMessage name="age" />
                </FormHelperText>
                <br />
                <TextField
                variant="standard"
                  id="outlined-password-input"
                  name="password"
                  label="Password"
                  error={errors.password}
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  style={{ color: "#213555", fontSize: "16px", margin: "2%", padding: "2%", width: "80%", borderColor: "#213555" }}
                />
                <FormHelperText error>
                  <ErrorMessage name="password" />
                </FormHelperText>
                <br />
                <TextField
                variant="standard"
                  id="outlined-password-input"
                  name="confirmPassword"
                  label="ConfirmPassword"
                  error={errors.confirmPassword}
                  value={values.confirmPassword}
                  onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  style={{ color: "#213555", fontSize: "16px", margin: "2%", padding: "2%", width: "80%", borderColor: "#213555" }}
                />
                <FormHelperText error>
                  <ErrorMessage name="confirmPassword" />
                </FormHelperText>
                <br />
                <Button variant="contained" type="submit" style={{ backgroundColor: "#213555", color: "#C5DFF8", fontSize: "18px", padding: "2%", margin: "2%", width: "80%" }}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </center>
    </div>
  );
}

export default Signup;

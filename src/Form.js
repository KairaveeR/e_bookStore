import { Button } from '@mui/material';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { string, ref } from "yup";
import { FormHelperText } from "@mui/material";
import authService from "./authService";
import { TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
//import Cookies from 'js-cookie';
import {AuthContext} from './context/authContext';

function Login({ onLoginSuccess }) {
const userContext= useContext(AuthContext);
  const Navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("email should not be empty"),
    password: string().required("Please enter a password")
      .min(8, "Password must have at least 8 characters"),

  });
  const [inputs, setInputs] = useState({});
  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    }
    await authService.Login(payload).then((response) => {
      if (response && response.status === 200) {
        toast.success("Login Successfully");
        userContext.setUser(response.data.result);
        console.log("data");
        onLoginSuccess();
      }
      else {
        toast.error("Unable to Login");
      }
    });
  };
  return (
    <div className="form">
      <br></br>
      <ToastContainer />
      <center><h2 className="headingwriting">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {({ values, errors, setFieldValue, handleBlur }) => {
            console.log(errors);
            return (
              <Form>
                <TextField
                  variant='standard'
                  name="email"
                  label="Email"
                  error={errors.email}
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  onBlur={handleBlur}
                  style={{ color: "#213555", fontSize: "16px", margin: "20px", padding: "20px", width: "80%", borderColor: "#213555", maxWidth: "500px", label: { fontSize: "20px" } }}
                />
                <FormHelperText error>
                  <ErrorMessage name="email" />
                </FormHelperText>
                <TextField
                  variant='standard'
                  id="outlined-password-input"
                  name="password"
                  label="Password"
                  error={errors.password}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  type="password"
                  style={{ color: "#213555", fontSize: "16px", margin: "20px", padding: "20px", width: "80%", borderColor: "#213555", maxWidth: "500px" }}
                />
                <FormHelperText error>
                  <ErrorMessage name="password" />
                </FormHelperText>

                <Button variant="contained" type="submit" style={{ backgroundColor: "#213555", color: "#C5DFF8", fontSize: "18px", padding: "30px", margin: "35px", width: "80%", maxWidth: "500px", maxHeight: "50px" }}>
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

export default Login;
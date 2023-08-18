import React, { useEffect, useState } from "react";
import productStyle from "./books_style";
import * as Yup from "yup";
import { materialCommonStyles } from "./materialCommonStyles";
import './App.css';
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import userService from "./user_Service";
import { Formik , ErrorMessage} from "formik";
import { FormHelperText } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";


const EditUser = () => {
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState();
  const classes = productStyle();
  const materialClasses = materialCommonStyles();
  const navigate = useNavigate();
  const initialValues = {
    id: 0,
    email: "",
    lastName: "",
    firstName: "",
    roleId: 3,
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (id) {
      getUserById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (user && roles.length) {
      const roleId = roles.find((role) => role.name === user?.role)?.id;
      setInitialValueState({
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        roleId,
        password: user.password,
      });
    }
  }, [user, roles]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    roleId: Yup.number().required("Role is required"),
  });

  const getRoles = () => {
    userService.getAllRoles().then((res) => {
      if (res) {
        setRoles(res);
      }
    });
  };

  const getUserById = () => {
    userService.getById(Number(id)).then((res) => {
      if (res) {
        setUser(res);
      }
    });
  };

  const onSubmit = (values) => {
    const updatedValue = {
      ...values,
      role: roles.find((r) => r.id === values.roleId).name,
    };
    userService
      .update(updatedValue)
      .then((res) => {
        if (res) {
          toast.success("Updated Successfully");
          navigate("/user");
        }
      })
      .catch((e) => toast.error(
        "Something went wrong , please try again"
      ));
  };
  return (
    <div className="div_bg">
      <div className="div_center">
      <div className="container">
      <ToastContainer/>
        <Typography variant="h1">Edit User</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="firstName"
                    label="First Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                  <ErrorMessage name="name" />
                </FormHelperText>
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="last-name"
                    name="lastName"
                    label="Last Name *"
                    value={values.lastName}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <FormHelperText error>
                  <ErrorMessage name="lastName" />
                </FormHelperText>
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    label="Email *"
                    value={values.email}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <FormHelperText error>
                  <ErrorMessage name="email" />
                </FormHelperText>
                </div>
                
                  <div className="form-col">
                    <FormControl
                      className="dropdown-wrapper"
                      variant="outlined"
                    >
                      <InputLabel htmlFor="select">Roles</InputLabel>
                      <Select
                        name="roleId"
                        id={"roleId"}
                        onChange={handleChange}
                        className={materialClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materialClasses.customSelect },
                        }}
                        value={values.roleId}
                      >
                        {roles.length > 0 &&
                          roles.map((role) => (
                            <MenuItem value={role.id} key={"name" + role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
              </div>
              <div className="btn">
                <div className="btn-wrapper">
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                >
                  Save
                </Button>
                </div>
                <div className="btn1"></div>
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      </div>
    </div>
  );
};

export default EditUser;

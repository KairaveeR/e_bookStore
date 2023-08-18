import React, { useEffect, useState } from "react";
import productStyle from "./books_style";
import * as Yup from "yup";
import { Typography, TextField, Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "./category_service";
import { Formik, ErrorMessage } from "formik";
import { FormHelperText } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { materialCommonStyles } from "./materialCommonStyles";
import './App.css';
const EditCategory = () => {
  const classes = productStyle();
  const navigate = useNavigate();
  const initialValues = { name: "" };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    categoryService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
      });
    });
  };

  const onSubmit = (values) => {
    categoryService
      .save(values)
      .then((res) => {
        toast.success("Category Updated Successfully");
        navigate("/category");
      })
      .catch((e) => toast.error("Something went wrong please try again"));
  };
  return (
    <div className='div_bg'>
      <div className="div_center">
        <div className="container">
          <ToastContainer />
          <Typography variant="h1">{id ? "Edit" : "Add"} Category</Typography>
          <Formik
            initialValues={initialValueState}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
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
                      name="name"
                      label="Category Name *"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{width:"600px" , marginLeft:"40%" , marginTop:"30%"}}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="name" />
                    </FormHelperText>
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
                  <div className="btn1">
                    <Button
                      className="pink-btn btn"
                      variant="contained"
                      type="button"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        navigate("/category");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>

                </div>
              
            </form>
          )}
        </Formik>
      </div>
    </div>
    </div >
  );
};

export default EditCategory;

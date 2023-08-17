import { Button } from '@mui/material';
import { Formik, Form } from "formik";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormHelperText } from "@mui/material";
import authService from "./authService";
import { TextField } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import useStyles from './style';


function Store() {
  const classes = useStyles();
  const [inputs, setInputs] = useState({});
  const handleSubmit = async (values) => {
    const payload = {
      keyword: values.book,
    }
    await authService.Search(payload).then((response) => {
      if (response && response.status === 200) {
        const bookData = response.data;
        const bookDetailsSpan = document.getElementById('bookDetails');
        const clear = document.getElementById('clear');
        if (bookData.result[0] == null) {
          toast.error("Unable to Find Book");
        }
        else {
          bookDetailsSpan.innerHTML = `Title: ${bookData.result[0].name}<br> Author: ${bookData.result[0].description}<br> Price: ${bookData.result[0].price}`;
          clear.style.display = "block";
        }
      }
      else {
        toast.error("Unable to Find Book");
      }
    });
    console.log(payload);
  };
  const clearSearch = () => {
    const bookDetailsSpan = document.getElementById('bookDetails');
    const clear = document.getElementById('clear');
    clear.style.display = "none";
    bookDetailsSpan.innerHTML = '';

  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="headingwriting">
          <ToastContainer />
          <center>
            <div className='form'>
              <Formik
                initialValues={{ book: "" }}
                onSubmit={(values) => handleSubmit(values)}>
                {({ values, errors, setFieldValue, handleBlur }) => {
                  return (
                    <Form>
                      <TextField
                        variant='standard'
                        name="book"
                        label="Sreach yout book here"
                        value={values.book}
                        onChange={(e) => setFieldValue("book", e.target.value)}
                        onBlur={handleBlur}
                        style={{ color: "#213555", fontSize: "16px", margin: "20px", padding: "20px", width: "80%", borderColor: "#213555", maxWidth: "500px", label: { fontSize: "20px" } }}
                      />
                      <Button variant="contained" type="submit" style={{ backgroundColor: "#213555", color: "#C5DFF8", fontSize: "18px", padding: "30px", margin: "35px", width: "80%", maxWidth: "500px", maxHeight: "50px" }}>
                        Submit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <IconButton id="clear" onClick={clearSearch} style={{ display: "none" }}>
                    <CloseIcon />
                  </IconButton>
            <div id="searchResults">
              <span id="bookDetails">
                <div className="btn-id">
                  
                </div>

              </span>
            </div>
          </center>
        </div >
      </header >
    </div >
  );
}

export default Store;

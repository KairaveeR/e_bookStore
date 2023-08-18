import React, { createContext, useContext, useState } from 'react';
import Login from './Form';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Home from './home';
import About from './About';
import Store from './Store';
import Blogs from './Blogs';
import NotFound from './Notfound';
import Signup from './Signup';
import User from './user';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './style';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AuthWrapper, { AuthContext } from './context/authContext';
import EditBook from './edit';
import EditUser from './edit_user';
import NotAuthorized from './notauthorized';
import Category from './category';
import EditCategory from './edit_category';
import Cookies from 'js-cookie';
import Cart from './cart';
import {CartWrapper} from './context/cartContext';
import './App.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,

};
function RoutesComponent() {
  const userContext = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const naviagte = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open_singup, setOpen_singup] = useState(false);
  const handleOpen_singup = () => setOpen_singup(true);
  const handleClose_singup = () => setOpen_singup(false);
  const navigate = useNavigate();
  const data = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(data || '{}');
  const handleLoginSuccess = () => {
    setOpen(false);
    navigate('/Store');
  };
  console.log("userInfo", userInfo.role);
  return (
    <>
      <div className="div_heading">
        <div className="div_one">
          <icon>
            <AutoStoriesIcon style={{ fontSize: 40, color: "#C5DFF8", backgroundColor: "#213555", marginLeft: "20px" , marginTop:"20px", marginBottom:"20px" }}></AutoStoriesIcon>
          </icon>
          <div className='div_logo'>E_Library</div>
        </div>

        <div className="div_two">
          {userInfo.email ?(
            <>
              
              <Link to="/About" style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '24px', padding: "10px", textDecoration: "none" }}>Books</Link>
              <Link to="/Store" style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '24px', padding: "10px", textDecoration: "none" }}>Search</Link>
              <Link to="/Blogs" style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '24px', padding: "10px", textDecoration: "none" }}>BookListing</Link>
              <Link to="/User" style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '24px', padding: "10px", textDecoration: "none" }}>User</Link>
              <Link to="/Category" style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '24px', padding: "10px", textDecoration: "none" }}>Category</Link>
              <Link to="/cart" style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '24px', padding: "10px", textDecoration: "none" }}>Cart</Link>
            </>
          ) :
          (
            <>
              <Button variant="text" onClick={handleOpen_singup} style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '18px', paddingLeft: "20px" }}> Signup </Button>
              <Button variant="text" onClick={handleOpen} style={{ color: "#C5DFF8", borderColor: "#C5DFF8", fontSize: '18px' }}> Login </Button>
            </>
          )
          }
          <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
          >
            <div className={classes.paper}>
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Login onLoginSuccess={handleLoginSuccess}></Login>
            </div>
          </Modal>
          <Modal
            open={open_singup}
            onClose={handleClose_singup}
            className={classes.modal}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
          >
            <div className={classes.signup_form}>
              <IconButton className={classes.closeButton} onClick={handleClose_singup}>
                <CloseIcon />
              </IconButton>
              <Signup></Signup>
            </div>
          </Modal>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/About" element={userInfo.role === "admin" ? <About /> :  <Navigate to="/notauthorized" />} />
        {/* <Route path="/Store" element={userInfo.email ? <Store /> : <>{Navigate("/login")}</> } /> */}
        <Route path="/Store" element={userInfo.email ? <Store /> : <Navigate to="//notauthorized" />} />
        <Route path="/Blogs" element={userInfo.email ? <Blogs /> : <Navigate to="//notauthorized" />}  />
        <Route path="*" element={<NotFound />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/User" element={<User />} />
        <Route path="/edit_book/:id" element= {<EditBook/>} />
        <Route path="/add_book" element={<EditBook/>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="/edit_user/:id" element={<EditUser />} />
        <Route path="/Category" element={<Category/>}/>
        <Route path="/edit_category/:id" element={<EditCategory/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/add_category" element={<EditCategory/>} />
      </Routes>
    </>
  )
}
function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <CartWrapper>
        <RoutesComponent />
        </CartWrapper>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;

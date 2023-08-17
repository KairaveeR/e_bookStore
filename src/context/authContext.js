import React , {  createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

const initialValues = {
    id:0,
    email:"",
    firstName:"",
    lastName:"",
    roleId:"",
    role:"",
    password:"",
};
const initialState = {
    setUser:() =>{},
    user: initialValues,
    signOut : () => {},
};
export const AuthContext = createContext(initialState);
const AuthWrapper = ({ children }) => {
    const [userData , setUserData] = useState(initialValues);
    const navigate = useNavigate();
    const setUser = (data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));
       // console.log("datadaa", data);
        //Cookies.set("userInfo", JSON.stringify(data));
        setUserData(data);
    };
    const signOut=() => {
        //Cookies.remove("userInfo");
        localStorage.removeItem("userInfo");
        setUserData(initialValues);
        navigate("/Login");
    };
    let value = {
        setUser,
        user:userData,
        signOut,
    };
    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};
export default AuthWrapper;
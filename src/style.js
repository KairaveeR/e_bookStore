
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: "20vw",
        height: "30vh",
        minHeight: "500px",
        maxHeight: "700px",
        minWidth: "400px",
        maxWidth: "700px",
        backgroundColor: "#C5DFF8",
        border: '2px solid #213555',
        boxShadow: "5px 10px 18px #213555",
        padding: theme.spacing(2, 4, 3),
        margin: "2%",
    },
    closeButton: {
        float: 'right',
        position: 'absolute', // Position the IconButton absolutely
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    signup_form: {
        alignContent: "center",
        justifyContent: "center",
        position: 'absolute',
        width: "30vw",
        height: "50vh",
        minHeight: "300px",
        maxHeight: "600px",
        minWidth: "400px",
        maxWidth: "700px",
        backgroundColor: "#C5DFF8",
        border: '2px solid #213555',
        boxShadow: "5px 10px 18px #213555",
        padding: theme.spacing(2, 4, 3),
        margin: "2%",
        overflow: "scroll",
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        }
    },
}));

export default useStyles;
import { createTheme} from '@mui/material/styles';
import {Color} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main:"#ffffff",
        },
        secondary: {
            main:"#008080",
        },
        typography: {
            htmlFontSize: 40,
        },
        
    },
});

export default theme;
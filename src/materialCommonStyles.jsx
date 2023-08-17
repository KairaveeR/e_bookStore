import { makeStyles } from "@material-ui/core/styles";
import flagImage from "./assets/images/flag-dropdown.png";
const materialCommonStyles = makeStyles((theme) => ({
  customSelect: {
    "& .MuiSvgIcon-root": {
      opacity: "0",
    },
    "& .MuiSelect-root": {
      paddingRight: "30px !important",
      "&:after": {
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        content: " '' ",
        width: "15px",
        height: "15px",
        backgroundImage: "url(" + flagImage + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "10px",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor:"#213555",
      borderRadius: "4px",
    },
    "& li": {
      fontSize: "16px",
      padding: "10px 15px",
      backgroundColor: "transparent !important",
      "&:hover": {
        color: "#213555",
        backgroundColor: "rgba(241,77,84,0.1) !important",
      },
      "&.MuiListItem-root.Mui-focusVisible": {
        backgroundColor: "transparent",
      },
      "&.Mui-disabled": {
        display: "none",
      },

      "&.Mui-selected, &.Mui-selected:hover": {},
      "& .MuiListItemText-root .MuiTypography-body1": {
        fontSize: "16px",
        lineHeight: "1.3",
      },
    },
  },
}));

export { materialCommonStyles };
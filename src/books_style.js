import { makeStyles } from "@material-ui/core/styles";

const productStyle = makeStyles((theme) => ({
  productWrapper: {
    padding: "42px 0 80px",
    "@media (max-width: 991px)": {
      padding: "35px 0 50px",
    },
    "@media (max-width: 767px)": {
      padding: "35px 0 40px",
    },
    "& .btn-wrapper": {
      textAlign: "right",
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "10px",
      "& .btn": {
        height: "40px",
        lineHeight: "40px",
        minWidth: "100px",
        marginLeft: "10px",
        padding: "20px",
        fontSize: "14px",
      },
      "& .MuiFormControl-fullWidth": {
        maxWidth: "300px",
      },
    },
    "& .MuiTable-root": {
      "@media (max-width: 991px)": {
        width: "900px",
        overflow: "auto",
      },
      "& .MuiTableBody-root": {
        "& .MuiTableRow-root": {
          "& .MuiTableCell-root": {
            color: "#213555",
            fontSize: "14px",
          },
        },
      },
      "& .MuiTableCell-body": {
        color: "#213555",
        fontSize: "14px",
        alignItems: "center",
        justifyContent: "center",
      },
      "& .MuiTableBody-root": {
        "& .MuiTableRow-root": {
          "&:nth-child(odd)": {
            "&. MuiTableCell-body": {
            backgroundColor: "#d0f2ff",
            }
          }
        }
      },
      "& .MuiTable-root": {
        color: "#213555",
        fontSize: "14px",
      },
      "& .MuiTableBody-root": {
        color: "#213555",
        fontSize: "14px",
      },
      "& .MuiTableBody-root": {
        "& .MuiTableRow-root": {
          "& .MuiTableCell-root": {
            "&:last-child": {
              paddingRight: "0",
              textAlign: "center",
            },
          },
        },
      },
      "& .green-btn": {
        padding: "20px",
        height: "30px",
        lineHeight: "30px",
        minWidth: "80px",
        fontSize: "14px",
        backgroundColor: "transparent",
        textTransform: "capitalize",
        color: "#213555",
        border: "1px solid #80BF32",
        "&:hover": {
          backgroundColor: "#C5DFF8",
          color: "#ffffff",
        },
      },
      "& .pink-btn": {
        height: "30px",
        lineHeight: "30px",
        minWidth: "80px",
        fontSize: "14px",
        backgroundColor: "transparent",
        color: "#213555",
        border: "1px solid #f14d54",
        borderRadius: "4px",
        padding: "20px",
        margin: "20px",
        "&:hover": {
          backgroundColor: "#C5DFF8",
          color: "#ffffff",
        },
      },
    },
    "& .MuiTablePagination-root": {
      marginTop: "20px",
      "& .MuiTablePagination-toolbar": {
        paddingRight: "20px",
        "@media (max-width: 991px)": {
          padding: "0",
        },
        "@media (max-width: 374px)": {
          flexWrap: "wrap",
          justifyContent: "center",
        },
        "& .MuiSelect-selectMenu": {
          height: "40px",
          paddingRight: "25px !important",
          display: "flex",
          alignItems: "center",
        },
        "& .MuiSelect-nativeInput": {
          top: "0",
        },
        "& .MuiIconButton-root": {
          "@media (max-width: 574px)": {
            padding: "8px",
          },
          "@media (max-width: 374px)": {
            marginLeft: "0px",
            marginTop: "10px",
          },
        },
        "& .MuiTablePagination-actions": {
          "@media (max-width: 574px)": {
            marginLeft: "8px",
          },
        },
      },
    },
  },
}));

export default productStyle;
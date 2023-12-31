import React, { useEffect, useState } from "react";
import productStyle from "./books_style";
import { useNavigate } from "react-router-dom";
import { Typography, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import userService from "./user_Service";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const User = () => {
  const classes = productStyle();
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 5,
    keyword: "",
  };
  const RecordsPerPage = [2, 5, 10, 100];
  const [filters, setFilters] = useState(defaultFilter);
  const [userList, setUserList] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      getAllUsers({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const getAllUsers = async (filters) => {
    await userService.getAllUsers(filters).then((res) => {
      if (res) {
        setUserList(res);
      }
    });
  };

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 100 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "roleName",
      label: "Role",
      minWidth: 130,
    },
  ];

  const onConfirmDelete = async () => {
    await userService
      .deleteUser(selectedId)
      .then((res) => {
        if (res) {
          toast.success("Deleted Successfully");
          setOpen(false);
          setFilters({ ...filters });
        }
      })
      .catch((e) => toast.error("Something went wrong please try again"));
  };

  return (
    <div className={classes.productWrapper}>
      <div className="container">
        <Typography variant="h1">User</Typography>
        <div className="btn-wrapper">
          <TextField
            id="text"
            name="text"
            placeholder="Search..."
            variant="outlined"
            inputProps={{ className: "small" }}
            onChange={(e) => {
              setFilters({ ...filters, keyword: e.target.value, pageIndex: 1 });
            }}
          />
        </div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList?.items?.map((row, index) => (
                <TableRow key={`${index}-${row.id}-${row.email}`}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      className="green-btn btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        navigate(`/edit_user/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="btn pink-btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        setOpen(true);
                        setSelectedId(row.id ?? 0);
                      }}
                    >
                      Delete
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
              {!userList?.items?.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Users
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={RecordsPerPage}
          component="div"
          count={userList?.totalItems || 0}
          rowsPerPage={filters.pageSize || 0}
          page={filters.pageIndex - 1}
          onPageChange={(e, newPage) => {
            setFilters({ ...filters, pageIndex: newPage + 1 });
          }}
          onRowsPerPageChange={(e) => {
            setFilters({
              ...filters,
              pageIndex: 1,
              pageSize: Number(e.target.value),
            });
          }}
        />

        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="cancel-popup"
        >
          <DialogTitle id="alert-dialog-title">Delete book</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this book?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="btn pink-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirmDelete();
              }}
              autoFocus
              className="btn green-btn"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default User;

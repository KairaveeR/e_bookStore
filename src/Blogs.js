import React, { useState, useEffect, useMemo } from "react";
import productStyle from "./books_style";
import { toast , ToastContainer } from "react-toastify";
import './App.css';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
// import { useAuthContext } from "../../context/auth";
import { materialCommonStyles } from "./materialCommonStyles";
//import { defaultFilter } from "./book_Service";
import { useCartContext } from "./context/cartContext";
import categoryService from "./category_service";
import bookService from "./book_Service";
import shared from "./shared";

const Blogs = () => {
  const data = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(data || '{}');
  const [book, setBooks] = useState({
    pageIndex: 0,
    pageSize: 5,
    totalPages: 1,
    item: [],
    totalItems: 0,
  });
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 5,
    keyword: "",
  };
  const cartContext = useCartContext();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(defaultFilter);
  const classes = productStyle();
  const [sortBy, setSortBy] = useState("a-z");
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 5,
    totalPages: 5,
    items: [],  // <-- Here it's "item" not "items"
    totalItems: 0,
  });
  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  const addToCart = (book) => {
    shared.addToCart(book, userInfo.id).then((res) => {
      if (res.error) {
        toast.error("something went wrong");
      } else {
        toast.success("Item added in cart");
        cartContext.updateCart();
      }
    });
  };

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };
  console.log("BOOKS", books);

  return (
    <div className="div_bg">
      <div className="header_div">
        <ToastContainer />
        <center><Typography variant="h3">Book Listing</Typography></center>
      </div>
      <div className="container_div">
        <div className="first_half">
          <Typography variant="h4">
            Total
            <span> - {bookResponse.totalItems} items</span>
          </Typography>
        </div>
        <div className="second_label">
          <TextField
            id="text"
            className="dropdown-wrapper"
            name="text"
            placeholder="Search..."
            variant="standard"
            inputProps={{ style:{color:"#213555"} }}
            onChange={(e) => {
              setFilters({
                ...filters,
                keyword: e.target.value,
                pageIndex: 1,
              });
            }}
          />
        </div>

        <div className="label_div">
          <h3 htmlFor="select">
            Sort by
          </h3>
        </div>
        <div className="select_com">
          <Select
            className={classes.customSelect}
            MenuProps={{
              classes: { paper: classes.customSelect },
            }}
            onChange={sortBooks}
            value={sortBy}
          >
            <MenuItem value="a-z">a-z</MenuItem>
            <MenuItem value="z-a">z-a</MenuItem>
          </Select>
        </div>

      </div>
      <div className="inner-wrapper">
        <div className="product-list-inner-wrapper">
          {books.map((book, index) => (
            <div className="product-list" key={index}>
              <em>
                <img
                  className="bookImage"
                  src={book.base64image}
                  alt="dummyimage"
                />
              </em>
              <h4 className="bookTitle">{book.name}</h4>
              <p className="bookDescription">{book.category}</p>
              <p className="bookDescription">{book.description}</p>
              <p className="bookDescription">MRP &#8377; {book.price}</p>
              <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
                      <span
                        className="MuiButton-label"
                        onClick={() => addToCart(book)}
                      >
                        ADD TO CART
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
            </div>
          ))}
          {/* <Button variant="contained" color="primary" onClick={submitHandler}>Submit</Button> */}
        </div>
      </div>
      <div className="pagination-wrapper">
        <Pagination
          count={bookResponse.totalPages}
          page={filters.pageIndex}
          onChange={(e, newPage) => {
            setFilters({ ...filters, pageIndex: newPage });
          }}
        />
      </div>
    </div>
  );
};

export default Blogs;
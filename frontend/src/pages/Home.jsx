// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useSnackbar } from "notistack";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    fetch("https://book-store-hudq.onrender.com/books")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setBooks(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        enqueueSnackbar("Error", { variant: "error" });
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="p-4 bg-[url('./assets/bg_img.jpg')] bg-no-repeat bg-cover">
      <div className="flex justify-center items-center gap-x-4">
        
        <button
          className=" font-medium bg-gradient-to-r from-sky-200 to-blue-200 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
        <button
          className=" font-medium bg-gradient-to-r from-sky-200 to-blue-200 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
      </div>
      <div className="flex justify-evenly items-center">
        <h1 className="text-3xl italic font-bold my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;

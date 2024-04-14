// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    fetch(`https://book-store-hudq.onrender.com/books/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.error(error);
      });
  };
  
  return (
    <div className=" Showbook p-4 grid justify-items-stretch... bg-[url('./assets/delbk3.jpeg')] bg-no-repeat bg-cover bg-center">
      <BackButton />
      <h1 className="text-3xl my-4 italic font-bold text-center">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col justify-self-center items-center  w-[600px] p-8 mx-auto ">
        <h3 className="text-2xl  m-4">Are you sure?</h3>
        <button className="p-4 bg-red-600" onClick={handleDeleteBook}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;

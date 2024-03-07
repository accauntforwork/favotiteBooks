import React, { useEffect, useRef, useState } from "react";
import bookimage from "../../../public/book.jpg";
import deleteIcon from "../../../public/delete-bin-7-line.svg";

function Home() {
  const nameRef = useRef();
  const categoryRef = useRef();
  const authorRef = useRef();
  const ratingRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  const [books, setBooks] = useState([]);

  function handleClick() {
    const newBook = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      author: authorRef.current.value,
      rating: ratingRef.current.value,
      about: aboutRef.current.value,
    };

    const newBooks = [...books, newBook];

    localStorage.setItem("books", JSON.stringify(newBooks));

    setBooks(newBooks);

    nameRef.current.value = "";
    categoryRef.current.value = "";
    authorRef.current.value = "";
    ratingRef.current.value = "";
    aboutRef.current.value = "";
  }

  function deleteBook(index) {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1); // Remove the book at the specified index

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  }
  return (
    <>
      <div className="rounded-xl bg-slate-800 text-[#FC4747] font-medium">
        <div className="flex items-center mb-8 gap-4 p-4">
          <input
            type="text"
            placeholder="Name"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-sky-500"
            ref={nameRef}
          />
          <input
            type="text"
            placeholder="Category"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-sky-500"
            ref={categoryRef}
          />
          <input
            type="text"
            placeholder="Author"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-sky-500"
            ref={authorRef}
          />
          <input
            type="text"
            placeholder="Rating"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-sky-500"
            ref={ratingRef}
          />
          <input
            type="text"
            placeholder="About"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-sky-500"
            ref={aboutRef}
          />
          <button className="btn btn-success w-40" onClick={handleClick}>
            Add
          </button>
        </div>
        <div className="my-6 border-2 border-indigo-600 rounded-lg p-6 flex gap-10 flex-wrap justify-center ">
          {books.map((item, index) => (
            <div key={index} className="card w-80 bg-base-100 shadow-xl">
              <figure>
                <img className="h-48 w-80" src={bookimage} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.name}
                  <div className="rounded-lg px-2 badge-secondary">
                    {item.category}
                  </div>
                </h2>
                <p>{item.about}</p>
                <div className="flex justify-between">
                  <img
                    className="w-8 cursor-pointer"
                    src={deleteIcon}
                    alt=""
                    onClick={() => deleteBook(index)}
                  />
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline bg-orange-500 text-white text-lg px-2 py-4">
                      {item.author}
                    </div>
                    <div className="badge badge-outline bg-orange-500 text-white text-lg px-2 py-4">
                      {item.rating} &#11088;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

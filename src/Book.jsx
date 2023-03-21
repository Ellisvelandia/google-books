import React, { useEffect, useState } from "react";
import "./App.css";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (bookInfo) => {
    setSelectedBook(bookInfo);
  };

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${
    import.meta.env.VITE_APP_PUBLIC_KEY
  }`;

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setBooks(data.items);
    };
    getBooks();
  }, []);

  return (
    <article className="my-2 min-h-screen grid place-content-center w-full bg-[#efefef]">
      <h2 className="text-center tracking-widest font-bold text-xl my-5">
        Books
      </h2>
      <div className="max-w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-1 shadow rounded text-center lg:max-w-7xl bg-white">
        {books.map((book, i) => (
          <div
            className="m-2 p-2 shadow-2xl my-3 rounded lg:w-[300px] w-auto h-auto grid place-content-center"
            key={i}
          >
            <h2 className="mb-2 font-semibold text-base ">
              {book.volumeInfo.title}
            </h2>
            <hr className="h-2 my-2" />
            <div className="relative h-full w-full">
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="blur-sm hover:blur-0 transition-all ease-in-out duration-150 object-fill flex bg-center my-0 mx-auto w-[300px] h-[300px] border-solid border border-[#000]"
                onClick={() => handleBookClick(book.volumeInfo)}
              />
              <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
                alt={book.volumeInfo.title}
                className="absolute left-1 bottom-0 object-fill w-24 h-24 flex bg-center my-0 mx-auto border-solid border border-[#000] shadow-3xl"
              />
            </div>
            <h3 className="text-sm my-2">authors-{book.volumeInfo.authors}</h3>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="fixed top-0 lef-0 h-full bg-[rgba(0,0,0,0.8)] w-full z-50">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block  object-fill bg-black text-white p-8 text-center">
            <h2 className="mb-2 font-semibold text-base ">
              {selectedBook.title}
            </h2>
            <hr className="h-2 my-2" />
            <img
              src={selectedBook.imageLinks.thumbnail}
              alt={selectedBook.title}
              className="object-fill flex bg-center my-0 mx-auto w-[300px] h-[300px] border-solid border border-[#000]"
            />
            <h3 className="text-sm my-2">authors-{selectedBook.authors}</h3>
            <hr className="h-2 my-2" />
            <p className="text-[11px] text-justify">
              {selectedBook.description
                ? selectedBook.description
                : "There is not description"}
            </p>
            <button
              className="text-4xl p-3 text-white absolute top-0 right-1"
              onClick={() => setSelectedBook(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default Book;

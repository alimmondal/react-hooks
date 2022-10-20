import React, { useReducer, useState } from "react";
import { reducer } from "./reducer";

const booksData = [
  { id: 1, name: "pather pachali" },
  { id: 2, name: "padma nadir maji" },
  { id: 3, name: "Shrikantha" },
];

const Modal = ({ modalText }) => {
  return <p>{modalText}</p>;
};

function UseReducer() {
  const [bookState, dispatch] = useReducer(reducer, {
    books: booksData,
    isModalOpen: false,
    modalText: "",
  });

  const [bookName, setBookName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { id: new Date().getTime().toString(), name: bookName };
    dispatch({ type: "ADD", payload: newBook });

    setBookName(" ");
  };

  const removeBook = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  return (
    <div>
      <h2>Book List</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setBookName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {bookState.isModalOpen && <Modal modalText={bookState.modalText} />}

      {bookState.books.map((book, i) => {
        const { id, name } = book;
        return (
          <li key={i}>
            {name} <button onClick={() => removeBook(id)}>remove</button>
          </li>
        );
      })}
    </div>
  );
}

export default UseReducer;

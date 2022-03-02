import React from "react";

// Creating a component that will represent each square on my board.
const Square = ({ value, onClick }) => {
  return (
    <>
      <button className={`square ${value}`} onClick={onClick}>
        {value}
      </button>
    </>
  );
};

export default Square;

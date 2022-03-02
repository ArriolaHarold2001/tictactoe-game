import React from "react";

// Component for the reset button
const ResetButton = ({ reset }) => {
  return (
    <>
      <button className="reset--button" onClick={reset}>
        Reset Game!
      </button>
    </>
  );
};

export default ResetButton;

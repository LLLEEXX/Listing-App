import React, { useState } from "react";
import "../../assets/BuyAndSell.css";

const RentalButtons = ({ setSelectedTerm }) => {
  const [selectedButton, setSelectedButton] = useState("Long term");

  const handleButtonClick = (rentalType) => {
    setSelectedButton(rentalType);
    setSelectedTerm(rentalType);
  };

  return (
    <div className="button-container">
      <button
        onClick={() => handleButtonClick("Long term")}
        className={`rental-button ${selectedButton === "Long term" ? "active" : ""}`}
        style={{
          borderRadius: "15px 0 0 15px",
        }}
      >
        Long term
      </button>
      <button
        onClick={() => handleButtonClick("Short term")}
        className={`rental-button ${selectedButton === "Short term" ? "active" : ""}`}
      >
        Short term
      </button>
      <button
        onClick={() => handleButtonClick("Daily Rentals")}
        className={`rental-button ${selectedButton === "Daily Rentals" ? "active" : ""}`}
        style={{
          borderRadius: "0 15px 15px 0",
        }}
      >
        Daily Rentals
      </button>
    </div>
  );
};

export default RentalButtons;

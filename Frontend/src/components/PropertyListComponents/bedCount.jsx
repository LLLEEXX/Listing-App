import React, { useState } from "react";
import "../../assets/BuyAndSell.css";

const BedCountRadio = () => {
  const [selectedOption, setSelectedOption] = useState("any"); // Default selected option

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const options = ["any", "1", "2", "3", "4", "5", "6+"];

  return (
    <div className="bedroom-count-group">
      {options.map((option) => (
        <label key={option} className="bedroom-count-label">
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
            className="bedroom-radio"
          />
          <span className="spanButton">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default BedCountRadio;


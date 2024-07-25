import React from "react";
import { Button } from "react-bootstrap";

const ArrangeButtons = ({ selectedListingStatus, setSelectedListingStatus }) => {
  const handleButtonClick = (listingStatus) => {
    console.log("Listing status changed to:", listingStatus);
    setSelectedListingStatus(listingStatus);
  };

  return (
    <div>
      <Button
        variant="text"
        style={{
          fontWeight: selectedListingStatus === "For Rent" ? "bold" : "normal",
          fontSize: selectedListingStatus === "For Rent" ? "1.2em" : "1em",
        }}
        onClick={() => handleButtonClick("For Rent")}
      >
        For Rent
      </Button>
      <Button
        variant="text"
        style={{
          fontWeight: selectedListingStatus === "For Sale" ? "bold" : "normal",
          fontSize: selectedListingStatus === "For Sale" ? "1.2em" : "1em",
        }}
        onClick={() => handleButtonClick("For Sale")}
      >
        For Sale
      </Button>
    </div>
  );
};

export default ArrangeButtons;

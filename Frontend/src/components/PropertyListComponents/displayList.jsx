import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../../assets/BuyAndSell.css";
import PriceRangeSlider from "./priceSlider";
import RentalButtons from "./filterButton";
import CardExplorer from "./cardExplorer";
import FurnishFilter from "./furnishFilter";
import BedCountRadio from "./bedCount";
import PriceRangeSliderDaily from "./priceSliderDaily";
import RadioTileGroup from "./propertyFilter";
import { Modal, ModalDialog, ModalClose, Typography } from "@mui/joy";

const DisplayList = () => {
  const [open, setOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("Long term");
  const [selectedListingStatus, setSelectedListingStatus] =
    useState("For Rent"); // Define selectedListingStatus state

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data or perform necessary actions
  };

  const handleClearAll = () => {
    setSelectedTerm("Long term"); // Resetting the selected term
  };

  return (
    <>
      <main className="Main-wrapper">
        <section className=" d-flex flex-row flex-wrap gap-5 justify-content-center exploreBody">
          <CardExplorer
            selectedListingStatus={selectedListingStatus}
            setSelectedListingStatus={setSelectedListingStatus}
          />
        </section>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <ModalClose />
            <section className="customCheckCont">
              <Form onSubmit={handleSubmit}>
                <div className="filterSection">
                  <div className="rentalTermDiv">
                    <section className="titleHolder">
                      <p className="filterTitle">Rental Term</p>
                      <p className="filterTitleDes">
                        Select the rental term that aligns with your
                        requirements
                      </p>
                    </section>
                    <RentalButtons setSelectedTerm={setSelectedTerm} />
                  </div>
                  <div className="rentalRateDiv">
                    <p className="filterTitle">Rental Rate</p>
                    {/* Conditionally render PriceRangeSlider or PriceRangeSliderDaily */}
                    {selectedTerm === "Long term" ||
                    selectedTerm === "Short term" ? (
                      <PriceRangeSlider />
                    ) : (
                      <PriceRangeSliderDaily />
                    )}
                  </div>
                  <div className="rentalFurnishDiv">
                    {selectedTerm === "Long term" && (
                      <>
                        <p className="filterTitle">Furnishing</p>
                        <FurnishFilter />
                      </>
                    )}
                  </div>
                  <div className="rentalFurnishDiv">
                    {selectedTerm === "Long term" && (
                      <>
                        <p className="filterTitle">Property Type</p>
                        <RadioTileGroup />
                      </>
                    )}
                  </div>

                  <div className="rentalBedCountDiv">
                    {selectedTerm === "Long term" ||
                    selectedTerm === "Short term" ? (
                      <>
                        <p className="filterTitle">Bedrooms</p>
                        <BedCountRadio />
                      </>
                    ) : null}
                  </div>
                  <br></br>
                  <br></br>
                </div>

                <div className="d-flex justify-content-between modalBtnCont">
                  <button className="filterbtnClear" onClick={handleClearAll}>
                    <span className="filterSpanClear">CLEAR ALL</span>
                  </button>
                  <button type="submit" className="filterbtnSubmit">
                    <span className="filterSpanSubmit">Show 2032 result</span>
                  </button>
                </div>
              </Form>
            </section>
          </ModalDialog>
        </Modal>
      </main>
    </>
  );
};
export default DisplayList;

import React, { useState } from "react";
import "../../assets/BuyAndSell.css";

function CheckboxTileGroup() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const option = event.target.value;
    const isChecked = event.target.checked;

    // Update the selected options based on checkbox changes
    if (isChecked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    }
  };

  return (
    <div className="Radio-container">
      <div className="radio-tile-group">
        <div className="input-container">
          <input
            id="condo"
            className="radio-button"
            type="checkbox"
            name="condo"
            value="condo"
            checked={selectedOptions.includes("condo")}
            onChange={handleCheckboxChange}
          />
          <div className="radio-tile">
            <div className="icon condo-icon">
              <svg
                fill="#000000"
                height="18"
                viewBox="0 0 18 18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
                <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
              </svg>
            </div>
            <label htmlFor="condo" className="radio-tile-label">
              Apartment Condo
            </label>
          </div>
        </div>

        <div className="input-container">
          <input
            id="house"
            className="radio-button"
            type="checkbox"
            name="house"
            value="house"
            checked={selectedOptions.includes("house")}
            onChange={handleCheckboxChange}
          />
          <div className="radio-tile">
            <div className="icon house-icon">
              <svg
                fill="#000000"
                height="18"
                viewBox="0 0 18 18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
              </svg>
            </div>
            <label htmlFor="house" className="radio-tile-label">
              House
            </label>
          </div>
        </div>

        <div className="input-container">
          <input
            id="lot"
            className="radio-button"
            type="checkbox"
            name="lot"
            value="lot"
            checked={selectedOptions.includes("lot")}
            onChange={handleCheckboxChange}
          />
          <div className="radio-tile">
            <div className="icon lot-icon">
              <svg
                fill="#000000"
                height="18"
                viewBox="0 0 18 18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z" />
              </svg>
            </div>
            <label htmlFor="lot" className="radio-tile-label">
              Lot
            </label>
          </div>
        </div>

        <div className="input-container">
          <input
            id="office"
            className="radio-button"
            type="checkbox"
            name="office"
            value="office"
            checked={selectedOptions.includes("office")}
            onChange={handleCheckboxChange}
          />
          <div className="radio-tile">
            <div className="icon office-icon">
              <svg
                fill="#000000"
                height="18"
                viewBox="0 0 18 18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
              </svg>
            </div>
            <label htmlFor="office" className="radio-tile-label">
              Office
            </label>
          </div>
        </div>

        <div className="input-container">
          <input
            id="warehouse"
            className="radio-button"
            type="checkbox"
            name="warehouse"
            value="warehouse"
            checked={selectedOptions.includes("warehouse")}
            onChange={handleCheckboxChange}
          />
          <div className="radio-tile">
            <div className="icon warehouse-icon">
              <svg
                fill="#000000"
                height="18"
                viewBox="0 0 18 18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1z" />
                <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.386 1.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
              </svg>
            </div>
            <label htmlFor="warehouse" className="radio-tile-label">
              WareHouse
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckboxTileGroup;

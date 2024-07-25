import React, { useState } from "react";
import { Range } from "react-range";
import "../../assets/BuyAndSell.css";

const PriceRangeSlider = () => {
  const [values, setValues] = useState([1000, 20000]); 

  return (
    <>
      <p className="filterTitleDes">Select monthly rate</p>
      <div className="con" style={{ width: "90%", margin: "0 auto" }}>
        <div
          style={{
            display: "block",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <output style={{ margin: "10px" }}>
            {values[0]} - {values[1]}
          </output>
          <Range
            step={10} // Step increment
            min={1000} // Updated minimum value
            max={20000} // Updated maximum value
            values={values} // Current values
            onChange={(newValues) => setValues(newValues)} // Function to handle value change
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#ccc",
                  borderRadius: "4px",
                }}
              >
                {/* New overlay element for black selected range */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${((values[0] - 1000) / 19000) * 100}%`, // Updated left edge calculation
                    width: `${((values[1] - values[0]) / 19000) * 100}%`, // Updated width calculation
                    height: "6px",
                    backgroundColor: "#000",
                    borderRadius: "0px",
                  }}
                />
                {/* Original track element with reduced opacity to show through overlay */}
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "23px",
                  width: "23px",
                  backgroundColor: "#fff", // Change thumb color to white
                  borderRadius: "50%",
                  outline: "none",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.6)", // Add shadow
                }}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default PriceRangeSlider;

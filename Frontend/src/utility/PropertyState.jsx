import { useState, useContext, createContext } from "react";

const PropertyContext = createContext();

export const usePropertyContext = () => {
  return useContext(PropertyContext);
};

export const PropertyProvider = ({ children }) => {
  const [propertyState, setPropertyState] = useState({
    PropType: {
      type: "",
    },
    buyCondo: {
      PropBuildingName: "",
      PropBaths: 0,
      PropBeds: 0,
      PropFurnish: "Fully Furnished",
      PropBalcony: "Balcony",
      PropParking: "Parking",
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      condo_errs: [],
      Actions: "buy",
    },
    buyHouseLot: {
      PropCommVill: "",
      PropBaths: 0,
      PropBeds: 0,
      PropCarGarage: "Garage",
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      houseLot_errs: [],
      Actions: "buy",
    },
    buyLot: {
      PropLotPref: "Regular Lot",
      PropLotUse: "Residential",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      lot_errs: [],
      Actions: "buy",
    },
    buyWareHouse: {
      PropPurpose: "",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      warehouse_errs: [],
      Actions: "buy",
    },
    buyCommSpace: {
      PropPurpose: "",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      commspace_errs: [],
      Actions: "buy",
    },
    buyOffice: {
      PropPurpose: "",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      office_errs: [],
      Actions: "buy",
    },
  });

  const [rentPropertyState, setRentPropertyState] = useState({
    PropType: {
      type: "",
    },
    rentCondo: {
      PropBuildingName: "",
      PropBaths: 0,
      PropBeds: 0,
      PropFurnish: "Fully Furnished",
      PropBalcony: "Balcony",
      PropParking: "Parking",
      PropMoveInDate: null,
      LengthOfStay: "2 years",
      Nationality: "",
      Occupants: 0,
      PetTypes: "Dog Allowed",
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      condo_errs: [],
      Actions: "rent",
    },
    rentHouseLot: {
      PropCommVill: "",
      PropLotArea: 0,
      PropFloorArea: 0,
      PropFurnish: "Fully Furnished",
      PropBalcony: "Balcony",
      PropCarGarage: "Garage",
      PropMoveInDate: null,
      LengthOfStay: "2 years",
      Nationality: "",
      Occupants: 0,
      PetTypes: "Dog Allowed",
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      houseLot_errs: [],
      Actions: "rent",
    },
    rentLot: {
      PropLotPref: "Regular Lot",
      PropLotUse: "Residential",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      lot_errs: [],
      Actions: "rent",
    },
    rentWareHouse: {
      PropPurpose: "",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      warehouse_errs: [],
      Actions: "rent",
    },
    rentCommSpace: {
      PropPurpose: "",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      commspace_errs: [],
      Actions: "rent",
    },
    rentOffice: {
      PropPurpose: "",
      PropSize: 0,
      PropFromRange: 1000,
      PropToRange: 1000000,
      PropCity: "Manila",
      PropNeigborhood: "",
      office_errs: [],
      Actions: "rent",
    },
  });

  return (
    <PropertyContext.Provider
      value={{
        propertyState,
        setPropertyState,
        rentPropertyState,
        setRentPropertyState,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

import { useState, useEffect } from "react";
import axios from "../../utility/axios";

import { useNavigate } from "react-router-dom";

import { Col, Carousel } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Box, Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pagination from "@mui/material/Pagination";

//CONTEXT
import { usePropertyContext } from "../../utility/PropertyState";

export default function ExploreRent() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //useState
  const { rentPropertyState } = usePropertyContext();
  const [rentData, setRentData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    switch (rentPropertyState.PropType.type) {
      case "rentCondo":
        const fetchCondo = async () => {
          try {
            const response = await axios.get(
              `/api/inq-rent-condo?PropBuildingName=${rentPropertyState.rentCondo.PropBuildingName}&PropBaths=${rentPropertyState.rentCondo.PropBaths}&PropBeds=${rentPropertyState.rentCondo.PropBeds}&
                    PropFurnish=${rentPropertyState.rentCondo.PropFurnish}&PropFromRange=${rentPropertyState.rentCondo.PropFromRange}&PropToRange=${rentPropertyState.rentCondo.PropToRange}
                    &PropCity=${rentPropertyState.rentCondo.PropCity}&PropBalcony=${rentPropertyState.rentCondo.PropBalcony}&PropParking=${rentPropertyState.rentCondo.PropParking}&page=${currentPage}`
            );
            setRentData(response.data);
          } catch (error) {
           //console.log(error);
          }
        };
        fetchCondo();
        break;

      case "rentHouseLot":
        const fetchHouseLot = async () => {
          try {
            const response = await axios.get(
              `/api/inq-rent-houselot?PropCarGarage=${rentPropertyState.rentHouseLot.PropCarGarage}&PropLotArea=${rentPropertyState.rentHouseLot.PropLotArea}
                &PropFloorArea=${rentPropertyState.rentHouseLot.PropFloorArea}&PropCommVill=${rentPropertyState.rentHouseLot.PropCommVill}&PropCity=${rentPropertyState.rentHouseLot.PropCity}
                &PropFromRange=${rentPropertyState.rentHouseLot.PropFromRange}&PropToRange=${rentPropertyState.rentHouseLot.PropToRange}&page=${currentPage}`
            );
            setRentData(response.data);
          } catch (error) {
           //console.log(error);
          }
        };
        fetchHouseLot();
        break;

      case "rentLot":
        const fetchLot = async () => {
          try {
            const response = await axios.get(
              `/api/inq-rent-lot?PropSize=${rentPropertyState.rentLot.PropSize}&PropFromRange=${rentPropertyState.rentLot.PropFromRange}&
                    PropToRange=${rentPropertyState.rentLot.PropToRange}&PropCity=${rentPropertyState.rentLot.PropCity}&page=${currentPage}`
            );
            setRentData(response.data);
          } catch (error) {
           //console.log(error);
          }
        };
        fetchLot();
        break;

      case "rentWareHouse":
        const fetchWareHouse = async () => {
          try {
            const response =
              await axios.get(`/api/inq-rent-warehouse?PropPurpose=${rentPropertyState.rentWareHouse.PropPurpose}&PropFromRange=${rentPropertyState.rentWareHouse.PropFromRange}&
                PropToRange=${rentPropertyState.rentWareHouse.PropToRange}&PropCity=${rentPropertyState.rentWareHouse.PropCity}&PropSize=${rentPropertyState.rentWareHouse.PropSize}&page=${currentPage}`);
            setRentData(response.data);
            console.log(response.data);
          } catch (error) {
           //console.log(error);
          }
        };
        fetchWareHouse();
        break;

      case "rentCommSpace":
        const fetchCommSpace = async () => {
          try {
            const response =
              await axios.get(`/api/inq-rent-commspace?PropPurpose=${rentPropertyState.rentCommSpace.PropPurpose}&PropFromRange=${rentPropertyState.rentCommSpace.PropFromRange}&
                PropToRange=${rentPropertyState.rentCommSpace.PropToRange}&PropCity=${rentPropertyState.rentCommSpace.PropCity}&PropSize=${rentPropertyState.rentCommSpace.PropSize}&page=${currentPage}`);
            setRentData(response.data);
            console.log(response.data);
          } catch (error) {
           //console.log(error);
          }
        };
        fetchCommSpace();
        break;

      case "rentOffice":
        const fetchOffice = async () => {
          try {
            const response =
              await axios.get(`/api/inq-rent-office?PropPurpose=${rentPropertyState.rentOffice.PropPurpose}&PropFromRange=${rentPropertyState.rentOffice.PropFromRange}&
                    PropToRange=${rentPropertyState.rentOffice.PropToRange}&PropCity=${rentPropertyState.rentOffice.PropCity}&PropSize=${rentPropertyState.rentOffice.PropSize}&page=${currentPage}`);
            setRentData(response.data);
            console.log(response.data);
          } catch (error) {
           //console.log(error);
          }
        };
        fetchOffice();
        break;

      default:
        handleGoBack();
        break;
    }
  }, [rentPropertyState.PropType.type, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
};
  return (
    <>
      <Box sx={{ mt: "5rem" }}>
        <Button onClick={handleGoBack}>
          <ArrowBackIcon /> Go back
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {rentData && rentData.data.length > 0 ? (
          rentData.data.map((property) => (
            <Col key={property.id} xs={12} md={3} className="mb-4">
              <div className="__area text-center">
                <div className="__card">
                  <Carousel interval={null}>
                    {property.images.map((image) => (
                      <Carousel.Item key={image.id}>
                        <img
                          src={`http://127.0.0.1:8000/storage/${image.path}`}
                          className="img-fluid __img"
                          alt="Property-Image"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div
                    className="__card_detail text-left"
                    onClick={() => navigate("/Viewing")}
                  >
                    <h5
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        minHeight: "22px",
                      }}
                    >
                      {property.PropTitle}
                    </h5>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                      }}
                    >
                      {property.PropAdd}
                    </p>
                    <div className="__type">
                      <span>
                        <Icon.Building /> {property.PropType}
                      </span>
                      <span className="newListingName">{property.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col> //PA LAGYAN NG DESIGN
          ))
        ) : (
          <div>No properties match your search criteria</div>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {rentData && rentData.data.length > 0 ? (
          <Pagination
            count={rentData.meta.last_page}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        ) : null}
      </Box>
    </>
  );
}

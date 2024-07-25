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

export default function ExploreBuy() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //useState
  const { propertyState } = usePropertyContext();

  const [buyData, setBuyData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //function
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    switch (propertyState.PropType.type) {
      case "buyCondo":
        const fetchCondo = async () => {
          try {
            const response = await axios.get(
              `/api/inq-condo?PropBuildingName=${propertyState.buyCondo.PropBuildingName}&PropBaths=${propertyState.buyCondo.PropBaths}&PropBeds=${propertyState.buyCondo.PropBeds}&
              PropFurnish=${propertyState.buyCondo.PropFurnish}&PropFromRange=${propertyState.buyCondo.PropFromRange}&PropToRange=${propertyState.buyCondo.PropToRange}
              &PropCity=${propertyState.buyCondo.PropCity}&PropBalcony=${propertyState.buyCondo.PropBalcony}&PropParking=${propertyState.buyCondo.PropParking}&page=${currentPage}`
            );
            setBuyData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchCondo();
        break;

      case "buyHouseLot":
        const fetchHouseLot = async () => {
          try {
            const response = await axios.get(
              `/api/inq-houselot?PropCarGarage=${propertyState.buyHouseLot.PropCarGarage}&PropBaths=${propertyState.buyHouseLot.PropBaths}
              &PropBeds=${propertyState.buyHouseLot.PropBeds}&PropCommVill=${propertyState.buyHouseLot.PropCommVill}&PropCity=${propertyState.buyHouseLot.PropCity}
              &PropFromRange=${propertyState.buyHouseLot.PropFromRange}&PropToRange=${propertyState.buyHouseLot.PropToRange}&page=${currentPage}`
            );
            setBuyData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchHouseLot();
        break;

      case "buyLot":
        const fetchLot = async () => {
          try {
            const response =
              await axios.get(`/api/inq-lot?PropSize=${propertyState.buyLot.PropSize}&PropFromRange=${propertyState.buyLot.PropFromRange}&
              PropToRange=${propertyState.buyLot.PropToRange}&PropCity=${propertyState.buyLot.PropCity}&page=${currentPage}`);
            setBuyData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLot();
        break;

      case "buyWareHouse":
        const fetchWareHouse = async () => {
          try {
            const response =
              await axios.get(`/api/inq-warehouse?PropPurpose=${propertyState.buyWareHouse.PropPurpose}&PropFromRange=${propertyState.buyWareHouse.PropFromRange}&
                PropToRange=${propertyState.buyWareHouse.PropToRange}&PropCity=${propertyState.buyWareHouse.PropCity}&PropSize=${propertyState.buyWareHouse.PropSize}&page=${currentPage}`);
            setBuyData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchWareHouse();
        break;

      case "buyCommSpace":
        const fetchCommSpace = async () => {
          try {
            const response =
              await axios.get(`/api/inq-commspace?PropPurpose=${propertyState.buyCommSpace.PropPurpose}&PropFromRange=${propertyState.buyCommSpace.PropFromRange}&
                PropToRange=${propertyState.buyCommSpace.PropToRange}&PropCity=${propertyState.buyCommSpace.PropCity}&PropSize=${propertyState.buyCommSpace.PropSize}&page=${currentPage}`);
            setBuyData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchCommSpace();
        break;

      case "buyOffice":
        const fetchOffice = async () => {
          try {
            const response =
              await axios.get(`/api/inq-office?PropPurpose=${propertyState.buyOffice.PropPurpose}&PropFromRange=${propertyState.buyOffice.PropFromRange}&
                PropToRange=${propertyState.buyOffice.PropToRange}&PropCity=${propertyState.buyOffice.PropCity}&PropSize=${propertyState.buyOffice.PropSize}&page=${currentPage}`);
            setBuyData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchOffice();
        break;

      default:
        handleGoBack();
        break;
    }
  }, [propertyState.PropType.type, currentPage]);

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
        {buyData && buyData.data.length > 0 ? (
          buyData.data.map((property) => (
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
        {buyData && buyData.data.length > 0 ? (
          <Pagination
            count={buyData.meta.last_page}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        ) : null}
      </Box>
    </>
  );
}

import { useState, useEffect } from "react";
import axios from "../../utility/axios";

import { useNavigate, useParams } from "react-router-dom";

import { Col, Carousel } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Box, Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pagination from "@mui/material/Pagination";

export default function ExploreQuickSearch() {
  const { status, propertyType, city } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [quickSearch, setQuickSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchQuickSearch = async () => {
      try {
        const response = await axios.get(
          `/api/quick-search?status=${status}&propertyType=${propertyType}&city=${city}&page=${currentPage}`
        );
        setQuickSearch(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuickSearch();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
};

  const getPropertyName = (modelName) => {
    switch (modelName) {
      case "Rent_Condo":
        return "Condominium";
      case "PostHouseLot":
        return "House and Lot";
      case "PostLot":
        return "Lot";
      case "PostWareHouse":
        return "Warehouse";
      case "PostCommSpace":
        return "Commercial Space";
      case "PostOffice":
        return "Office";
      case "SaleCondo":
        return "Condominium";
      case "SaleHouseLot":
        return "House And Lot";
      case "SaleLot":
        return "Lot";
      case "SaleWareHouse":
        return "Warehouse";
      case "SaleCommSpace":
        return "Commercial Space";
      case "SaleOffice":
        return "Office";
      default:
        return "Unknown";
    }
  };
  return (
    <>
      <Box sx={{ mt: "5rem" }}>
        <Button onClick={handleGoBack}>
          <ArrowBackIcon /> Go back
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* Button Container */}

        {quickSearch && quickSearch.data.length > 0 ? (
          quickSearch.data.map((property) => (
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
                    onClick={() =>
                      navigate(`/viewing/${property.id}/${property.modelName}`)
                    }
                  >
                    <h6
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        minHeight: "22px",
                      }}
                    >
                      {property.title}
                    </h6>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                      }}
                    >
                      {property.address}
                    </p>
                    <div className="__type">
                      <span>
                        <Icon.Building /> {getPropertyName(property.modelName)}
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
        {quickSearch && quickSearch.data.length > 0 ? (
          <Pagination
            count={quickSearch.meta.last_page}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        ) : null}
      </Box>
    </>
  );
}

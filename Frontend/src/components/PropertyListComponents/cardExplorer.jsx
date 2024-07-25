import React, { useState, useEffect } from "react";
import { Carousel, Container, Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../../assets/BuyAndSell.css";
import {
  Pagination,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  createTheme,
} from "@mui/material";
import { Grid, FormLabel, Select, Option, Input, Slider } from '@mui/joy';
import { useTheme, useMediaQuery } from "@mui/material";
import axios from "../../utility/axios";
import { useNavigate } from "react-router-dom";
import "../../assets/BuyAndSell.css";

//ICONS
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import RoomIcon from '@mui/icons-material/Room';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';

import * as Icon from "react-bootstrap-icons";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";

function valueText(value) {
  return `${value}`;
}

const CardExplorer = ({ selectedListingStatus, setSelectedListingStatus }) => {
  const [properties, setProperties] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(""); // State for selected neighborhood
  const Navigate = useNavigate();

  const handleButtonClick = (listingStatus) => {
    console.log("Listing status changed to:", listingStatus);
    setSelectedListingStatus(listingStatus);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `/api/get-all-properties?listingStatus=${selectedListingStatus}&page=${page}&limit=4`
        );
        console.log("API Response:", response.data);
        setProperties(response.data);
      } catch (error) {
        console.log("Error fetching listings:", error);
        setError(error.message);
      }
    };

    console.log("Fetching properties with parameters:", {
      selectedListingStatus,
      page,
    });

    // Fetch selected neighborhood from localStorage
    const neighborhood = localStorage.getItem("selectedNeighborhood");
    setSelectedNeighborhood(neighborhood);

    fetchProperties();
  }, [page, selectedListingStatus]);
  const getNeighborhoodName = (selectedNeighborhood) => {
    switch (selectedNeighborhood) {
      case "Rockwell":
        return "Rockwell Center, Makati City";
      case "BGC":
        return "Bonifacio Global City, Taguig City";
      case "Mall of Asia":
        return "Mall of Asia, Pasay City";
      case "Ortigas Center":
        return "Ortigas Center, Pasig City";
    }
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
      default:
        return "Unknown";
    }
  };
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1400,
        xl: 1522,
      },
    },
  });

  const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const [selectedProperty, setSelectedProperty] = useState("condominium");

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Slider
  const [value, setValue] = React.useState(10000); // Initial value of 10000
  const minValue = 10000;
  const maxValue = 1000000;
  const step = 1000; // Count by 1000

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const convertToDisplayValue = (value) => {
    return value.toLocaleString();
  };

  const convertToActualValue = (displayValue) => {
    return parseInt(displayValue.replaceAll(',', ''));
  };

  return (
    <Container className="list-holder">
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box
          sx={{
            mt: 7,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Accordion
            sx={{
              bgcolor: "#fff",
              width: { md: "90%", xs: "100%" },
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
            }}

          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {/* Upper Box */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    "@media (max-width: 600px)": {
                      flexDirection: "column",
                      alignItems: "center",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: isSmallScreen ? "22px" : "26px", // Set font size based on screen size
                    }}
                  >
                    {getNeighborhoodName(selectedNeighborhood)}
                    {properties &&
                      properties.result_count &&
                      `(total results found ${properties.result_count})`}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      mr: 3,
                      textDecoration: "underline 2px solid #0B6BCB",
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    <FilterListIcon
                      sx={{
                        fill: "#0B6BCB",
                        fontfamily: '"Poppins",sans-serif',
                      }}
                    />{" "}
                    Filter
                  </Box>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: { md: "90%", xs: "100%" } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <FormLabel
                        id="Prop-Type-Select"
                      >
                        Property Type:
                      </FormLabel>
                      <Select
                        labelid="Prop-Type-Select"
                        id="Property-Type-Select"
                        onChange=''
                        defaultValue='all'
                        color="neutral"
                        startDecorator={<MapsHomeWorkOutlinedIcon />}
                      >
                        <Option value="all">All</Option>
                        <Option value="condominium">Condominium</Option>
                        <Option value="houseandLot">House and Lot</Option>
                        <Option value="lot">Lot</Option>
                        <Option value="warehouse">Warehouse</Option>
                        <Option value="commspace">Commercial Space</Option>
                        <Option value="office">Office</Option>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormLabel>Furnishing:</FormLabel>
                      <Select
                        labelid="Prop-Furnishing-Select"
                        id="Property-Furnishing-Select"
                        onChange=''
                        defaultValue='all'
                        color="neutral"
                        startDecorator={<WeekendOutlinedIcon />}
                      >
                        <Option value="all">All</Option>
                        <Option value="full">Fully Furnished</Option>
                        <Option value="semi">Semi-Furnished</Option>
                        <Option value="unf">Unfurnished</Option>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormLabel>Bedroom:</FormLabel>
                      <Select
                        labelid="bedroom"
                        id="bedroom"
                        onChange=''
                        defaultValue='all'
                        color="neutral"
                        startDecorator={<KingBedOutlinedIcon />}
                      >
                        <Option value="all">All</Option>
                        <Option value="1B">1 Bedroom</Option>
                        <Option value="2B">2 Bedroom</Option>
                        <Option value="3B">3 Bedroom</Option>
                        <Option value="4B">4 Bedroom</Option>
                        <Option value="5B">5 Bedroom</Option>
                        <Option value="6B">6 Bedroom</Option>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormLabel>City:</FormLabel>
                      <Select
                        labelid="city"
                        id="city"
                        onChange=''
                        defaultValue='all'
                        color="primary"
                        variant="soft"
                        startDecorator={<RoomIcon />}
                      >
                        <Option value="all">All</Option>
                        <Option value="Manila">Manila</Option>
                        <Option value="Pasay">Pasay</Option>
                        <Option value="Pasig">Pasig</Option>
                        <Option value="Taguig">Taguig</Option>
                        <Option value="Mandaluyong">Mandaluyong</Option>
                        <Option value="Pateros">Pateros</Option>
                        <Option value="SanJuan">San Juan</Option>
                        <Option value="Quezon">Quezon</Option>
                        <Option value="Makati">Makati</Option>
                        <Option value="Caloocan">Caloocan</Option>
                        <Option value="Parañaque">Parañaque</Option>
                        <Option value="Valenzuela">Valenzuela</Option>
                        <Option value="Navotas">Navotas</Option>
                      </Select>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Input
                          startDecorator={'₱'}
                          value={convertToDisplayValue(value)}
                          onChange={(e) => {
                            const newValue = convertToActualValue(e.target.value);
                            if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
                              setValue(newValue);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Slider
                          getAriaLabel={() => 'Property-Budget-Range'}
                          value={value}
                          onChange={handleChange}
                          min={minValue}
                          max={maxValue}
                          step={step}
                          valueLabelDisplay="auto"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Input
                          startDecorator={'₱'}
                          value={convertToDisplayValue(value)}
                          onChange={(e) => {
                            const newValue = convertToActualValue(e.target.value);
                            if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
                              setValue(newValue);
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              ></Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Container className="d-flex justify-content-center">
          <Button
            variant="text"
            style={{
              fontWeight:
                selectedListingStatus === "For Rent" ? "bold" : "normal",
              fontSize: selectedListingStatus === "For Rent" ? "1.2em" : "1em",
            }}
            onClick={() => handleButtonClick("For Rent")}
          >
            For Rent
          </Button>
          <Button
            variant="text"
            style={{
              fontWeight:
                selectedListingStatus === "For Sale" ? "bold" : "normal",
              fontSize: selectedListingStatus === "For Sale" ? "1.2em" : "1em",
            }}
            onClick={() => handleButtonClick("For Sale")}
          >
            For Sale
          </Button>
        </Container>
      </Box>

      <Container className="p-3 w-100 Explore-Property-List">
        {error && <div className="alert alert-danger">{error}</div>}
        {properties &&
          properties.properties &&
          properties.properties.length > 0 ? (
          properties.properties.map((property, index) => (
            <div
              key={index}
              className="__propArea text-center"
              onClick={() => Navigate("/Viewing")}
            >
              <div className="__propCard">
                <Carousel interval={null} indicators={false}>
                  {property.images &&
                    property.images.map((image, imgIndex) => (
                      <Carousel.Item key={imgIndex}>
                        <img
                          src={`http://127.0.0.1:8000/storage/${image.path}`}
                          loading="lazy"
                          className="img-fluid __img"
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
                <div className="__propCard_detail text-left">
                  <h5>{property.title}</h5>
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "90%",
                    }}
                  >
                    {property.address}
                  </p>
                  <div className="__propType">
                    <span>
                      <Icon.Building /> {getPropertyName(property.modelName)}
                    </span>
                    {property.newListing && (
                      <span className="newListingName">New Listing</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No properties found</div>
        )}
      </Container>
      <Container className="d-flex justify-content-center">
        {properties && properties.total_pages && (
          <Pagination
            count={properties.total_pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Container>
    </Container>
  );
};

export default CardExplorer;

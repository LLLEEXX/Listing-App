import {
  Box,
  Button,
  Typography,
  InputLabel,
  Pagination,
  Avatar,
  Card,
  Tooltip,
  CardActions,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createTheme,
  Alert,
} from "@mui/material";

import { useTheme, useMediaQuery } from "@mui/material";

//JOY MUI
import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import RoomIcon from "@mui/icons-material/Room";

import { useState, useEffect } from "react";

//Color Variables
import { colors } from "../utility/scriptUtility";

//MUI ICONS
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import CallIcon from "@mui/icons-material/Call";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PestControlIcon from "@mui/icons-material/PestControl";
import HandymanIcon from "@mui/icons-material/Handyman";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import axios from "../utility/axios";

const PropertyService = () => {
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Theme JS
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

  const [selectedValue, setSelectedValue] = useState("Manila");

  const [serviceNeeded, setServiceNeeded] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const filterUnitCleaning = async (service, page = 1) => {
    try {
      const res = await axios.get(
        `/api/service-needed?city=${selectedValue}&service=${service}&page=${page}`
      );
      setServiceNeeded(res.data);
      setTotalPages(res.data.meta.last_page);
      setCurrentPage(res.data.meta.current_page);
    } catch (error) {
    }
  };

  useEffect(() => {
    filterUnitCleaning("Unit Cleaning");
  }, []);

  const handlePageChange = (event, page) => {
    filterUnitCleaning("Unit Cleaning", page);
    setCurrentPage(page);
  };

  return (
    <Box
      component="section"
      sx={{
        [theme.breakpoints.only("xs")]: {
          p: 0,
          py: 2,
        },
        p: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ mt: 7, display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Accordion
          sx={{
            bgcolor: "#fff",
            width: { md: "90%", xs: "100%" },
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
          }}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: isSmallScreen ? "24px" : "32px", // Set font size based on screen size
                }}
              >
                Property Service Provider
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
                  sx={{ fill: "#0B6BCB", fontfamily: '"Poppins",sans-serif' }}
                />{" "}
                Filter
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
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                    color: colors.black,
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  Choose a city:
                </InputLabel>
                <Select
                  color="neutral"
                  variant="outlined"
                  labelid="Prop-Type-Select"
                  id="Property-Type-Select"
                  indicator={<KeyboardArrowDown />}
                  defaultValue={selectedValue}
                  onChange={handleSelectChange}
                  size="md"
                  startDecorator={<RoomIcon />}
                  sx={{
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                    fontSize: "17px",
                  }}
                >
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
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  Service Needed
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width: { md: "70%" },
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: { md: "11rem", xs: "18rem" },
                    border: "1px solid #0B6BCB",
                    color: "#0B6BCB",
                    fontFamily: '"Poppins", sans-serif',
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "#0B6BCB",
                      border: "none",
                    },
                  }}
                  onClick={() => filterUnitCleaning("Unit Cleaning")}
                >
                  <CleaningServicesIcon className="me-1" /> Unit Cleaning
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: { md: "12rem", xs: "18rem" },
                    border: "1px solid #0B6BCB",
                    color: "#0B6BCB",
                    fontFamily: '"Poppins", sans-serif',
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "#0B6BCB",
                      border: "none",
                    },
                  }}
                  onClick={() => filterUnitCleaning("Pest Control")}
                >
                  <PestControlIcon className="me-1" /> Pest Control
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: { md: "10rem", xs: "18rem" },
                    border: "1px solid #0B6BCB",
                    color: "#0B6BCB",
                    fontFamily: '"Poppins", sans-serif',
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "#0B6BCB",
                      border: "none",
                    },
                  }}
                  onClick={() => filterUnitCleaning("Renovation")}
                >
                  <HandymanIcon className="me-1" />
                  Renovation
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: { md: "10rem", xs: "18rem" },
                    border: "1px solid #0B6BCB",
                    color: "#0B6BCB",
                    fontFamily: '"Poppins", sans-serif',
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "#0B6BCB",
                      border: "none",
                    },
                  }}
                  onClick={() => filterUnitCleaning("Lock Smith")}
                >
                  <VpnKeyIcon className="me-1" />
                  Lock Smith
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: { md: "16rem", xs: "18rem" },
                    border: "1px solid #0B6BCB",
                    color: "#0B6BCB",
                    fontFamily: '"Poppins", sans-serif',
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "#0B6BCB",
                      border: "none",
                    },
                  }}
                  onClick={() => filterUnitCleaning("Grease Trap Cleaning")}
                >
                  <WaterDropIcon className="me-1" /> Grease Trap Cleaning
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: { md: "18rem", xs: "18rem" },
                    border: "1px solid #0B6BCB",
                    color: "#0B6BCB",
                    fontFamily: '"Poppins", sans-serif',
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "#0B6BCB",
                      border: "none",
                    },
                  }}
                  onClick={() =>
                    filterUnitCleaning("Aircon Cleaning and Repair")
                  }
                >
                  <AcUnitIcon className="me-1" /> Aircon Cleaning and Repair
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/*MAIN COMPANY CARD BODY*/}
      <Box
        component="section"
        sx={{
          mt: 5,
          display: "flex",
          flexWrap: "wrap",
          fontFamily: '"Poppins", sans-serif',
          [theme.breakpoints.between("sm", "xl")]: {
            justifyContent: "center",
          },
          width: { md: "90%", xs: "100%" },
          gap: 2,
          [theme.breakpoints.only("xs")]: {
            gap: 0.9,
            rowGap: 1,
          },
        }}
      >
        {serviceNeeded && serviceNeeded.data && serviceNeeded.data.length > 0 ? (
          serviceNeeded.data.map((service, index) => (
            <Card
              key={index}
              sx={{
                boxShadow: "none",
                [theme.breakpoints.only("xl")]: {
                  width: "26.8rem",
                },
                [theme.breakpoints.between("lg", "xl")]: {
                  width: "30rem",
                },
                [theme.breakpoints.between("md", "lg")]: {
                  width: "30rem",
                },
                [theme.breakpoints.only("xs")]: {
                  width: "49%",
                  height: "23rem",
                  border: "1px solid #0B6BCB",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 0.5, md: 2 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.5, md: 2 },
                      flexDirection: { md: "initial", xs: "column" },
                    }}
                  >
                    <Avatar
                      sx={{ bgcolor: "#000", width: "5rem", minHeight: "5rem" }}
                      variant="rounded"
                      src={`http://127.0.0.1:8000/storage/${service.image}`}
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography
                        variant="Body1"
                        sx={{
                          [theme.breakpoints.only("xs")]: {
                            fontSize: 15,
                          },
                        }}
                      >
                        {service.comp_Name}
                      </Typography>
                      <Typography
                        variant="Body1"
                        sx={{ fontWeight: "bold", color: "#0B6BCB" }}
                      >
                        {service.service}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 0.5, md: 2 },
                      borderBottom: "1px solid #d3d3d3",
                      p: 1,
                      alignItems: { md: "initial", xs: "center" },
                      flexDirection: { md: "initial", xs: "column" },
                    }}
                  >
                    <Typography
                      variant="Body2"
                      sx={{ color: "#0B6BCB", fontWeight: "bold" }}
                    >
                      Email:
                    </Typography>
                    <Typography variant="Body1">{service.email}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 0.5, md: 2 },
                      borderBottom: "1px solid #d3d3d3",
                      p: 1,
                      alignItems: { md: "initial", xs: "center" },
                      flexDirection: { md: "initial", xs: "column" },
                    }}
                  >
                    <Typography
                      variant="Body2"
                      sx={{ color: "#0B6BCB", fontWeight: "bold" }}
                    >
                      Address:
                    </Typography>
                    <Typography variant="Body1">{service.address}</Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Tooltip title="Click to Call Service" arrow>
                  <Button
                    size="medium"
                    sx={{
                      display: "flex",
                      gap: { xs: 0.5, md: 2 },
                      color: "#0F9D58",
                    }}
                    onClick={() =>
                      (window.location.href = `tel:${service.contact_Num}`)
                    }
                  >
                    <CallIcon sx={{ fill: "#0F9D58" }} />
                    {service.contact_Num}
                  </Button>
                </Tooltip>
              </CardActions>
            </Card>
          ))
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Alert severity="info" sx={{ width: "50%" }}>
             No services are listed for this city yet. Try searching in other cities.
            </Alert>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 5 }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
      </Box>
    </Box>
  );
};

export default PropertyService;

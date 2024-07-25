import {
  Box,
  Typography,
  Stack,
  Grid,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Slider,
  Button,
  FormHelperText,
} from "@mui/material";

//IcONS
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WeekendIcon from "@mui/icons-material/Weekend";
import BalconyIcon from "@mui/icons-material/Balcony";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

//MUI JOY
import {
  Modal,
  ModalDialog,
  Box as MUIBox,
  ModalClose,
  Typography as MUITypo,
  Divider as MUIDivider,
  Button as ModalButton,
} from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

//UseContext
import { usePropertyContext } from "../../utility/PropertyState";

export default function BuyCondo({}) {
  const colorBlack = "#030708";
  const colorGreyBg = "#F2F5F6";

  const circleStyle = {
    backgroundColor: "#C7F7C7",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const { propertyState, setPropertyState } = usePropertyContext();

  const handleSliderChange = (event, newValue) => {
    const adjustedValues = newValue.map((value) => {
      const roundedValue = Math.round(value / 500) * 500;
      return Math.max(1000, Math.min(1000000, roundedValue));
    });

    // Update the state with the new values
    setPropertyState((prevState) => ({
      ...prevState,
      buyCondo: {
        ...prevState.buyCondo,
        PropFromRange: adjustedValues[0],
        PropToRange: adjustedValues[1],
      },
    }));
  };

  const [openRequestRental, setOpenRequestRental] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPropertyState({
      ...propertyState,
      buyCondo: {
        ...propertyState.buyCondo,
        [name]: value,
      },
    });
  };

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    borderRadius: 3,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  };

  const BuyCondo = (e) => {
    e.preventDefault();

    setOpenRequestRental(true);
  };

  const requestData = {
    ...propertyState.buyCondo,
  };

  const [snackbar, setSnackBar] = useState({
    open: false,
    color: "success",
    message: "",
    icon: "",
  });

  const handleModalChoice = async (choice) => {
    if (choice === true) {
      try {
        const App = getApp();
        const config = {
          headers: {
            Authorization: `Bearer ${App}`,
          },
        };

        const response = await axios.post(
          "/api/buy-condo",
          requestData,
          config
        );

        if (response.status === 201) {
          setPropertyState({
            buyCondo: {
              PropBuildingName: "",
              PropBaths: "",
              PropBeds: "",
              PropFurnish: "Fully Furnished",
              PropBalcony: "Balcony",
              PropParking: "Parking",
              PropFromRange: 1000,
              PropToRange: 1000000,
              PropCity: "Manila",
              PropNeigborhood: "",
              condo_errs: [],
            },
          });
          setSnackBar({
            open: true,
            color: "success",
            message: "Form Successfully Submitted",
            icon: <DoneAllIcon />,
          });
        } else {
          setPropertyState((prevState) => ({
            ...prevState,
            buyCondo: {
              ...prevState.buyCondo,
              condo_errs: response.data.condo_errs,
            },
          }));
          setSnackBar({
            open: true,
            color: "danger",
            message: "Invalid input detected. Please review your entry.",
            icon: <ErrorIcon />,
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setSnackBar({
            open: true,
            color: "danger",
            message: "Please login first to continue",
            icon: <ErrorIcon />,
          });
        } else {
          setSnackBar({
            open: true,
            color: "danger",
            message: "Something wrong with the server, Please try again later",
            icon: <ErrorIcon />,
          });
        }
      }
    } else {
      setPropertyState((prevState) => ({
        ...prevState,
        PropType: {
          ...prevState.PropType,
          type: "buyCondo",
        },
      }));
      navigate("/explore-buy");
    }

    setOpenRequestRental(false);
  };

  return (
    <form onSubmit={BuyCondo}>
      <Grid container sx={{ gap: 2 }}>
        <Grid item xs={12} md={3}>
          <InputLabel
            id="PrefBuilding"
            sx={{ fontWeight: "bold", mb: 1, color: colorBlack }}
          >
            Preferred Building
          </InputLabel>
          <TextField
            labelid="PrefBuilding"
            fullWidth
            placeholder="Enter Preferred Building"
            name="PropBuildingName"
            value={propertyState.buyCondo.PropBuildingName}
            onChange={handleInput}
            required
          />
          {propertyState.buyCondo.condo_errs.PropBuildingName && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {propertyState.buyCondo.condo_errs.PropBuildingName}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={1}>
          <InputLabel sx={{ fontWeight: "bold", mb: 1, color: colorBlack }}>
            <BathtubIcon /> Baths
          </InputLabel>
          <TextField
            placeholder="0 Baths"
            inputMode="numeric"
            variant="outlined"
            fullWidth
            name="PropBaths"
            InputProps={{
              inputProps: {
                maxLength: 2,
              },
            }}
            value={propertyState.buyCondo.PropBaths}
            onChange={handleInput}
            required
          />
          {propertyState.buyCondo.condo_errs.PropBaths && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {propertyState.buyCondo.condo_errs.PropBaths}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={1}>
          <InputLabel
            id="Prop-Type-Select"
            sx={{ fontWeight: "bold", mb: 1, color: colorBlack }}
          >
            <BedIcon /> Beds
          </InputLabel>
          <TextField
            placeholder="0 Beds"
            inputMode="numeric"
            variant="outlined"
            fullWidth
            name="PropBeds"
            InputProps={{
              inputProps: {
                maxLength: 2,
              },
            }}
            value={propertyState.buyCondo.PropBeds}
            onChange={handleInput}
            required
          />
          {propertyState.buyCondo.condo_errs.PropBeds && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {propertyState.buyCondo.condo_errs.PropBeds}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <InputLabel
            id="PropFurnish"
            sx={{ fontWeight: "bold", mb: 1, color: colorBlack }}
          >
            <WeekendIcon /> Furnishing
          </InputLabel>
          <Select
            labelid="Furnishing"
            id="Furnishing"
            fullWidth
            defaultValue={propertyState.buyCondo.PropFurnish}
            onChange={handleInput}
            name="PropFurnish"
          >
            <MenuItem value="Fully Furnished">Fully Furnished</MenuItem>
            <MenuItem value="Semi Furnished">Semi Furnished</MenuItem>
            <MenuItem value="UnFurnished">UnFurnished</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={2.1}>
          <InputLabel
            id="PropBalcony"
            sx={{ fontWeight: "bold", mb: 1, color: colorBlack }}
          >
            <BalconyIcon /> Balcony
          </InputLabel>
          <Select
            labelid="PropBalcony"
            id="PropBalcony"
            fullWidth
            defaultValue={propertyState.buyCondo.PropBalcony}
            onChange={handleInput}
            name="PropBalcony"
          >
            <MenuItem value="Balcony">With Balcony</MenuItem>
            <MenuItem value="NoBalcony">Without Balcony</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={2}>
          <InputLabel
            id="PropParking"
            sx={{ fontWeight: "bold", mb: 1, color: colorBlack }}
          >
            <DirectionsCarIcon /> Parking
          </InputLabel>
          <Select
            id="PropParking"
            fullWidth
            defaultValue={propertyState.buyCondo.PropParking}
            onChange={handleInput}
            name="PropParking"
          >
            <MenuItem value="Parking">With Parking</MenuItem>
            <MenuItem value="NoParking">No Parking</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 4, fontWeight: "bold", color: colorBlack }}
          >
            ₱ Budget Range
          </InputLabel>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Slider
              value={[
                propertyState.buyCondo.PropFromRange,
                propertyState.buyCondo.PropToRange,
              ]}
              onChange={handleSliderChange}
              min={1000}
              max={1000000}
              sx={{
                width: "90%",
                "& .MuiSlider-thumb": { bgcolor: "#fff" },
                color: colorBlack,
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <TextField
                label="Minimum"
                variant="outlined"
                value={propertyState.buyCondo.PropFromRange}
                name="PropFromRange"
                onChange={handleInput}
                sx={{ width: "20rem" }}
              />
              <Divider
                sx={{ width: "2rem", border: "1px solid #030708" }}
                orientation="vertical"
              />
              <TextField
                label="Maximum"
                variant="outlined"
                value={propertyState.buyCondo.PropToRange}
                name="PropToRange"
                onChange={handleInput}
                sx={{ width: "20rem" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Stack component="section" sx={{ mt: 6 }}>
        <Stack sx={{ mb: 2, borderBottom: 1, py: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Poppins",sans-serif',
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            <LocationCityIcon /> Property Location
          </Typography>
        </Stack>

        <Grid container sx={{ gap: 2, placeContent: "center" }}>
          <Grid item xs={12} md={5}>
            <InputLabel id="City" sx={{ fontWeight: "bold", mb: 1 }}>
              <FmdGoodIcon />
              City
            </InputLabel>
            <Select
              variant="outlined"
              labelid="Prop-Type-Select"
              value={propertyState.buyCondo.PropCity}
              onChange={handleInput}
              size="md"
              name="PropCity"
              fullWidth
              sx={{
                fontSize: "17px",
              }}
            >
              <MenuItem value="Manila">Manila</MenuItem>
              <MenuItem value="Pasay">Pasay</MenuItem>
              <MenuItem value="Pasig">Pasig</MenuItem>
              <MenuItem value="Taguig">Taguig</MenuItem>
              <MenuItem value="Mandaluyong">Mandaluyong</MenuItem>
              <MenuItem value="Muntinlupa">Muntinlupa</MenuItem>
              <MenuItem value="San Juan">San Juan</MenuItem>
              <MenuItem value="Quezon">Quezon</MenuItem>
              <MenuItem value="Makati">Makati</MenuItem>
              <MenuItem value="Cavite">Cavite</MenuItem>
              <MenuItem value="Parañaque">Parañaque</MenuItem>
              <MenuItem value="Laguna">Laguna</MenuItem>
              <MenuItem value="Tagaytay">Tagaytay</MenuItem>
              <MenuItem value="Cebu">Cebu</MenuItem>
              <MenuItem value="Davao">Davao</MenuItem>
              <MenuItem value="Las Piñas">Las Piñas</MenuItem>
            </Select>
            {propertyState.buyCondo.condo_errs.PropCity && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {propertyState.buyCondo.condo_errs.PropCity}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            <InputLabel id="hood/Mark" sx={{ fontWeight: "bold", mb: 1 }}>
              Neighborhood/Landmark
            </InputLabel>
            <TextField
              labelid="hood/Mark"
              placeholder="Enter Neighborhood/Landmark"
              value={propertyState.buyCondo.PropNeigborhood}
              onChange={handleInput}
              name="PropNeigborhood"
              required
              fullWidth
            />
            {propertyState.buyCondo.condo_errs.PropNeigborhood && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {propertyState.buyCondo.condo_errs.PropNeigborhood}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Stack>
      <Box component="section" sx={{ mt: 10 }}>
        <Button
          variant="contained"
          onClick={() => setOpenRequestRental(true)}
          sx={{
            mt: 5,
            height: "3.5rem",
            fontFamily: "'Poppins', sans-serif1",
            backgroundColor: "#0B6BCB",
            width: "100%", // Set width to 100%
            "&:hover": {
              backgroundColor: "#fff",
              color: "#0B6BCB",
              border: 1,
            },
            // Media query for small screens
            "@media (min-width: 600px)": {
              width: "auto", // Set width to auto for screens larger than 600px
            },
          }}
        >
          <AddBoxOutlinedIcon className="me-1" /> Submit Inquiry
        </Button>
      </Box>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openRequestRental}
        onClose={() => setOpenRequestRental(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        <ModalDialog>
          <MUIBox>
            <div style={circleStyle}>
              <InfoOutlinedIcon sx={{ color: "#136C13" }} />
            </div>
            <ModalClose variant="plain" sx={{ mt: 2 }} />
          </MUIBox>

          <MUIBox sx={{ mt: 1 }}>
            <MUITypo level="h4">Make a Sale Request?</MUITypo>
            <MUIDivider
              inset="context"
              sx={{ backgroundColor: "#636B74", mt: 1.5 }}
            />
            <MUITypo level="title-md" sx={{ mt: 2 }}>
              According to your preferences, our sale providers may reach out to
              you with more suitable sale offers. Do you accept?
            </MUITypo>
            <ModalButton
              color="success"
              fullWidth
              sx={{ mt: 3, textTransform: "uppercase" }}
              size="md"
              onClick={() => {
                handleModalChoice(true);
              }}
            >
              Yes, Contact me in the future for Sale Offers
            </ModalButton>
            <ModalButton
              variant="outlined"
              color="danger"
              fullWidth
              sx={{ mt: 1, textTransform: "uppercase" }}
              size="md"
              onClick={() => {
                handleModalChoice(false);
              }}
            >
              No Thanks
            </ModalButton>
          </MUIBox>
        </ModalDialog>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        color={snackbar.color}
        variant="solid"
        onClose={() => setSnackBar({ open: false })}
      >
        {snackbar.icon} {snackbar.message}
      </Snackbar>
    </form>
  );
}

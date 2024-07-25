import { useState, useEffect } from "react";

//MUI IMPORTS
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
  ListSubheader,
  FormHelperText,
} from "@mui/material";

//Icons
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WeekendIcon from "@mui/icons-material/Weekend";
import BalconyIcon from "@mui/icons-material/Balcony";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PetsIcon from "@mui/icons-material/Pets";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//MUI JOY
import {
  Modal, ModalDialog, Box as MUIBox, ModalClose,
  Typography as MUITypo, Divider as MUIDivider,
  Button as ModalButton
} from '@mui/joy';
import Snackbar from "@mui/joy/Snackbar";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

//import UTILITY
import { usePropertyContext } from "../../utility/PropertyState";
import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

export default function RentCondo({}) {
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [snackbar, setSnackBar] = useState({
    open: false,
    color: "success",
    message: "",
    icon: "",
  });

  const [openRequestRental, setOpenRequestRental] = useState(false);
  const { rentPropertyState, setRentPropertyState } = usePropertyContext();

  const handleSliderChange = (event, newValue) => {
    const adjustedValues = newValue.map(value => {
      const roundedValue = Math.round(value / 500) * 500;
      return Math.max(1000, Math.min(1000000, roundedValue));
    });
  
    // Update the state with the new values
    setRentPropertyState(prevState => ({
      ...prevState,
      rentCondo: {
        ...prevState.rentCondo,
        PropFromRange: adjustedValues[0],
        PropToRange: adjustedValues[1]
      }
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRentPropertyState({
      ...rentPropertyState,
      rentCondo: {
        ...rentPropertyState.rentCondo,
        [name]: value,
      },
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setRentPropertyState({
      ...rentPropertyState,
      rentCondo: {
        ...rentPropertyState.rentCondo,
        PropMoveInDate: formattedDate,
      },
    });
  };

  //Color Variables
  const colorBlack = "#030708";
  const colorGreyBg = "#F2F5F6";

  const circleStyle = {
    backgroundColor: '#C7F7C7',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const RentCondo = (e) => {
    e.preventDefault();

    setOpenRequestRental(true);
  };

  const requestData = {
    ...rentPropertyState.rentCondo,
  };

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
          "/api/rent-condo",
          requestData,
          config
        );

        if (response.status === 201) {
          setRentPropertyState({
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
            },
          });
          setSnackBar({
            open: true,
            color: "success",
            message: "Form Successfully Submitted",
            icon: <DoneAllIcon />,
          });
        } else {
          setRentPropertyState((prevState) => ({
            ...prevState,
            rentCondo: {
              ...prevState.rentCondo,
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
        console.log(error);
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
      setRentPropertyState((prevState) => ({
        ...prevState,
        PropType: {
          ...prevState.PropType,
          type: "rentCondo",
        },
        rentCondo: {
          ...prevState.rentCondo,
          PropMoveInDate: null,
        },
      }));
      navigate("/explore-rent");
    }

    setOpenRequestRental(false);
  };

  return (
    <form onSubmit={RentCondo}>
      <Grid container sx={{ gap: 2 }}>
        <Grid item md={3} xs={12}>
          <InputLabel id="PrefBuilding" sx={{ fontWeight: "bold", mb: 1 }}>
            Preferred Building:
          </InputLabel>
          <TextField
            required
            labelid="PrefBuilding"
            fullWidth
            placeholder="Enter Preferred Building"
            name="PropBuildingName"
            value={rentPropertyState.rentCondo.PropBuildingName}
            onChange={handleInput}
          />
          {rentPropertyState.rentCondo.condo_errs.PropBuildingName && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCondo.condo_errs.PropBuildingName}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={1} xs={12}>
          <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>
            <BathtubIcon /> Baths:
          </InputLabel>
          <TextField
            placeholder="0 Baths"
            inputMode="numeric"
            variant="outlined"
            fullWidth
            required
            name="PropBaths"
            value={rentPropertyState.rentCondo.PropBaths}
            onChange={handleInput}
            InputProps={{
              inputProps: {
                maxLength: 2,
              },
            }}
          />
          {rentPropertyState.rentCondo.condo_errs.PropBaths && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCondo.condo_errs.PropBaths}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={1} xs={12}>
          <InputLabel id="Prop-Type-Select" sx={{ fontWeight: "bold", mb: 1 }}>
            <BedIcon /> Beds:
          </InputLabel>
          <TextField
            placeholder="0 Beds"
            inputMode="numeric"
            variant="outlined"
            fullWidth
            required
            name="PropBeds"
            InputProps={{
              inputProps: {
                maxLength: 2,
              },
            }}
            value={rentPropertyState.rentCondo.PropBeds}
            onChange={handleInput}
          />
          {rentPropertyState.rentCondo.condo_errs.PropBeds && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCondo.condo_errs.PropBeds}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel id="PropFurnish" sx={{ fontWeight: "bold", mb: 1 }}>
            <WeekendIcon /> Furnishing:
          </InputLabel>
          <Select
            labelid="Furnishing"
            id="Furnishing"
            fullWidth
            required
            name="PropFurnish"
            value={rentPropertyState.rentCondo.PropFurnish}
            onChange={handleInput}
          >
            <MenuItem value="Fully Furnished">Fully Furnished</MenuItem>
            <MenuItem value="Semi Furnished">Semi Furnished</MenuItem>
            <MenuItem value="Unfurnished">Unfurnished</MenuItem>
          </Select>
        </Grid>
        <Grid item md={2.1} xs={12}>
          <InputLabel id="PropBalcony" sx={{ fontWeight: "bold", mb: 1 }}>
            <BalconyIcon /> Balcony:
          </InputLabel>
          <Select
            labelid="PropBalcony"
            id="PropBalcony"
            fullWidth
            required
            name="PropBalcony"
            value={rentPropertyState.rentCondo.PropBalcony}
            onChange={handleInput}
          >
            <MenuItem value="Balcony">With Balcony</MenuItem>
            <MenuItem value="NoBalcony">Without Balcony</MenuItem>
            <MenuItem value="YesNoBalcony">With or Without Balcony</MenuItem>
          </Select>
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel id="PropParking" sx={{ fontWeight: "bold", mb: 1 }}>
            <DirectionsCarIcon /> Parking
          </InputLabel>
          <Select
            id="PropParking"
            fullWidth
            required
            name="PropParking"
            value={rentPropertyState.rentCondo.PropParking}
            onChange={handleInput}
          >
            <MenuItem value="Parking">With Parking</MenuItem>
            <MenuItem value="NoParking">Without Parking</MenuItem>
          </Select>
        </Grid>
        <Grid item md={3} xs={12}>
          <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>
            Target Move-in Date:
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              sx={{ width: "100%" }}
              value={rentPropertyState.rentCondo.PropMoveInDate}
              onChange={handleDateChange}
              name="PropMoveInDate"
              required
            />
          </LocalizationProvider>
          {rentPropertyState.rentCondo.condo_errs.PropMoveInDate && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCondo.condo_errs.PropMoveInDate}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={2.1} xs={12}>
          <InputLabel id="PropBalcony" sx={{ fontWeight: "bold", mb: 1 }}>
            Length of stay
          </InputLabel>
          <Select
            labelid="PropBalcony"
            id="PropBalcony"
            fullWidth
            required
            name="LengthOfStay"
            value={rentPropertyState.rentCondo.LengthOfStay}
            onChange={handleInput}
          >
            <ListSubheader>Long Term, Yearly</ListSubheader>
            <MenuItem value="2 years">2 years</MenuItem>
            <MenuItem value="1 years">1 years</MenuItem>
            <ListSubheader>Long Term, Monthly</ListSubheader>
            <MenuItem value="11 Months">11 Months</MenuItem>
            <MenuItem value="10 Months">10 Months</MenuItem>
            <MenuItem value="9 Months">9 Months</MenuItem>
            <MenuItem value="8 Months">8 Months</MenuItem>
            <MenuItem value="7 Months">7 Months</MenuItem>
            <MenuItem value="6 Months">6 Months</MenuItem>
            <ListSubheader>Short Term, Monthly</ListSubheader>
            <MenuItem value="5 Months">5 Months</MenuItem>
            <MenuItem value="4 Months">4 Months</MenuItem>
            <MenuItem value="3 Months">3 Months</MenuItem>
            <MenuItem value="2 Months">2 Months</MenuItem>
            <MenuItem value="1 Month">1 Month</MenuItem>
            <ListSubheader>Short Term, Weekly</ListSubheader>
            <MenuItem value="3 Weeks">3 Weeks</MenuItem>
            <MenuItem value="2 Weeks">2 Weeks</MenuItem>
            <MenuItem value="1 Week">1 Week</MenuItem>
            <ListSubheader>Short Term, Daily</ListSubheader>
            <MenuItem value="6 Days">6 Days</MenuItem>
            <MenuItem value="5 Days">5 Days</MenuItem>
            <MenuItem value="4 Days">4 Days</MenuItem>
            <MenuItem value="3 Days">3 Days</MenuItem>
            <MenuItem value="2 Days">2 Days</MenuItem>
            <MenuItem value="1 Day">1 Day</MenuItem>
          </Select>
        </Grid>
        <Grid item md={2.3} xs={12}>
          <InputLabel id="Prop-Type-Select" sx={{ fontWeight: "bold", mb: 1 }}>
            Nationality:
          </InputLabel>
          <TextField
            placeholder="Enter Nationality"
            variant="outlined"
            fullWidth
            value={rentPropertyState.rentCondo.Nationality}
            onChange={handleInput}
            name="Nationality"
            required
          />
          {rentPropertyState.rentCondo.condo_errs.Nationality && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCondo.condo_errs.Nationality}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel id="Prop-Type-Select" sx={{ fontWeight: "bold", mb: 1 }}>
            <SupervisorAccountIcon /> Occupants:
          </InputLabel>
          <TextField
            placeholder="# Occupants"
            inputMode="numeric"
            variant="outlined"
            fullWidth
            value={rentPropertyState.rentCondo.Occupants}
            onChange={handleInput}
            name="Occupants"
            required
          />
          {rentPropertyState.rentCondo.condo_errs.Occupants && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCondo.condo_errs.Occupants}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={3} xs={12}>
          <InputLabel id="PetTypes" sx={{ fontWeight: "bold", mb: 1 }}>
            <PetsIcon /> Pet Types:
          </InputLabel>
          <Select
            id="PetTypes"
            fullWidth
            value={rentPropertyState.rentCondo.PetTypes}
            onChange={handleInput}
            name="PetTypes"
            required
          >
            <MenuItem value="Dog Allowed">Dog Allowed</MenuItem>
            <MenuItem value="Cat Allowed">Cats Allowed</MenuItem>
            <MenuItem value="Small Pets Allowed">Small Pets Allowed</MenuItem>
            <MenuItem value="All type of Pets Allowed">
              All Type of Pets Allowed
            </MenuItem>
            <MenuItem value="No Pet Allowed Allowed">No Pets Allowed</MenuItem>
          </Select>
        </Grid>
        <Grid item md={12} xs={12} sx={{ mt: 2 }}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            ₱ Budget Range:
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
                rentPropertyState.rentCondo.PropFromRange,
                rentPropertyState.rentCondo.PropToRange,
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
                gap: { md: 5, xs: 2 },
              }}
            >
              <TextField
                label="Minimum"
                variant="outlined"
                value={rentPropertyState.rentCondo.PropFromRange}
                sx={{ width: { md: "20rem", xs: "10rem" } }}
                name="PropFromRange"
                onChange={handleInput}
              />
              <Divider
                sx={{
                  width: { md: "2rem", xs: "1rem" },
                  border: "1px solid #030708",
                }}
                orientation="vertical"
              />
              <TextField
                label="Maximum"
                variant="outlined"
                value={rentPropertyState.rentCondo.PropToRange}
                sx={{ width: { md: "20rem", xs: "10rem" } }}
                name="PropToRange"
                onChange={handleInput}
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
              value={rentPropertyState.rentCondo.PropCity}
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
            {rentPropertyState.rentCondo.condo_errs.PropCity && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {rentPropertyState.rentCondo.condo_errs.PropCity}
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
              value={rentPropertyState.rentCondo.PropNeigborhood}
              onChange={handleInput}
              name="PropNeigborhood"
              required
              fullWidth
            />
            {rentPropertyState.rentCondo.condo_errs.PropNeigborhood && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {rentPropertyState.rentCondo.condo_errs.PropNeigborhood}
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
            <MUITypo level="h4">Make a Rental Request?</MUITypo>
            <MUIDivider inset="context" sx={{ backgroundColor: "#636B74", mt: 1.5 }} />
            <MUITypo level="title-md" sx={{ mt: 2 }}>According to your preferences, our rental providers may reach out to
              you with more suitable rental offers. Do you accept?</MUITypo>
            <ModalButton color="success" fullWidth sx={{ mt: 3, textTransform: "uppercase" }} size="md"
              onClick={() => { handleModalChoice(true); }}>
              Yes, Contact me in the future for Rental Offers
            </ModalButton>
            <ModalButton variant="outlined" color="danger" fullWidth sx={{ mt: 1, textTransform: "uppercase" }} size="md"
              onClick={() => { handleModalChoice(false); }}>
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

import { useState, useEffect } from "react";

//MUI IMPORTS
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  Grid,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  Slider,
  Button,
  ListSubheader,
  FormHelperText
} from "@mui/material";

//Icons
import WeekendIcon from "@mui/icons-material/Weekend";
import BalconyIcon from "@mui/icons-material/Balcony";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PetsIcon from "@mui/icons-material/Pets";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//MUI JOY
import {
  Modal, ModalDialog, Box as MUIBox, ModalClose,
  Typography as MUITypo, Divider as MUIDivider,
  Button as ModalButton
} from '@mui/joy';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import Snackbar from "@mui/joy/Snackbar";

//import UTILITY
import { usePropertyContext } from "../../utility/PropertyState";
import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

export default function RentHouseLot({ }) {
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [snackbar, setSnackBar] = useState({
    open: false,
    color: "success",
    message: "",
    icon: "",
  });

  const navigate = useNavigate();

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
      rentHouseLot: {
        ...prevState.rentHouseLot,
        PropFromRange: adjustedValues[0],
        PropToRange: adjustedValues[1]
      }
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRentPropertyState({
      ...rentPropertyState,
      rentHouseLot: {
        ...rentPropertyState.rentHouseLot,
        [name]: value,
      },
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setRentPropertyState({
      ...rentPropertyState,
      rentHouseLot: {
        ...rentPropertyState.rentHouseLot,
        PropMoveInDate: formattedDate,
      },
    });
  };

  const RentHouseLot = (e) => {
    e.preventDefault();

    setOpenRequestRental(true);
  };

  const requestData = {
    ...rentPropertyState.rentHouseLot,
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
          "/api/rent-houselot",
          requestData,
          config
        );

        if (response.status === 201) {
          setRentPropertyState({
            rentHouseLot: {
              PropBuildingName: "",
              PropBaths: 0,
              PropBeds: 0,
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
            },
          });
          setSnackBar({
            open: true,
            color: 'success',
            message: 'Form Successfully Submitted',
            icon: <DoneAllIcon />
          })
        } else {
          setRentPropertyState((prevState) => ({
            ...prevState,
            rentHouseLot: {
              ...prevState.rentHouseLot,
              houseLot_errs: response.data.houseLot_errs,
            },
          }));
          setSnackBar({
            open: true,
            color: 'danger',
            message: 'Invalid input detected. Please review your entry.',
            icon: <ErrorIcon />
          })
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          setSnackBar({
            open: true,
            color: 'danger',
            message: 'Please login first to continue',
            icon: <ErrorIcon />
          })
        } else {
          setSnackBar({
            open: true,
            color: 'danger',
            message: 'Something wrong with the server, Please try again later',
            icon: <ErrorIcon />
          })
        }
      }
    } else {
      setRentPropertyState((prevState) => ({
        ...prevState,
        PropType: {
          ...prevState.PropType,
          type: "rentHouseLot",
        },
        rentHouseLot: {
          ...prevState.rentHouseLot,
          PropMoveInDate: null,
        },
      }));

      navigate("/explore-rent");
    }

    setOpenRequestRental(false);
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

  return (
    <form onSubmit={RentHouseLot}>
      <Grid container sx={{ gap: 2 }}>
        <Grid item md={3} xs={12}>
          <InputLabel id="PrefBuilding" sx={{ fontWeight: "bold", mb: 1 }}>
            Preferred Community/Village:
          </InputLabel>
          <TextField
            required
            labelid="PrefBuilding"
            fullWidth
            placeholder="Enter Preferred Community/Village"
            name="PropCommVill"
            value={rentPropertyState.rentHouseLot.PropCommVill}
            onChange={handleInput}
          />
          {rentPropertyState.rentHouseLot.houseLot_errs.PropCommVill && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentHouseLot.houseLot_errs.PropCommVill}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={1} xs={12}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            <AutoAwesomeMosaicOutlinedIcon /> Lot Area:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            fullWidth
            placeholder="0"
            inputMode="numeric"
            endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
            required
            name="PropLotArea"
            value={rentPropertyState.rentHouseLot.PropLotArea}
            onChange={handleInput}
          />
          {rentPropertyState.rentHouseLot.houseLot_errs.PropLotArea && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentHouseLot.houseLot_errs.PropLotArea}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={1} xs={12}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            Floor Area:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            fullWidth
            placeholder="0"
            inputMode="numeric"
            endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
            required
            name="PropFloorArea"
            value={rentPropertyState.rentHouseLot.PropFloorArea}
            onChange={handleInput}
          />
          {rentPropertyState.rentHouseLot.houseLot_errs.PropFloorArea && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentHouseLot.houseLot_errs.PropFloorArea}
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
            value={rentPropertyState.rentHouseLot.PropFurnish}
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
            value={rentPropertyState.rentHouseLot.PropBalcony}
            onChange={handleInput}
          >
            <MenuItem value="Balcony">With Balcony</MenuItem>
            <MenuItem value="NoBalcony">Without Balcony</MenuItem>
            <MenuItem value="YesNoBalcony">With or Without Balcony</MenuItem>
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
              required
              name="PropMoveInDate"
              value={rentPropertyState.rentHouseLot.PropMoveInDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          {rentPropertyState.rentHouseLot.houseLot_errs.PropMoveInDate && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentHouseLot.houseLot_errs.PropMoveInDate}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel id="PropBalcony" sx={{ fontWeight: "bold", mb: 1 }}>
            Length of stay
          </InputLabel>
          <Select
            labelid="PropBalcony"
            id="PropBalcony"
            fullWidth
            required
            name="LengthOfStay"
            value={rentPropertyState.rentHouseLot.LengthOfStay}
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
            required
            name="Nationality"
            value={rentPropertyState.rentHouseLot.Nationality}
            onChange={handleInput}
          />
          {rentPropertyState.rentHouseLot.houseLot_errs.Nationality && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentHouseLot.houseLot_errs.Nationality}
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
            required
            name="Occupants"
            value={rentPropertyState.rentHouseLot.Occupants}
            onChange={handleInput}
          />
          {rentPropertyState.rentHouseLot.houseLot_errs.Occupants && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentHouseLot.houseLot_errs.Occupants}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel id="RentCarGarage" sx={{ fontWeight: "bold", mb: 1 }}>
            <DirectionsCarIcon /> Car Garage:
          </InputLabel>
          <Select
            labelid="CarGarage"
            id="CarGarage"
            fullWidth
            value={rentPropertyState.rentHouseLot.PropCarGarage}
            onChange={handleInput}
            name="PropCarGarage"
          >
            <MenuItem value="Garage">With Car Garage</MenuItem>
            <MenuItem value="NoGarage">Without Car Garage</MenuItem>
          </Select>
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel id="PetTypes" sx={{ fontWeight: "bold", mb: 1 }}>
            <PetsIcon /> Pet Types:
          </InputLabel>
          <Select
            id="PetTypes"
            fullWidth
            value={rentPropertyState.rentHouseLot.PetTypes}
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
                rentPropertyState.rentHouseLot.PropFromRange,
                rentPropertyState.rentHouseLot.PropToRange,
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
                value={rentPropertyState.rentHouseLot.PropFromRange}
                name="PropFromRange"
                onChange={handleInput}
                sx={{ width: { md: "20rem", xs: "10rem" } }}
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
                value={rentPropertyState.rentHouseLot.PropToRange}
                name="PropToRange"
                onChange={handleInput}
                sx={{ width: { md: "20rem", xs: "10rem" } }}
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
              value={rentPropertyState.rentHouseLot.PropCity}
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
            {rentPropertyState.rentHouseLot.houseLot_errs.PropCity && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {rentPropertyState.rentHouseLot.houseLot_errs.PropCity}
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
              value={rentPropertyState.rentHouseLot.PropNeigborhood}
              onChange={handleInput}
              name="PropNeigborhood"
              required
              fullWidth
            />
            {rentPropertyState.rentHouseLot.houseLot_errs.PropNeigborhood && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {rentPropertyState.rentHouseLot.houseLot_errs.PropNeigborhood}
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

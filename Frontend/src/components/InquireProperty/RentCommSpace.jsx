import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//MUI IMPORTS
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  Grid,
  Divider,
  InputLabel,
  TextField,
  OutlinedInput,
  Slider,
  Button,
  FormHelperText,
  Select,
  MenuItem  
} from "@mui/material";

//Icons
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
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

//UTILITY
import { usePropertyContext } from "../../utility/PropertyState";
import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

export default function rentCommSpace({}) {
  const navigate = useNavigate();
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSliderChange = (event, newValue) => {
    const adjustedValues = newValue.map((value) => {
      const roundedValue = Math.round(value / 500) * 500;
      return Math.max(1000, Math.min(1000000, roundedValue));
    });

    // Update the state with the new values
    setRentPropertyState((prevState) => ({
      ...prevState,
      rentCommSpace: {
        ...prevState.rentCommSpace,
        PropFromRange: adjustedValues[0],
        PropToRange: adjustedValues[1],
      },
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRentPropertyState({
      ...rentPropertyState,
      rentCommSpace: {
        ...rentPropertyState.rentCommSpace,
        [name]: value,
      },
    });
  };

  const [openRequestRental, setOpenRequestRental] = useState(false);
  const { rentPropertyState, setRentPropertyState } = usePropertyContext();

  //Color Variables
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

  const rentCommSpace = (e) => {
    e.preventDefault();

    setOpenRequestRental(true);
  };

  const requestData = {
    ...rentPropertyState.rentCommSpace,
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
          "/api/buy-commspace",
          requestData,
          config
        );

        if (response.status === 201) {
          setRentPropertyState({
            rentCommSpace: {
              PropPurpose: "",
              PropSize: 0,
              PropFromRange: 1000,
              PropToRange: 1000000,
              PropCity: "Manila",
              PropNeigborhood: "",
              commspace_errs: [],
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
            rentCommSpace: {
              ...prevState.rentCommSpace,
              commspace_errs: response.data.commspace_errs,
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
          type: "rentCommSpace",
        },
      }));
      navigate("/explore-buy");
    }

    setOpenRequestRental(false);
  };

  return (
    <form onSubmit={rentCommSpace}>
      <Grid container sx={{ gap: 2 }}>
        <Grid item md={3} xs={12}>
          <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Purpose:</InputLabel>
          <TextField
            placeholder="Enter Commercial Space Purpose"
            variant="outlined"
            fullWidth
            name="PropPurpose"
            required
            value={rentPropertyState.rentCommSpace.PropPurpose}
            onChange={handleInput}
          />
          {rentPropertyState.rentCommSpace.commspace_errs.PropPurpose && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCommSpace.commspace_errs.PropPurpose}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={3} xs={12}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            <AutoAwesomeMosaicOutlinedIcon /> Preferred Size:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            fullWidth
            placeholder="0"
            inputMode="numeric"
            endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
            name="PropSize"
            required
            value={rentPropertyState.rentCommSpace.PropSize}
            onChange={handleInput}
          />
          {rentPropertyState.rentCommSpace.commspace_errs.PropSize && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentPropertyState.rentCommSpace.commspace_errs.PropSize}
            </FormHelperText>
          )}
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
                rentPropertyState.rentCommSpace.PropFromRange,
                rentPropertyState.rentCommSpace.PropToRange,
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
                value={rentPropertyState.rentCommSpace.PropFromRange}
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
                value={rentPropertyState.rentCommSpace.PropToRange}
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
              value={rentPropertyState.rentCommSpace.PropCity}
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
            {rentPropertyState.rentCommSpace.commspace_errs.PropCity && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {rentPropertyState.rentCommSpace.commspace_errs.PropCity}
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
              value={rentPropertyState.rentCommSpace.PropNeigborhood}
              onChange={handleInput}
              name="PropNeigborhood"
              required
              fullWidth
            />
            {rentPropertyState.rentCommSpace.commspace_errs.PropNeigborhood && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {rentPropertyState.rentCommSpace.commspace_errs.PropNeigborhood}
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
            <MUIDivider
              inset="context"
              sx={{ backgroundColor: "#636B74", mt: 1.5 }}
            />
            <MUITypo level="title-md" sx={{ mt: 2 }}>
              According to your preferences, our rental providers may reach out
              to you with more suitable rental offers. Do you accept?
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
              Yes, Contact me in the future for Rental Offers
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

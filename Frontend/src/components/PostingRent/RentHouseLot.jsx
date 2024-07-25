import { useState } from "react";

import {
  Box,
  Stack,
  InputLabel,
  TextField,
  Grid,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  FormControlLabel,
  Typography,
  FormGroup,
  Checkbox,
  Button,
  styled,
  Alert,
  IconButton,
  FormHelperText,
} from "@mui/material";

import * as React from "react";
import { Link, Snackbar, Modal, ModalDialog, ModalClose, Button as ModalButton, Divider, Typography as Joy } from "@mui/joy";


//Step IMPORT
import StepsGuide from "./StepsGuide";

//MUI ICONS
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import WeekendIcon from "@mui/icons-material/Weekend";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import PetsIcon from "@mui/icons-material/Pets";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BalconyIcon from "@mui/icons-material/Balcony";
import GarageIcon from "@mui/icons-material/Garage";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CountertopsIcon from "@mui/icons-material/Countertops";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import PoolIcon from "@mui/icons-material/Pool";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import KebabDiningOutlinedIcon from "@mui/icons-material/KebabDiningOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import Launch from "@mui/icons-material/Launch";
import CollectionsSharpIcon from "@mui/icons-material/CollectionsSharp";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import BoyIcon from "@mui/icons-material/Boy";
import ErrorIcon from "@mui/icons-material/Error";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InfoIcon from "@mui/icons-material/Info";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

export default function RentHouseLot() {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackDanger, setSnackDanger] = useState({
    open: false,
    message: "",
  });

  const closeModal = () => {
    setSnackOpen(false);
    // window.location.reload(false);
  };

  //Image Multiple Select JS
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_IMAGES = 10;

  const handleFileChange = (e) => {
    const files = e.target.files;

    // Filter only image files
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    // Check if adding new images would exceed the limit
    if (selectedImages.length + imageFiles.length > MAX_IMAGES) {
      setErrorMessage(`You can upload a maximum of ${MAX_IMAGES} images.`);
    } else {
      // Reset error message if it was previously set
      setErrorMessage("");

      // Generate image previews
      const previews = imageFiles.map((file) => URL.createObjectURL(file));

      setSelectedImages((prevSelected) => [...prevSelected, ...imageFiles]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected.splice(index, 1);
      return updatedSelected;
    });

    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  const handleRemoveAllImages = () => {
    setSelectedImages([]);
    setImagePreviews([]);
  };

  //Modal Open
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenGuide = () => {
    setIsModalOpen(true);
  };

  //MUI STYLED
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  ////BACKEND REQUEST////
  const handleInput = (e) => {
    const { name, value } = e.target;
    setRentHouseLot((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    setRentHouseLot((prevState) => ({
      ...prevState,
      selectedAmenities: checked
        ? [...prevState.selectedAmenities, value]
        : prevState.selectedAmenities.filter((amenity) => amenity !== value),
    }));
  };

  const [rentHouseLot, setRentHouseLot] = useState({
    Listing_Status: "For Rent",
    PropTitle: "",
    PropDesc: "",
    PropCommVill: "",
    PropFurnish: "Fully Furnished",
    PropHouseLotType: "Bungalow",
    PropSize: "",
    PropLotArea: "",
    PropFloorArea: "",
    PropRate: "",
    PropPetAllowed: "Dog Allowed",
    PropAdd: "",
    PropCity: "Manila",
    PropNeighborhood: "",
    PropGoogleLink: "",
    selectedAmenities: [],
    houseLot_errs: [],
  });

  const RentHouseLot = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("Listing_Status", rentHouseLot.Listing_Status);
    // Add condoInfo data
    for (const [key, value] of Object.entries(rentHouseLot)) {
      if (key !== "selectedAmenities") {
        formData.append(key, value);
      }
    }
    formData.append(
      "selectedAmenities",
      JSON.stringify(rentHouseLot.selectedAmenities)
    );

    // Add images
    selectedImages.forEach((image) => {
      formData.append("images[]", image, image.name);
    });

    try {
      const App = getApp(); // Get token from localStorage or wherever you store it
      const config = {
        headers: {
          Authorization: `Bearer ${App}`, // Include token in Authorization header
        },
      };

      const response = await axios.post("/api/post-houseLot", formData, config);

      if (response.status === 201) {
        setErrorMessage("");
        handleRemoveAllImages();
        setRentHouseLot({
          PropTitle: "",
          PropDesc: "",
          PropCommVill: "",
          PropFurnish: "Fully Furnished",
          PropHouseLotType: "Bungalow",
          PropSize: "",
          PropLotArea: "",
          PropFloorArea: "",
          PropRate: "",
          PropAdd: "",
          PropPetAllowed: "Dog Allowed",
          PropCity: "",
          PropNeighborhood: "",
          PropGoogleLink: "",
          selectedAmenities: [],
          houseLot_errs: [],
        });
        setSnackOpen(true);
        setOpen(false);
      } else {
        setOpen(false);
        setRentHouseLot((prevState) => ({
          ...prevState,
          houseLot_errs: response.data.houseLot_errs,
        }));
        setSnackDanger({
          open: true,
          message:
            "An error occurred. Please double-check your input and try again.",
        });
      }
    } catch (error) {
      setOpen(false);
      setErrorMessage(error.response.data.error);
      if (error.response.status === 401) {
        setSnackDanger({ open: true, message: "Please log in." });
      }
      // console.log(error);
    }
  };

  const takeSrc = (GoogleLink) => {
    const srcRegex = /src="([^"]*)"/;
    const srcMatch = GoogleLink.match(srcRegex);
    const src = srcMatch ? srcMatch[1] : null;
    return src;
  };

  /*Modal Function*/
  const [open, setOpen] = useState(false);

  //Modal Style
  const circleStyle = {
    backgroundColor: "#F7C5C5", // Change to your desired background color
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <form>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <InputLabel id="PropTitle" sx={{ fontWeight: "bold", mb: 1 }}>
            Property Title:
          </InputLabel>
          <TextField
            required
            labelid="PropTitle"
            fullWidth
            placeholder="Enter Property Title"
            name="PropTitle"
            onChange={handleInput}
            value={rentHouseLot.PropTitle}
          />
          {rentHouseLot.houseLot_errs.PropTitle && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentHouseLot.houseLot_errs.PropTitle}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="PropDesc" sx={{ fontWeight: "bold", mb: 1 }}>
            Property Description:
          </InputLabel>
          <TextField
            fullWidth
            labelid="PropDesc"
            multiline
            required
            minRows={6}
            maxRows={6}
            placeholder="Enter Property Description"
            name="PropDesc"
            onChange={handleInput}
            value={rentHouseLot.PropDesc}
          />
          {rentHouseLot.houseLot_errs.PropDesc && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentHouseLot.houseLot_errs.PropDesc}
            </FormHelperText>
          )}
        </Grid>
      </Grid>

      <Grid container sx={{ mb: 3, gap: 2 }}>
        <Grid item xs={12} md={3.3}>
          <InputLabel id="Prop-Type-Select" sx={{ fontWeight: "bold", mb: 1 }}>
            Community/Village Name:
          </InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter Community/Village"
            required
            name="PropCommVill"
            value={rentHouseLot.PropCommVill}
            onChange={handleInput}
          />
          {rentHouseLot.houseLot_errs.PropCommVill && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {rentHouseLot.houseLot_errs.PropCommVill}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            <AutoAwesomeMosaicOutlinedIcon /> Size:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            fullWidth
            placeholder="0"
            inputMode="numeric"
            value={rentHouseLot.PropSize}
            onChange={handleInput}
            name="PropSize"
            required
            endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
          />
          {rentHouseLot.houseLot_errs.PropSize && (
            <FormHelperText sx={{ color: "tomato" }}>
              {rentHouseLot.houseLot_errs.PropSize}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            Lot Area:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            fullWidth
            placeholder="0"
            inputMode="numeric"
            value={rentHouseLot.PropLotArea}
            onChange={handleInput}
            required
            name="PropLotArea"
            endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
          />
          {rentHouseLot.houseLot_errs.PropLotArea && (
            <FormHelperText sx={{ color: "tomato" }}>
              {rentHouseLot.houseLot_errs.PropLotArea}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
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
            value={rentHouseLot.PropFloorArea}
            onChange={handleInput}
            required
            name="PropFloorArea"
            endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
          />
          {rentHouseLot.houseLot_errs.PropFloorArea && (
            <FormHelperText sx={{ color: "tomato" }}>
              {rentHouseLot.houseLot_errs.PropFloorArea}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            Rental Rate:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            fullWidth
            placeholder="0"
            inputMode="numeric"
            value={rentHouseLot.PropRate}
            onChange={handleInput}
            name="PropRate"
            required
            startAdornment={<InputAdornment position="start">₱</InputAdornment>}
          />
          {rentHouseLot.houseLot_errs.PropRate && (
            <FormHelperText sx={{ color: "tomato" }}>
              {rentHouseLot.houseLot_errs.PropRate}
            </FormHelperText>
          )}
        </Grid>
      </Grid>

      <Grid container sx={{ gap: 3, mb: 3 }}>
        <Grid item xs={12} md={2}>
          <InputLabel id="PropFurnish" sx={{ fontWeight: "bold", mb: 1 }}>
            <WeekendIcon /> Furnishing:
          </InputLabel>
          <Select
            labelid="Furnishing"
            id="Furnishing"
            fullWidth
            required
            name="PropFurnish"
            value={rentHouseLot.PropFurnish}
            onChange={handleInput}
          >
            <MenuItem value="Fully Furnished">Fully Furnished</MenuItem>
            <MenuItem value="Semi Furnished">Semi Furnished</MenuItem>
            <MenuItem value="Unfurnished">Unfurnished</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box>
            <InputLabel
              id="Prop-Type-Select"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              <HouseSidingIcon /> House Type:
            </InputLabel>
            <Select
              labelid="Prop-Type-Select"
              id="Property-Type-Select"
              fullWidth
              value={rentHouseLot.PropHouseLotType}
              onChange={handleInput}
            >
              <MenuItem value="Bungalow">Bungalow</MenuItem>
              <MenuItem value="SingAttach">Single Attached 2 Storey</MenuItem>
              <MenuItem value="SingDettach">Single Detached 2 Storey</MenuItem>
              <MenuItem value="Dupuy">Dupuy</MenuItem>
              <MenuItem value="Townhouse">Townhouse</MenuItem>
              <MenuItem value="House?">Row House</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </Box>
          {rentHouseLot.PropHouseLotType === "Others" && (
            <Box sx={{ mt: 4 }}>
              <TextField label="Please Specify" variant="outlined" fullWidth />
            </Box>
          )}
        </Grid>

        <Grid item md={3} xs={12}>
          <InputLabel id="PetTypes" sx={{ fontWeight: "bold", mb: 1 }}>
            <PetsIcon /> Pet Types:
          </InputLabel>
          <Select
            id="PetTypes"
            fullWidth
            value={rentHouseLot.PropPetAllowed}
            onChange={handleInput}
            name="PropPetAllowed"
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
      </Grid>

      <Stack sx={{ mt: 6, mb: 2, borderBottom: 1, py: 2 }} direction="column">
        <Typography
          sx={{
            fontFamily: '"Poppins",sans-serif',
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          <ChecklistIcon /> Property Features and Amenities
        </Typography>
      </Stack>

      {/*AMENITIES*/}
      <Grid container>
        <Grid item md={12}>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              px: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox value="Balcony" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <BalconyIcon /> Balcony
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Garage" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <GarageIcon /> Car Garage
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="AirConditioning"
                  onChange={handleCheckboxChange}
                />
              }
              label={
                <div>
                  <AcUnitIcon /> Air Conditioning
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Dishwasher" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <CountertopsIcon /> Dishwasher
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Disposal" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <DeleteOutlineIcon /> Disposal
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={<Checkbox value="Gym" onChange={handleCheckboxChange} />}
              label={
                <div>
                  <FitnessCenterIcon /> Gym Room
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Playroom" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <SportsEsportsIcon /> Playroom
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={<Checkbox value="Bar" onChange={handleCheckboxChange} />}
              label={
                <div>
                  <SportsBarIcon /> Bar Room
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Pool" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <PoolIcon /> Pool
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Thermostat" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <ThermostatIcon /> Thermostat
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="RooftopGarden"
                  onChange={handleCheckboxChange}
                />
              }
              label={
                <div>
                  <YardOutlinedIcon /> Rooftop Garden
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Playground" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <ChildCareOutlinedIcon /> Playground
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="StudyHall" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <MenuBookOutlinedIcon /> Study Room
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="BbqArea" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <KebabDiningOutlinedIcon /> Barbeque Area
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="GuestRoom" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <BoyIcon /> Guest Room
                </div>
              }
              sx={{ width: "222px" }}
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Stack sx={{ mt: 6, mb: 2, borderBottom: 1, py: 2 }} direction="column">
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

      <Grid container sx={{ display: "flex", gap: 3 }}>
        <Grid item xs={12}>
          <Box>
            <InputLabel id="PropAdd" sx={{ fontWeight: "bold", mb: 1 }}>
              Address:
            </InputLabel>
            <TextField
              required
              labelid="PropAdd"
              placeholder="Enter Property Address"
              name="PropAdd"
              fullWidth
              value={rentHouseLot.PropAdd}
              onChange={handleInput}
            />
            {rentHouseLot.houseLot_errs.PropAdd && (
              <FormHelperText sx={{ color: "tomato" }}>
                {rentHouseLot.houseLot_errs.PropAdd}
              </FormHelperText>
            )}
          </Box>

          <Box>
            <InputLabel id="PropAdd" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
              City:
            </InputLabel>
            <Select
              variant="outlined"
              labelid="Prop-Type-Select"
              value={rentHouseLot.PropCity}
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
            {rentHouseLot.houseLot_errs.PropCity && (
              <FormHelperText sx={{ color: "tomato" }}>
                {rentHouseLot.houseLot_errs.PropCity}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel
              id="PropNeighborhood"
              sx={{ fontWeight: "bold", mb: 1, mt: 2 }}
            >
              Neighborhood/Landmarks:
            </InputLabel>

            <TextField
              placeholder="Enter Neighborhood"
              value={rentHouseLot.PropNeighborhood}
              onChange={handleInput}
              name="PropNeighborhood"
              fullWidth
              required
            />

            {rentHouseLot.houseLot_errs.PropNeighborhood && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {rentHouseLot.houseLot_errs.PropNeighborhood}
              </FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="PropAdd" sx={{ fontWeight: "bold", mb: 1 }}>
            <MapIcon /> Google Map Link <br />
            <Link
              href="#heading-demo"
              onClick={handleOpenGuide}
              level="body-md"
              startDecorator={<Launch sx={{ fontSize: "medium", mt: 1 }} />}
            >
              How do I get Google Map link?
            </Link>
          </InputLabel>
          <TextField
            name="PropGoogleLink"
            labelid="PropAdd"
            placeholder="Paste link here"
            fullWidth
            value={rentHouseLot.PropGoogleLink}
            onChange={handleInput}
          />
          {rentHouseLot.houseLot_errs.PropGoogleLink && (
            <FormHelperText sx={{ color: "tomato" }}>
              {rentHouseLot.houseLot_errs.PropGoogleLink}
            </FormHelperText>
          )}
        </Grid>

        {rentHouseLot && rentHouseLot.PropGoogleLink ? (
          <Grid item md={12} xs={12} sx={{ height: "25rem" }}>
            <iframe
              title="Google Maps"
              src={takeSrc(rentHouseLot.PropGoogleLink)}
              style={{ width: "100%", height: "400px", border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
        ) : (
          <Box>
            <InfoIcon /> No Map Link Provided Yet.
          </Box>
        )}
      </Grid>

      <Stack sx={{ mt: 6, mb: 2, borderBottom: 1, py: 2 }} direction="column">
        <Typography
          sx={{
            fontFamily: '"Poppins",sans-serif',
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          <CollectionsSharpIcon /> Property Media
        </Typography>
      </Stack>
      <Stack sx={{ mb: 2 }}>
        <Alert variant="outlined" severity="info">
          <strong>Reminder:</strong> Kindly limit uploads to 10 pictures, all in
          landscape orientation.
        </Alert>
      </Stack>
      <Stack sx={{ textAlign: "center" }}>
        {selectedImages.length === 0 && (
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ height: "12rem" }}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              name="image[]"
              multiple
              onChange={handleFileChange}
            />
          </Button>
        )}
        <Stack direction="row">
          {imagePreviews.map((preview, index) => (
            <Box
              key={index}
              sx={{
                border: 1,
                position: "relative",
                display: "flex",
                marginRight: 2,
              }}
            >
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                style={{
                  maxWidth: "15rem",
                  maxHeight: "15rem",
                }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveImage(index)}
                sx={{ position: "absolute", right: 0, top: 0 }}
              >
                <DeleteIcon sx={{ fill: "#DB4437" }} />
              </IconButton>
            </Box>
          ))}
        </Stack>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {selectedImages.length > 0 && (
          <>
            <Box sx={{ p: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemoveAllImages}
              >
                Remove All Images
              </Button>
            </Box>
          </>
        )}
      </Stack>
      <Button
        variant="contained"
        type="button"
        onClick={() => setOpen(true)}
        sx={{
          mt: 2,
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
        <AddBoxOutlinedIcon className="me-1" /> Submit Property
      </Button>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        color="success"
        variant="solid"
        onClose={closeModal}
      >
        <DoneAllIcon /> Form submitted successfully.
      </Snackbar>
      <Snackbar
        open={snackDanger.open}
        autoHideDuration={4000}
        onClose={() => setSnackDanger({ ...snackDanger, open: false })}
        color="danger"
        variant="solid"
      >
        <ErrorIcon /> {snackDanger.message}
      </Snackbar>
      <StepsGuide open={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/*Modal*/}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        <ModalDialog>
          <Box>
            <div style={circleStyle}>
              <ErrorOutlineIcon sx={{ color: "#C41C1C" }} />
            </div>
            <ModalClose variant="plain" sx={{ mt: 2 }} />
          </Box>

          <Box sx={{ mt: 1 }}>
            <Joy level="h4">Submit Property?</Joy>
            <Divider
              inset="context"
              sx={{ backgroundColor: "#636B74", mt: 1.5 }}
            />
            <Joy level="title-md" sx={{ mt: 2 }}>
              Are you sure you want to submit this property? You can no longer edit this later.
            </Joy>
            <ModalButton
              fullWidth
              sx={{ mt: 2 }}
              size="md"
              onClick={RentHouseLot}
            >
              Yes
            </ModalButton>
          </Box>
        </ModalDialog>
      </Modal>
    </form>
  );
}

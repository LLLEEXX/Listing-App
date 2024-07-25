import { useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Alert,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Stack,
  Typography,
  Button,
  styled,
  IconButton,
  FormHelperText,
} from "@mui/material";

import * as React from "react";
import { Link, Snackbar, Modal, ModalDialog, ModalClose, Button as ModalButton, Divider, Typography as Joy } from "@mui/joy";


//MUI ICONS
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WeekendIcon from "@mui/icons-material/Weekend";
import PetsIcon from "@mui/icons-material/Pets";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BalconyIcon from "@mui/icons-material/Balcony";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GarageIcon from "@mui/icons-material/Garage";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CountertopsIcon from "@mui/icons-material/Countertops";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import MapIcon from "@mui/icons-material/Map";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CollectionsSharpIcon from "@mui/icons-material/CollectionsSharp";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PoolIcon from "@mui/icons-material/Pool";
import GroupsIcon from "@mui/icons-material/Groups";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import CameraOutdoorOutlinedIcon from "@mui/icons-material/CameraOutdoorOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import KebabDiningOutlinedIcon from "@mui/icons-material/KebabDiningOutlined";
import Launch from "@mui/icons-material/Launch";
import InfoIcon from "@mui/icons-material/Info";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorIcon from "@mui/icons-material/Error";

//Step IMPORT
import StepsGuide from "../PostingRent/StepsGuide";

import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

export default function SaleCondo() {
  //Includions Data
  const inclusions = [
    "Capital Gain Tax",
    "Tranfer Fees",
    "Brokers Commission",
    "VAT",
    "Clean Title",
    "Others",
  ];
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

  //Modal Open
  const [isModalOpen, setIsModalOpen] = useState(false);

  //BACKEND REQUEST
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    setSaleCondo((prevState) => ({
      ...prevState,
      selectedAmenities: checked
        ? [...prevState.selectedAmenities, value]
        : prevState.selectedAmenities.filter((amenity) => amenity !== value),
    }));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSaleCondo((prevState) => ({
      ...prevState,
      selectedInclusions: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSaleCondo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [saleCondo, setSaleCondo] = useState({
    PropBuildingName: "",
    PropTitle: "",
    PropDesc: "",
    PropBaths: "1",
    PropBeds: "1",
    PropRate: "",
    PropFurnish: "Fully Furnished",
    otherInclusions: "",
    PropPetAllowed: "Dog Allowed",
    PropAdd: "",
    PropCity: "Manila",
    PropNeighborhood: "",
    PropGoogleLink: "",
    selectedAmenities: [],
    selectedInclusions: [],
    condo_errs: [],
  });

  const SaleCondo = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add condoInfo data
    for (const [key, value] of Object.entries(saleCondo)) {
      if (key !== "selectedAmenities" && key !== "selectedInclusions") {
        formData.append(key, value);
      }
    }

    formData.append(
      "selectedInclusions",
      JSON.stringify(saleCondo.selectedInclusions)
    );

    formData.append(
      "selectedAmenities",
      JSON.stringify(saleCondo.selectedAmenities)
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

      const response = await axios.post("/api/sale-condo", formData, config);

      if (response.status === 201) {
        setErrorMessage("");
        handleRemoveAllImages();
        setSaleCondo({
          PropBuildingName: "",
          PropTitle: "",
          PropDesc: "",
          PropBaths: "1",
          PropBeds: "1",
          PropRate: "",
          PropFurnish: "Fully Furnished",
          otherInclusions: "",
          PropPetAllowed: "Dog Allowed",
          PropAdd: "",
          PropCity: "Manila",
          PropNeighborhood: "",
          PropGoogleLink: "",
          selectedAmenities: [],
          selectedInclusions: [],
          condo_errs: [],
        });
        setSnackOpen(true);
        setOpen(false);
      } else {
        setOpen(false);
        setSaleCondo((prevState) => ({
          ...prevState,
          condo_errs: response.data.condo_errs,
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
        setSnackDanger({ open: true, message: "Please log in first." });
      }
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
      <Grid container sx={{ gap: 2 }}>
        <Grid item xs={12}>
          <InputLabel id="PropTitle" sx={{ fontWeight: "bold", mb: 1 }}>
            Property Title:
          </InputLabel>
          <TextField
            required
            labelid="PropTitle"
            fullWidth
            placeholder="Enter Property Title"
            name="PropTitle"
            value={saleCondo.PropTitle}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="PropDesc" sx={{ fontWeight: "bold", mb: 1 }}>
            Property Description:
          </InputLabel>
          <TextField
            fullWidth
            labelid="PropDesc"
            multiline
            minRows={6}
            maxRows={6}
            placeholder="Enter Property Description"
            name="PropDesc"
            value={saleCondo.PropDesc}
            onChange={handleInput}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>
            Building Name:
          </InputLabel>
          <TextField
            placeholder="Enter Building Name"
            variant="outlined"
            name="PropBuildingName"
            fullWidth
            value={saleCondo.PropBuildingName}
            onChange={handleInput}
            required
          />
          {saleCondo.condo_errs.PropBuildingName && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {saleCondo.condo_errs.PropBuildingName}
            </FormHelperText>
          )}
        </Grid>

        <Grid item md={1} xs={12}>
          <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>
            <BathtubIcon sx={{ marginRight: "5px" }} />
            Baths:
          </InputLabel>
          <Select
            variant="outlined"
            labelid="Prop-Type-Select"
            value={saleCondo.PropBaths}
            onChange={handleInput}
            size="md"
            name="PropBaths"
            fullWidth
            sx={{
              fontSize: "17px",
            }}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
          {saleCondo.condo_errs.PropBaths && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {saleCondo.condo_errs.PropBaths}
            </FormHelperText>
          )}
        </Grid>

        <Grid item md={1} xs={12}>
          <InputLabel id="Prop-Type-Select" sx={{ fontWeight: "bold", mb: 1 }}>
            <BedIcon /> Beds:
          </InputLabel>
          <Select
            variant="outlined"
            labelid="Prop-Type-Select"
            value={saleCondo.PropBeds}
            onChange={handleInput}
            size="md"
            name="PropBeds"
            fullWidth
            sx={{
              fontSize: "17px",
            }}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
          {saleCondo.condo_errs.PropBeds && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {saleCondo.condo_errs.PropBeds}
            </FormHelperText>
          )}
        </Grid>

        <Grid item md={2.3} xs={12}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            Selling Price:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            fullWidth
            placeholder="0"
            inputMode="numeric"
            startAdornment={<InputAdornment position="start">₱</InputAdornment>}
            name="PropRate"
            value={saleCondo.PropRate}
            onChange={handleInput}
            required
          />
          {saleCondo.condo_errs.PropRate && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {saleCondo.condo_errs.PropRate}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={3} xs={12}>
          <InputLabel id="PropFurnish" sx={{ fontWeight: "bold", mb: 1 }}>
            <WeekendIcon /> Furnishing:
          </InputLabel>
          <Select
            labelid="Furnishing"
            id="Furnishing"
            fullWidth
            defaultValue={saleCondo.PropFurnish}
            name="PropFurnish"
            onChange={handleInput}
          >
            <MenuItem value="Fully Furnished">Fully Furnished</MenuItem>
            <MenuItem value="Semit Furnished">Semi Furnished</MenuItem>
            <MenuItem value="Unfurnished">Unfurnished</MenuItem>
          </Select>
        </Grid>
        <Grid container sx={{ gap: 5 }}>
          <Grid item xs={12} md={4}>
            <InputLabel htmlFor="InclusionSelect" sx={{ mb: 1 }}>
              <span style={{ fontWeight: "bold" }}>Inclusions: </span>(
              <span style={{ fontStyle: "italic", color: "grey" }}>
                Select all that applies
              </span>
              )
            </InputLabel>
            <Select
              id="InclusionSelect"
              multiple
              fullWidth
              value={saleCondo.selectedInclusions}
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) =>
                selected.length === 0
                  ? "Choose all that applies"
                  : selected.join(", ")
              }
            >
              {inclusions.map((inclusion) => (
                <MenuItem key={inclusion} value={inclusion}>
                  {inclusion}
                </MenuItem>
              ))}
            </Select>
            {saleCondo.selectedInclusions.includes("Others") && (
              <Box sx={{ mt: 4 }}>
                <TextField
                  label="Please Specify"
                  variant="outlined"
                  name="otherInclusions"
                  value={saleCondo.otherInclusions}
                  onChange={handleInput}
                  sx={{ width: { md: "13.5rem", xs: "100%" } }}
                />
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
              value={saleCondo.PropPetAllowed}
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
              <MenuItem value="No Pet Allowed Allowed">
                No Pets Allowed
              </MenuItem>
            </Select>
          </Grid>
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
          {" "}
          <ChecklistIcon /> Property Features and Amenities
        </Typography>
      </Stack>

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
                <Checkbox value="Parking" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <DirectionsCarIcon /> Parking
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
                  <FitnessCenterIcon /> Gym
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
                  <SportsBarIcon /> Bar
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
                <Checkbox value="Concierge" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <GroupsIcon /> Concierge
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
                <Checkbox value="Security" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <CameraOutdoorOutlinedIcon /> 24/7 Security
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="RooftopDeck" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <DeckOutlinedIcon /> Rooftop Deck
                </div>
              }
              sx={{ width: "222px" }}
            />
            <FormControlLabel
              control={
                <Checkbox value="Lounge" onChange={handleCheckboxChange} />
              }
              label={
                <div>
                  <WeekendOutlinedIcon /> Lounge
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
                  <MenuBookOutlinedIcon /> Study Hall
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
              //required
              labelid="PropAdd"
              placeholder="Enter Property Address"
              name="PropAdd"
              fullWidth
              required
              value={saleCondo.PropAdd}
              onChange={handleInput}
            />
            {saleCondo.condo_errs.PropAdd && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {saleCondo.condo_errs.PropAdd}
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
              value={saleCondo.PropCity}
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
            {saleCondo.condo_errs.PropCity && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {saleCondo.condo_errs.PropCity}
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
              value={saleCondo.PropNeighborhood}
              onChange={handleInput}
              name="PropNeighborhood"
              fullWidth
              required
            />

            {saleCondo.condo_errs.PropNeighborhood && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {saleCondo.condo_errs.PropNeighborhood}
              </FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="PropAdd" sx={{ fontWeight: "bold", mb: 1 }}>
            <MapIcon /> Google Map Link <br />
            <Link
              href="#heading-demo"
              onClick={() => setIsModalOpen(true)}
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
            value={saleCondo.PropGoogleLink}
            onChange={handleInput}
          />
        </Grid>
        {saleCondo && saleCondo.PropGoogleLink ? (
          <Grid item md={12} xs={12} sx={{ height: "25rem" }}>
            <iframe
              title="Google Maps"
              src={takeSrc(saleCondo.PropGoogleLink)}
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

      <StepsGuide open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        color="success"
        variant="solid"
        onClose={closeModal}
      >
        Form Submitted Successfully.
      </Snackbar>
      <Snackbar
        open={snackDanger.open}
        autoHideDuration={4000}
        color="danger"
        variant="solid"
        onClose={() => setSnackDanger({ ...snackDanger, open: false })}
      >
        <ErrorIcon /> {snackDanger.message}
      </Snackbar>

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
              onClick={SaleCondo}
            >
              Yes
            </ModalButton>
          </Box>
        </ModalDialog>
      </Modal>
    </form>
  );
}

import { useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  Stack,
  Typography,
  Button,
  styled,
  IconButton,
  Alert,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";

import * as React from "react";
import { Link, Snackbar, Modal, ModalDialog, ModalClose, Button as ModalButton, Divider, Typography as Joy } from "@mui/joy";

//MUI ICONS
import ErrorIcon from "@mui/icons-material/Error";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import Launch from "@mui/icons-material/Launch";
import CollectionsSharpIcon from "@mui/icons-material/CollectionsSharp";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import InfoIcon from "@mui/icons-material/Info";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

//Step IMPORT
import StepsGuide from "../PostingRent/StepsGuide";

import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

export default function SaleOffice() {
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
  const handleInput = (e) => {
    const { name, value } = e.target;
    setSaleOffice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackDanger, setSnackDanger] = useState({
    open: false,
    message: "",
  });
  const closeModal = () => {
    setSnackOpen(false);
    // window.location.reload(false);
  };
  const [saleOffice, setSaleOffice] = useState({
    PropTitle: "",
    PropDesc: "",
    PropSize: "",
    PropPurpose: "",
    PropRate: "",
    PropAdd: "",
    PropCity: "Manila",
    PropNeighborhood: "",
    PropGoogleLink: "",
    office_errs: [],
  });

  const SaleOffice = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add condoInfo data
    for (const [key, value] of Object.entries(saleOffice)) {
      formData.append(key, value);
    }

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

      const response = await axios.post("/api/sale-office", formData, config);

      if (response.status === 201) {
        setErrorMessage("");
        handleRemoveAllImages();
        setSaleOffice({
          PropTitle: "",
          PropDesc: "",
          PropSize: "",
          PropPurpose: "",
          PropRate: "",
          PropAdd: "",
          PropCity: "Manila",
          PropNeighborhood: "",
          PropGoogleLink: "",
          office_errs: [],
        })
        setSnackOpen(true);
        setOpen(false);
      } else {
        setOpen(false);
        setSaleOffice((prevState) => ({
          ...prevState,
          office_errs: response.data.office_errs,
        }));
        setSnackDanger({ open: true, message: 'An error occurred. Please double-check your input and try again.' });
      }
    } catch (error) {
      setOpen(false);
      setErrorMessage(error.response.data.error);
      if (error.response.status === 401) {
        setSnackDanger({ open: true, message: "Please log in first." });
      }
    }
  };

    /*Modal Function*/
    const [open, setOpen] = React.useState(false);

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

  const takeSrc = (GoogleLink) => {
    const srcRegex = /src="([^"]*)"/;
    const srcMatch = GoogleLink.match(srcRegex);
    const src = srcMatch ? srcMatch[1] : null;
    return src;
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
            value={saleOffice.PropTitle}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="PropDesc" sx={{ fontWeight: "bold" }}>
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
            value={saleOffice.PropDesc}
            onChange={handleInput}
            required
          />
        </Grid>
        <Grid item md={1} xs={12}>
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
            endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
            name="PropSize"
            value={saleOffice.PropSize}
            onChange={handleInput}
            required
          />
          {saleOffice.office_errs.PropSize && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {saleOffice.office_errs.PropSize}
            </FormHelperText>
          )}
        </Grid>
        <Grid item md={2.8} xs={12}>
          <InputLabel id="Prop-Type-Select" sx={{ fontWeight: "bold", mb: 1 }}>
            Purpose:
          </InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="(Recommended For)"
            name="PropPurpose"
            value={saleOffice.PropPurpose}
            onChange={handleInput}
            required
          />
        </Grid>
        <Grid item md={1.5} xs={12}>
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
            value={saleOffice.PropRate}
            onChange={handleInput}
            required
          />
          {saleOffice.office_errs.PropRate && (
            <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
              {saleOffice.office_errs.PropRate}
            </FormHelperText>
          )}
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
              value={saleOffice.PropAdd}
              onChange={handleInput}
            />
            {saleOffice.office_errs.PropAdd && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {saleOffice.office_errs.PropAdd}
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
              value={saleOffice.PropCity}
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
            {saleOffice.office_errs.PropCity && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {saleOffice.office_errs.PropCity}
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
              value={saleOffice.PropNeighborhood}
              onChange={handleInput}
              name="PropNeighborhood"
              fullWidth
              required
            />

            {saleOffice.office_errs.PropNeighborhood && (
              <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                {saleOffice.office_errs.PropNeighborhood}
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
            value={saleOffice.PropGoogleLink}
            onChange={handleInput}
            required
          />
        </Grid>
        {saleOffice && saleOffice.PropGoogleLink ? (
          <Grid item md={12} xs={12} sx={{ height: "25rem" }}>
            <iframe
              title="Google Maps"
              src={takeSrc(saleOffice.PropGoogleLink)}
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
          <strong>Reminder:</strong> Kindly limit uploads to 10 pictures, all in landscape orientation.
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
        onClick={() => setOpen(true)}
        type="button"
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
        Form submitted successfully.
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
              onClick={SaleOffice}
            >
              Yes
            </ModalButton>
          </Box>
        </ModalDialog>
      </Modal>
    </form>
  );
}

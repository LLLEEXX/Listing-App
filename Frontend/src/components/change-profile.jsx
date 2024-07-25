import React, { useState, useEffect } from "react";
import { getApp } from "../utility/AppManager";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "../utility/axios";

const BackgroundWrapper = styled("div")(({ theme }) => ({
  width: "60vw",
  height: "200px",
  backgroundImage: "url(/assets/pikb29.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  position: "relative",
  border: "2px solid #fff",
  [theme.breakpoints.down("sm")]: {
    width: "80vw",
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid #fff",
}));

const ChangeProfileButton = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    const App = getApp(); // Get token from localStorage or wherever you store it
        const config = {
          headers: {
            Authorization: `Bearer ${App}`, // Include token in Authorization header
          },
        };
    axios.get("/api/fetch-profile-image",config)
      .then(response => {
        console.log("Response data:", response.data.profile_image); // Log the response data

        if (response.data.profile_image) {
          setProfileImage(`http://127.0.0.1:8000/storage/${response.data.profile_image}`);

        }
      })
      .catch(error => {
        console.error("Error fetching profile image:", error);
      });
  }, []);

  const handleFileInputClick = (e) => {
    e.stopPropagation();
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile){
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(selectedFile);
      setImagePreview(imageUrl);
      setIsCropping(true);
    }
      
  };

  const handleSaveCrop = async () => {
    if (selectedImage) {
      try {
        const App = getApp(); // Get token from localStorage or wherever you store it
        const config = {
          headers: {
            Authorization: `Bearer ${App}`, // Include token in Authorization header
          },
        };
        const formData = new FormData();
        formData.append("profile_image", selectedImage);
        await axios.post("/api/update-profile-image", formData, config);
        window.location.reload();
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    } else {
      console.error("No image selected.");
    }
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="test"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isCropping ? (
          <Avatar
            src={imagePreview || profileImage}
            sx={{ width: 150, height: 150, cursor: "pointer" }}
            onClick={handleFileInputClick}
          />
        ) : (
          <Button
            onClick={handleFileInputClick}
            sx={{ textTransform: "none", color: "inherit", padding: 0 }}
          >
            <BackgroundWrapper onClick={handleFileInputClick}>
              <ProfileAvatar src={profileImage} alt="Profile Picture" />
            </BackgroundWrapper>
          </Button>
        )}
        {isCropping && (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button onClick={handleCancelCrop} variant="outlined" sx={{}}>
              Cancel
            </Button>
            <Button onClick={handleSaveCrop} variant="contained" sx={{}}>
              Save
            </Button>
          </Stack>
        )}
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default ChangeProfileButton;

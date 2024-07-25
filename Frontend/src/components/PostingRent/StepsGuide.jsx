//MUI JOY IMPORTS
import JoyModal from "@mui/joy/Modal";
import JoyModalClose from "@mui/joy/ModalClose";
import JoyTypography from "@mui/joy/Typography";
import JoySheet from "@mui/joy/Sheet";

//Import images
import Step2 from "../../assets/web-Step2.png";
import Step3 from "../../assets/web-Step3.png";
import Step4 from "../../assets/web-Step4.png";
import Step5 from "../../assets/web-Step5.png";
import Step6 from "../../assets/web-Step6.png";

import { Box } from "@mui/material";

export default function StepsGuide({ open, onClose }) {
  //Step in getting google map link
  const StepWithImage = ({ description, imageUrl }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        alignItems: "left",
        marginBottom: "10px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          {description}
        </span>
      </div>
      <div>
        <img
          src={imageUrl}
          alt={`Step Image`}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
  return (
    <Box>
      <JoyModal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <JoySheet
          variant="outlined"
          sx={{
            maxWidth: 800,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            maxHeight: "90vh", // Set maximum height for the modal
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <JoyModalClose variant="plain" sx={{ m: 1 }} />
          <JoyTypography
            component="h1"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
          >
            How to Get a Google Maps Link
          </JoyTypography>
          <JoyTypography
            component="h4"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="sm"
            mb={2}
          >
            This helps the site pin the location more accurately
          </JoyTypography>
          <JoyTypography id="modal-desc" textColor="text.tertiary">
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Stack elements vertically
                alignItems: "left",
                marginBottom: "10px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  1.Open Google Maps in your web browser.
                </span>
              </div>
            </div>
            <StepWithImage
              description="2.Search for the location using the name or address."
              imageUrl={Step2}
            />
            <StepWithImage
              description="3.Locate the place on the map and drop a pin or select the marker."
              imageUrl={Step3}
            />
            <StepWithImage
              description="4.Click the 'Share' button on the information card at the bottom."
              imageUrl={Step4}
            />
            <StepWithImage
              description="5.Go to 'Embed a map'."
              imageUrl={Step5}
            />
            <StepWithImage
              description="5.Click 'COPY HTML' and paste the link in your  Google Map Link textbox"
              imageUrl={Step6}
            />
          </JoyTypography>
        </JoySheet>
      </JoyModal>
    </Box>
  );
}

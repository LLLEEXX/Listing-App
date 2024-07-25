// CSS
import "./../assets/forgot-pass.css";
import { useState, useEffect } from "react";

// MUI Joy
import {
  Card,
  Typography,
  Divider,
  Input,
  Button,
  Sheet,
  Modal,
  ModalClose,
} from "@mui/joy";

// Icons
import MailIcon from "@mui/icons-material/Mail";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import axios from "../utility/axios";

function ForgotPass() {

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const forgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/forgot-password", { email: email });
      if (response.status === 200) {
        console.log(response.data.message);
        setShowModal(true);
      } else {
        console.error("Failed to retrieve user data:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <form
      onSubmit={forgotPassword}
      className="fp-container d-flex align-items-center justify-content-center text-center"
    >
      <Card color="primary" size="lg" sx={{ backgroundColor: "transparent", width: "750px" }}>
        <img src="assets/mobile-password-forgot.png" className="fp-img" />
        <Typography level="h1">Forgot Password?</Typography>
        <Divider
          sx={{
            mb: 1,
            backgroundColor: "#0B6BCB",
            width: "15%",
            height: "2.5px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></Divider>
        <Typography sx={{ mb: 3 }}>
          <strong>No biggie!</strong> Enter your registered email below to receive password reset
          instruction
        </Typography>
        <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
          Email Address:
        </Typography>
        <Input
          startDecorator={<MailIcon />}
          placeholder="Email Adress"
          sx={{ mb: 1 }}
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
          name="email"
        />
        <Button
          type="submit"
          endDecorator={<ArrowForwardIcon />}
          color="primary"
        >
          Submit
        </Button>
      </Card>

      {/* Modal for success message */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={showModal} onClose={handleCloseModal}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center"
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <img src="assets/link-scc.png" className="scc-png mb-4" />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            fontFamily={"'Poppins', sans-serif"}
            mb={1}
          >
            Password Reset Link Sent
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary" fontFamily={"'Poppins', sans-serif"}>
            We have sent a password recovery instructions to your Email Address.
          </Typography>
        </Sheet>
      </Modal>

    </form>
  );
}
export default ForgotPass;

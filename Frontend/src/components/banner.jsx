import { Button, Carousel, Row, Col } from "react-bootstrap";
import "./../assets/banner.css";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

import { Typography } from "@mui/material";

//Translation
import { useTranslation } from "react-i18next";

import axios from "../utility/axios";

function Banner() {
  //Translation
  const { t } = useTranslation("global");

  const [displayBanner, setDisplayedBanner] = useState([]);

  useEffect(() => {
    const fetchServicesBanner = async () => {
      try {
        const response = await axios.get(`/api/fetch-banner`, {
          params: {
            limit: 10,
            expiredAtNotNull: true,
          },
        });
        setDisplayedBanner(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServicesBanner();
  }, []);

  return (
    <Row className="banner-card">
      <Col xs={12} md={7} className="contentb">
        <h2 className="fw-bold">{t("Banner.Title")}</h2>
        <p>
          {t("Banner.DesBanner")}
          <strong> Property Web Hub</strong> {t("Banner.DesBannerTwo")}
        </p>
        <Link to="/ApplyService">
          <Button className="bann-btn me-2" variant="outline-light">
            {t("Banner.ApplyServ")}
          </Button>
        </Link>
        <Link to="/AdvertiseService">
          <Button className="bann-btn me-2" variant="outline-light">
            {t("Banner.AdvServ")}
          </Button>
        </Link>
        <Link to="/property">
          <Button className="bann-btn" variant="outline-light">
            {t("Banner.ServicesBtn")} <Icon.ArrowRight />
          </Button>
        </Link>
      </Col>

      <Col xs={12} md={5} className="ft-company">
        <div className="carouselContainer-banner">
          <Carousel interval={1600} className="carouselLogo">
            {displayBanner.length > 0 ? (
              displayBanner.map((imagePath, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={`http://127.0.0.1:8000/storage/${imagePath}`}
                    className="carousel-image"
                    alt={`Banner ${index + 1}`}
                  />
                </Carousel.Item>
              ))
            ) : (
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: '35rem'
                }}
              >
                No services advertise yet
              </Typography>
            )}
          </Carousel>
        </div>
      </Col>
    </Row>
  );
}

export default Banner;

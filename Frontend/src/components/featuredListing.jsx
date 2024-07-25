import { Carousel, Row, Col, Badge } from "react-bootstrap";
import "./../assets/featuredListing.css";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import { Typography } from "@mui/material";
import axios from "../utility/axios";

//Translation
import { useTranslation } from "react-i18next";

import InfoIcon from "@mui/icons-material/Info";

function FeaturedListing() {
  //Translation
  const { t } = useTranslation("global");

  const navigate = useNavigate();

  const [newProp, setNewProp] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/latest-property-listings");
        setNewProp(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const getPropertyName = (modelName) => {
    switch (modelName) {
      case "Rent_Condo":
        return "Condominium";
      case "PostHouseLot":
        return "House and Lot";
      case "PostLot":
        return "Lot";
      case "PostWareHouse":
        return "Warehouse";
      case "PostCommSpace":
        return "Commercial Space";
      case "PostOffice":
        return "Office";
      case "SaleCondo":
        return "Condominium";
      case "SaleHouseLot":
        return "House And Lot";
      case "SaleLot":
        return "Lot";
      case "SaleWareHouse":
        return "Warehouse";
      case "SaleCommSpace":
        return "Commercial Space";
      case "SaleOffice":
        return "Office";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="featuredCon">
      {newProp && newProp.data.length > 0 && (
        <div className="header-new-listing ms-4">
          <h2 className="new-listing-title">{t("FeaturedList.Title")}</h2>
          <Link to="/explorePage">
            <span className="subNewListing">
              {t("FeaturedList.subTitle")} <TrendingFlatIcon className="icon" />
            </span>
          </Link>
        </div>
      )}
      <Row className="mx-auto">
        {newProp && newProp.data.length > 0 ? (
          newProp.data.map((property) => (
            <Col key={property.id} xs={12} md={3}>
              <div className="__area text-center">
                <div className="__card">
                  <Carousel interval={null}>
                    {property.images.map((image) => (
                      <Carousel.Item key={image.id}>
                        <img
                          src={`http://127.0.0.1:8000/storage/${image.path}`}
                          className="img-fluid __img"
                          alt="Property-Image"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div
                    className="__card_detail text-left"
                    onClick={() =>
                      navigate(`/viewing/${property.id}/${property.modelName}`)
                    }
                  >
                    <h6
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        minHeight: "22px",
                      }}
                    >
                      {property.title}
                    </h6>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "90%",
                      }}
                    >
                      {property.address}
                    </p>
                    <div className="__type">
                      <span>
                        <Icon.Building /> {getPropertyName(property.modelName)}
                      </span>
                      <span className="newListingName">{property.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "#0B6BCB",
              fontWeight: "bold",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1
            }}
          >
            <InfoIcon />
            No Posted Listing Yet
          </Typography>
        )}
      </Row>
    </div>
  );
}
export default FeaturedListing;

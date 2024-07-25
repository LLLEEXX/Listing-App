import "../assets/SearchTab.css";
import { Form, Button } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//Translation
import { useTranslation } from "react-i18next";

//MUI Joy
import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import FormControl from "@mui/joy/FormControl";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input";

// import { Select, MenuItem } from "@mui/material";

//Icons
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import VillaIcon from "@mui/icons-material/Villa";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

export const SearchTab = () => {
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation("global");
  const [searchTabWidth, setSearchTabWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleSearchTabResize = () => {
      setSearchTabWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleSearchTabResize);

    return () => {
      window.removeEventListener("resize", handleSearchTabResize);
    };
  }, []);

  const screenSearchTab = searchTabWidth <= 940;

  const navigate = useNavigate();

  return (
    <>
      <section className="search-Tab-Container">
        <div className="d-flex justify-content-center sT-Title">
          <h2>{t("SearchTab.Title")}</h2>
        </div>
        <div className="dropdown-Container">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const status = formData.get("status");
              const propertyType = formData.get("propertyType");
              const city = formData.get("city");
              const url = `quick-search/${status}/${propertyType}/${city}`;
              navigate(url);
            }}
          >
            <Form.Group
              controlId="searchTab.SelectCustom"
              className="form-Group-Search-Tab"
            >
              <Select
                color="neutral"
                size="lg"
                variant="plain"
                defaultValue="buy"
                name="status"
                indicator={<KeyboardArrowDown />}
                sx={{
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                <Option value="buy">Buy</Option>
                <Option value="rent">Rent</Option>
              </Select>

              <Select
                color="neutral"
                size="lg"
                variant="plain"
                startDecorator={<VillaIcon />}
                defaultValue="condominium"
                name="propertyType"
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 360,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                <Option value="condominium"> Condominium</Option>
                <Option value="houseandlot"> House and Lot</Option>
                <Option value="lot">Lot</Option>
                <Option value="warehouse">Warehouse</Option>
                <Option value="commercialspace">Commercial Space</Option>
                <Option value="Office">Office</Option>
              </Select>

              <Input
                size="lg"
                startDecorator={<FmdGoodIcon />}
                placeholder="Enter City"
                name="city"
              />

              <button
                type="submit"
                className="d-flex align-items-center btn btn-lg btn-outline-light justify-content-center"
              >
                <SearchIcon className="me-1" /> Search
              </button>
            </Form.Group>
          </form>
        </div>
      </section>
    </>
  );
};

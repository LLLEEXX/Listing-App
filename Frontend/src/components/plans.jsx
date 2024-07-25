import "./../assets/plans.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//MUI Icons
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

import axios from "../utility/axios";

function Plans() {
  const [activePlan, setActivePlan] = useState("monthly");

  const handlePlanChange = (newPlan) => {
    setActivePlan(newPlan);
  };

  const [price, setPrice] = useState(null);

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSubscription = async () => {
      try {
        const response = await axios.get("/api/fetch-price");

        if (response.status === 200) {
          setPrice(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubscription();
  }, []);

  // Define plan details for monthly and annually
  const planDetails = {
    monthly: {
      basic: {
        redCoins: 10,
        silverCoins: 0,
        rentalLimit: "40k",
        saleLimit: "5M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Monthly(Basic)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/monthlyBasic",
      },
      standard: {
        redCoins: 10,
        silverCoins: 5,
        rentalLimit: "60k",
        saleLimit: "10M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Monthly(Standard)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/monthlyStandard",
      },
      pro: {
        redCoins: 20,
        silverCoins: 10,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Monthly(pro)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/monthlyPro",
      },
      master: {
        redCoins: 30,
        silverCoins: 20,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Monthly(Master)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/monthlyMaster",
      },
    },
    quarterly: {
      basic: {
        redCoins: 30,
        silverCoins: 0,
        rentalLimit: "40k",
        saleLimit: "5M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Quarterly(Basic)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/quarterlyBasic",
      },
      standard: {
        redCoins: 30,
        silverCoins: 15,
        rentalLimit: "60k",
        saleLimit: "10M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Quarterly(Standard)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/quarterlyStandard",
      },
      pro: {
        redCoins: 60,
        silverCoins: 30,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Quarterly(pro)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/quarterlyPro",
      },
      master: {
        redCoins: 90,
        silverCoins: 60,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Quarterly(Master)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/quarterlyMaster",
      },
    },
    semiannual: {
      basic: {
        redCoins: 60,
        silverCoins: 0,
        rentalLimit: "40k",
        saleLimit: "5M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Semi-Annual(Basic)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/semiBasic",
      },
      standard: {
        redCoins: 60,
        silverCoins: 30,
        rentalLimit: "60k",
        saleLimit: "10M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Semi-Annual(Standard)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/semiStandard",
      },
      pro: {
        redCoins: 120,
        silverCoins: 60,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Semi-Annual(pro)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/semiPro",
      },
      master: {
        redCoins: 180,
        silverCoins: 120,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Semi-Annual(Master)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/semiMaster",
      },
    },
    annually: {
      basic: {
        redCoins: 120,
        silverCoins: 0,
        rentalLimit: "40k",
        saleLimit: "5M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Annually(Basic)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/annualBasic",
      },
      standard: {
        redCoins: 120,
        silverCoins: 60,
        rentalLimit: "60k",
        saleLimit: "10M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Annually(Standard)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/annualStandard",
      },
      pro: {
        redCoins: 240,
        silverCoins: 120,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Annually(pro)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/annualPro",
      },
      master: {
        redCoins: 360,
        silverCoins: 240,
        rentalLimit: "80k",
        saleLimit: "20M",
        price:
          price &&
          price.data &&
          price.data
            .find((item) => item.subscription === "Annually(Master)")
            .price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            })
            .replace("₱", ""),
        path: "/annualMaster",
      },
    },
  };

  const activeDetails = planDetails[activePlan];

  return (
    <>
      <section className="section-pricing">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="header-section-plans">
                <h2 className="plans-title">Price & Plans</h2>
                <p className="description">
                  Discover the perfect subscription plan tailored to meet your
                  unique needs at <strong>Property Web Hub.</strong>{" "}
                </p>
                <div className="plans-buttons">
                  <span
                    className={`monthly ${
                      activePlan === "monthly" ? "active" : ""
                    }`}
                    onClick={() => handlePlanChange("monthly")}
                  >
                    Monthly
                  </span>
                  <span
                    className={`quarterly ${
                      activePlan === "quarterly" ? "active" : ""
                    }`}
                    onClick={() => handlePlanChange("quarterly")}
                  >
                    Quarterly
                  </span>
                  <span
                    className={`semiannual ${
                      activePlan === "semiannual" ? "active" : ""
                    }`}
                    onClick={() => handlePlanChange("semiannual")}
                  >
                    Semi-Annual
                  </span>
                  <span
                    className={`annually ${
                      activePlan === "annually" ? "active" : ""
                    }`}
                    onClick={() => handlePlanChange("annually")}
                  >
                    Annually
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="plans d-flex align-items-center">
                {Object.keys(activeDetails).map((planKey) => (
                  <div
                    key={planKey}
                    className={`single-plan startup text-center ${
                      activeDetails[planKey] === activeDetails.master
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="plans-content">
                      <h3 className="p-ty-title mb-4">
                        {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
                      </h3>
                      <div className="div-description">
                        <p>
                          <img src="assets/r-coin.png" className="coins-img" />{" "}
                          {activeDetails[planKey].redCoins} Red Coins for Rental
                          Listing
                        </p>
                        <p>
                          <img src="assets/s-coin.png" className="coins-img" />{" "}
                          {activeDetails[planKey].silverCoins} Silver Coins for
                          Sale Listing
                        </p>
                        <p>
                          {planKey === "master" ? (
                            <NorthIcon sx={{ height: 22 }} />
                          ) : (
                            <SouthIcon sx={{ height: 22 }} />
                          )}{" "}
                          {activeDetails[planKey].rentalLimit} Rental Limit
                          Search
                        </p>
                        <p>
                          {planKey === "master" ? (
                            <NorthIcon sx={{ height: 22 }} />
                          ) : (
                            <SouthIcon sx={{ height: 22 }} />
                          )}{" "}
                          {activeDetails[planKey].saleLimit} Sale Limit Search
                        </p>
                      </div>
                      <div className="price">
                        <span className="peso">₱</span>
                        <span className="number">
                          {activeDetails[planKey].price}
                        </span>
                        <br />
                        {activePlan === "monthly"
                          ? "Monthly"
                          : activePlan === "quarterly"
                          ? "Quarterly"
                          : activePlan === "semiannual"
                          ? "Semi-Annual"
                          : "Annually"}
                      </div>
                      <Link
                        to={activeDetails[planKey].path}
                        className="subscribe-button"
                      >
                        Subscribe
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Plans;

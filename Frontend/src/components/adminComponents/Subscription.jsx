// MUI Joy
import * as React from "react";
import { Table, Button, Box, Typography, Input, Sheet } from "@mui/joy";

//Color Variables
import { colors } from "../../utility/scriptUtility";

//MUI Icons
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

import { getApp } from "../../utility/AppManager";
import axios from "../../utility/axios";

//MUI Icons

const Subscription = () => {
  const [editing, setEditing] = React.useState({
    monthly: false,
    quarterly: false,
    semiAnnual: false,
    annually: false,
  });

  const handleEdit = (plan) => {
    if (editing[plan]) {
      handleSave();
    }
    setEditing({ ...editing, [plan]: !editing[plan] });
  };

  const [subscription, setSubscription] = React.useState(null);
  const [editedAnnually, setEditedAnnually] = React.useState({
    AnnuallyBasic: null,
    AnnuallyStandard: null,
    AnnuallyPro: null,
    AnnuallyMaster: null,
  });
  const [editedSemiAnnually, setEditedSemiAnnually] = React.useState({
    SemiAnnuallyBasic: null,
    SemiAnnuallyStandard: null,
    SemiAnnuallyPro: null,
    SemiAnnuallyMaster: null,
  });
  const [editedQuarterly, setEditedQuarterly] = React.useState({
    QuarterlyBasic: null,
    QuarterlyStandard: null,
    QuarterlyPro: null,
    QuarterlyMaster: null,
  });
  const [editedMonthly, setEditedMonthly] = React.useState({
    MonthlyBasic: null,
    MonthlyStandard: null,
    MonthlyPro: null,
    MonthlyMaster: null,
  });

  const fetchSubscription = async () => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.get("/api/fetch-subscription", config);

      if (response.status === 200) {
        setSubscription(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchSubscription();
  }, []);

  const handleEditPriceChange = (event) => {
    const { name, value } = event.target;
    // Parse the value to a number
    const numericValue = parseFloat(value);
    setEditedAnnually((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleSemiAnnual = (event) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);
    setEditedSemiAnnually((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleQuarterly = (event) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);
    setEditedQuarterly((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleMonthly = (event) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);
    setEditedMonthly((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleSave = () => {
    if (
      editedAnnually.AnnuallyBasic !== null ||
      editedAnnually.AnnuallyStandard !== null ||
      editedAnnually.AnnuallyPro !== null ||
      editedAnnually.AnnuallyMaster !== null
    ) {
      const AnnualPrice = async () => {
        try {
          const App = getApp();
          const config = {
            headers: {
              Authorization: `Bearer ${App}`,
            },
          };

          const response = await axios.put(
            "/api/update-price",
            editedAnnually,
            config
          );

          if (response.status === 200) {
            console.log("success?");
            fetchSubscription();
            setEditedAnnually({
              AnnuallyBasic: null,
              AnnuallyStandard: null,
              AnnuallyPro: null,
              AnnuallyMaster: null,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      AnnualPrice();
    } else if (
      editedSemiAnnually.SemiAnnuallyBasic !== null ||
      editedSemiAnnually.SemiAnnuallyStandard !== null ||
      editedSemiAnnually.SemiAnnuallyPro !== null ||
      editedSemiAnnually.SemiAnnuallyMaster !== null
    ) {

      const SemiAnnualPrice = async () => {
        try {
          const App = getApp();
          const config = {
            headers: {
              Authorization: `Bearer ${App}`,
            },
          };

          const response = await axios.put(
            "/api/update-price",
            editedSemiAnnually,
            config
          );

          if (response.status === 200) {
            console.log("success?");
            fetchSubscription();
            setEditedSemiAnnually({
              SemiAnnuallyBasic: null,
              SemiAnnuallyStandard: null,
              SemiAnnuallyPro: null,
              SemiAnnuallyMaster: null,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      SemiAnnualPrice();
    } else if (
      editedQuarterly.QuarterlyBasic !== null ||
      editedQuarterly.QuarterlyStandard !== null ||
      editedQuarterly.QuarterlyPro !== null ||
      editedQuarterly.QuarterlyMaster !== null
    ) {
      const QuarterlyPrice = async () => {
        try {
          const App = getApp();
          const config = {
            headers: {
              Authorization: `Bearer ${App}`,
            },
          };

          const response = await axios.put(
            "/api/update-price",
            editedQuarterly,
            config
          );

          if (response.status === 200) {
            console.log("success?");
            fetchSubscription();
            setEditedQuarterly({
              QuarterlyBasic: null,
              QuarterlyStandard: null,
              QuarterlyPro: null,
              QuarterlyMaster: null,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      QuarterlyPrice();
    } else if (
      editedMonthly.MonthlyBasic !== null ||
      editedMonthly.MonthlyStandard !== null ||
      editedMonthly.MonthlyPro !== null ||
      editedMonthly.MonthlyMaster !== null
    ) {
      const MonthlyPrice = async () => {
        try {
          const App = getApp();
          const config = {
            headers: {
              Authorization: `Bearer ${App}`,
            },
          };

          const response = await axios.put(
            "/api/update-price",
            editedMonthly,
            config
          );

          if (response.status === 200) {
            console.log("success?");
            fetchSubscription();
            setEditedMonthly({
              MonthlyBasic: null,
              MonthlyStandard: null,
              MonthlyPro: null,
              MonthlyMaster: null,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      MonthlyPrice();
    }
  };
  return (
    <form>
      <Box
        component="section"
        sx={{
          p: 2,
          minHeight: "100vh",
          maxHeight: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          component="header"
          sx={{
            minHeight: 70,
            p: 2.5,
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            level="h2"
            startDecorator={<SellOutlinedIcon />}
            sx={{ fontFamily: '"Poppins", sans-serif', letterSpacing: .5 }}
          >
            Pricing Plans Discounts
          </Typography>
        </Box>
        <Box>
          <Sheet sx={{ mt: 2, p: 3, backgroundColor: '#fff', border: "1px solid #d3d3d3", borderRadius: "10px", overflow: 'auto', height: 'auto', boxShadow: "0 5px 5px rgba(0, 0, 0, 0.2)"  }}>
            <Table borderAxis="both"
                color="primary"
                stickyHeader
                variant="soft"
                size="lg"
                sx={{
                  '@media (max-width: 600px)': {
                    overflowX: 'auto',
                    display: 'block',
                    tableLayout: 'auto',
                  },
                }}
                >
              <thead>
                <tr>
                  <th rowSpan={2}></th>
                  <th
                    colSpan={4}
                    style={{ textAlign: "center", backgroundColor: "#E3EFFB" }}
                  >
                    Membership Plans
                  </th>
                  <th rowSpan={2} style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>Basic</th>
                  <th style={{ textAlign: "center" }}>Standard</th>
                  <th style={{ textAlign: "center" }}>Pro</th>
                  <th style={{ textAlign: "center", borderRightWidth: 0 }}>
                    Master
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Monthly</th>
                  <td>
                    {editing.monthly ? (
                      <Input
                        value={
                          editedMonthly.MonthlyBasic !== null
                            ? editedMonthly.MonthlyBasic
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Monthly(Basic)"
                            ).price
                        }
                        onChange={handleMonthly}
                        name="MonthlyBasic"
                      />
                    ) : editedMonthly.MonthlyBasic !== null ? (
                      editedMonthly.MonthlyBasic.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Monthly(Basic)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.monthly ? (
                      <Input
                        value={
                          editedMonthly.MonthlyStandard !== null
                            ? editedMonthly.MonthlyStandard
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) =>
                                item.subscription === "Monthly(Standard)"
                            ).price
                        }
                        onChange={handleMonthly}
                        name="MonthlyStandard"
                      />
                    ) : editedMonthly.MonthlyStandard !== null ? (
                      editedMonthly.MonthlyStandard.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Monthly(Standard)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.monthly ? (
                      <Input
                        value={
                          editedMonthly.MonthlyPro !== null
                            ? editedMonthly.MonthlyPro
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Monthly(pro)"
                            ).price
                        }
                        onChange={handleMonthly}
                        name="MonthlyPro"
                      />
                    ) : editedMonthly.MonthlyPro !== null ? (
                      editedMonthly.MonthlyPro.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Monthly(pro)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.monthly ? (
                      <Input
                        value={
                          editedMonthly.MonthlyMaster !== null
                            ? editedMonthly.MonthlyMaster
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Monthly(Master)"
                            ).price
                        }
                        onChange={handleMonthly}
                        name="MonthlyMaster"
                      />
                    ) : editedMonthly.MonthlyMaster !== null ? (
                      editedMonthly.MonthlyMaster.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Monthly(Master)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color={editing.monthly ? "success" : "danger"}
                      onClick={() => handleEdit("monthly")}
                    >
                      {editing.monthly ? "Save" : "Edit Pricing"}
                    </Button>
                  </td>
                </tr>
                {/* QUARTERLY */}
                <tr>
                  <th scope="row">Quarterly</th>
                  <td>
                    {editing.quarterly ? (
                      <Input
                        value={
                          editedQuarterly.QuarterlyBasic !== null
                            ? editedQuarterly.QuarterlyBasic
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Quarterly(Basic)"
                            ).price
                        }
                        onChange={handleQuarterly}
                        name="QuarterlyBasic"
                      />
                    ) : editedQuarterly.QuarterlyBasic !== null ? (
                      editedQuarterly.QuarterlyBasic.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Quarterly(Basic)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.quarterly ? (
                      <Input
                        value={
                          editedQuarterly.QuarterlyStandard !== null
                            ? editedQuarterly.QuarterlyStandard
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) =>
                                item.subscription === "Quarterly(Standard)"
                            ).price
                        }
                        onChange={handleQuarterly}
                        name="QuarterlyStandard"
                      />
                    ) : editedQuarterly.QuarterlyStandard !== null ? (
                      editedQuarterly.QuarterlyStandard.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find(
                          (item) => item.subscription === "Quarterly(Standard)"
                        )
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.quarterly ? (
                      <Input
                        value={
                          editedQuarterly.QuarterlyPro !== null
                            ? editedQuarterly.QuarterlyPro
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Quarterly(pro)"
                            ).price
                        }
                        onChange={handleQuarterly}
                        name="QuarterlyPro"
                      />
                    ) : editedQuarterly.QuarterlyPro !== null ? (
                      editedQuarterly.QuarterlyPro.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Quarterly(pro)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.quarterly ? (
                      <Input
                        value={
                          editedQuarterly.QuarterlyMaster !== null
                            ? editedQuarterly.QuarterlyMaster
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) =>
                                item.subscription === "Quarterly(Master)"
                            ).price
                        }
                        onChange={handleQuarterly}
                        name="QuarterlyMaster"
                      />
                    ) : editedQuarterly.QuarterlyMaster !== null ? (
                      editedQuarterly.QuarterlyMaster.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Quarterly(Master)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color={editing.quarterly ? "success" : "danger"}
                      onClick={() => handleEdit("quarterly")}
                    >
                      {editing.quarterly ? "Save" : "Edit Pricing"}
                    </Button>
                  </td>
                </tr>

                {/* SEMI_ANNUAL */}
                <tr>
                  <th scope="row">Semi-Annual</th>
                  <td>
                    {editing.semiAnnual ? (
                      <Input
                        value={
                          editedSemiAnnually.SemiAnnuallyBasic !== null
                            ? editedSemiAnnually.SemiAnnuallyBasic
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) =>
                                item.subscription === "Semi-Annual(Basic)"
                            ).price
                        }
                        onChange={handleSemiAnnual}
                        name="SemiAnnuallyBasic"
                      />
                    ) : editedSemiAnnually.SemiAnnuallyBasic !== null ? (
                      editedSemiAnnually.SemiAnnuallyBasic.toLocaleString(
                        "en-PH",
                        {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        }
                      )
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find(
                          (item) => item.subscription === "Semi-Annual(Basic)"
                        )
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.semiAnnual ? (
                      <Input
                        value={
                          editedSemiAnnually.SemiAnnuallyStandard !== null
                            ? editedSemiAnnually.SemiAnnuallyStandard
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) =>
                                item.subscription === "Semi-Annual(Standard)"
                            ).price
                        }
                        onChange={handleSemiAnnual}
                        name="SemiAnnuallyStandard"
                      />
                    ) : editedSemiAnnually.SemiAnnuallyStandard !== null ? (
                      editedSemiAnnually.SemiAnnuallyStandard.toLocaleString(
                        "en-PH",
                        {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        }
                      )
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find(
                          (item) => item.subscription === "Semi-Annual(Standard)"
                        )
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.semiAnnual ? (
                      <Input
                        value={
                          editedSemiAnnually.SemiAnnuallyPro !== null
                            ? editedSemiAnnually.SemiAnnuallyPro
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Semi-Annual(pro)"
                            ).price
                        }
                        onChange={handleSemiAnnual}
                        name="SemiAnnuallyPro"
                      />
                    ) : editedSemiAnnually.SemiAnnuallyPro !== null ? (
                      editedSemiAnnually.SemiAnnuallyPro.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Semi-Annual(pro)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.semiAnnual ? (
                      <Input
                        value={
                          editedSemiAnnually.SemiAnnuallyMaster !== null
                            ? editedSemiAnnually.SemiAnnuallyMaster
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) =>
                                item.subscription === "Semi-Annual(Master)"
                            ).price
                        }
                        onChange={handleSemiAnnual}
                        name="SemiAnnuallyMaster"
                      />
                    ) : editedSemiAnnually.SemiAnnuallyMaster !== null ? (
                      editedSemiAnnually.SemiAnnuallyMaster.toLocaleString(
                        "en-PH",
                        {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        }
                      )
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find(
                          (item) => item.subscription === "Semi-Annual(Master)"
                        )
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color={editing.semiAnnual ? "success" : "danger"}
                      onClick={() => handleEdit("semiAnnual")}
                    >
                      {editing.semiAnnual ? "Save" : "Edit Pricing"}
                    </Button>
                  </td>
                </tr>
                {/* ANNUALLY */}
                <tr>
                  <th scope="row">Annually</th>
                  <td>
                    {editing.annually ? (
                      <Input
                        value={
                          editedAnnually.AnnuallyBasic !== null
                            ? editedAnnually.AnnuallyBasic
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Annually(Basic)"
                            ).price
                        }
                        onChange={handleEditPriceChange}
                        name="AnnuallyBasic"
                      />
                    ) : editedAnnually.AnnuallyBasic !== null ? (
                      editedAnnually.AnnuallyBasic.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Annually(Basic)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.annually ? (
                      <Input
                        value={
                          editedAnnually.AnnuallyStandard !== null
                            ? editedAnnually.AnnuallyStandard
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) =>
                                item.subscription === "Annually(Standard)"
                            ).price
                        }
                        onChange={handleEditPriceChange}
                        name="AnnuallyStandard"
                      />
                    ) : editedAnnually.AnnuallyStandard !== null ? (
                      editedAnnually.AnnuallyStandard.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find(
                          (item) => item.subscription === "Annually(Standard)"
                        )
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.annually ? (
                      <Input
                        value={
                          editedAnnually.AnnuallyPro !== null
                            ? editedAnnually.AnnuallyPro
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Annually(pro)"
                            ).price
                        }
                        onChange={handleEditPriceChange}
                        name="AnnuallyPro"
                      />
                    ) : editedAnnually.AnnuallyPro !== null ? (
                      editedAnnually.AnnuallyPro.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Annually(pro)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td>
                    {editing.annually ? (
                      <Input
                        value={
                          editedAnnually.AnnuallyMaster !== null
                            ? editedAnnually.AnnuallyMaster
                            : subscription &&
                            subscription.data &&
                            subscription.data.find(
                              (item) => item.subscription === "Annually(Master)"
                            ).price
                        }
                        onChange={handleEditPriceChange}
                        name="AnnuallyMaster"
                      />
                    ) : editedAnnually.AnnuallyMaster !== null ? (
                      editedAnnually.AnnuallyMaster.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })
                    ) : (
                      subscription &&
                      subscription.data &&
                      subscription.data
                        .find((item) => item.subscription === "Annually(Master)")
                        .price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 0,
                        })
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color={editing.annually ? "success" : "danger"}
                      onClick={() => handleEdit("annually")}
                    >
                      {editing.annually ? "Save" : "Edit Pricing"}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Sheet>
        </Box>
      </Box>
    </form>
  );
};

export default Subscription;

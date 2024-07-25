import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Grid, Box, Card, Link, Typography, FormControl, FormLabel, Input, Button } from '@mui/joy';

//MUI Icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NorthIcon from '@mui/icons-material/North';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import LockIcon from '@mui/icons-material/Lock';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function SemiMaster() {
    //Automatic on top condition
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Card Number
    const [cardNumber, setCardNumber] = useState('');
    // CVV
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        let formattedValue = value.slice(0, 16);
        formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ');
        setCardNumber(formattedValue.trim());
    };

    const handleCvvChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        const formattedValue = value.slice(0, 3);
        setCvv(formattedValue);
    };

    return (
        <Container sx={{ mt: { xs: 10, md: 15 } }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Box>
                        <Card
                            variant="soft"
                            size="lg"
                            color='#F0F4F8'
                        >
                            <Box sx={{ mt: 3 }}>
                                <Link
                                    href="/plans"
                                    level="title-md"
                                    underline="hover"
                                    startDecorator={<KeyboardBackspaceIcon />}
                                >Plans and Pricing</Link>
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <Typography level="title-md">Total</Typography>
                                <Typography level="h1" sx={{ fontSize: "40px" }}>₱21,000.00<span style={{ color: "#3d3d3d", fontSize: "14px", letterSpacing: "0.5px" }}>/Semi-Annual</span></Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography level="h4" sx={{ fontSize: "16px", mt: 2 }}>Master Plan Benefits: </Typography>
                                <Typography level="h4" sx={{ fontSize: "16px", mt: 2 }}><img src="assets/r-coin.png" style={{ width: "20px", height: "20px" }} /> 180 Red Coins</Typography>
                                <Typography level="title-md" color='neutral' sx={{ textIndent: "25px", fontSize: "14px" }}>Rental Listing / Posting</Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography level="h4" sx={{ fontSize: "16px" }}><img src="assets/s-coin.png" style={{ width: "20px", height: "20px" }} /> 120 Silver Coins</Typography>
                                <Typography level="title-md" color='neutral' sx={{ textIndent: "25px", fontSize: "14px" }}>Sale Listing / Posting</Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography level="h4" startDecorator={<NorthIcon />} sx={{ fontSize: "16px" }}> ₱80,000</Typography>
                                <Typography level="title-md" color='neutral' sx={{ textIndent: "25px", fontSize: "14px" }}>Rental Limit Search</Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography level="h4" startDecorator={<NorthIcon />} sx={{ fontSize: "16px" }}> ₱20,000,000</Typography>
                                <Typography level="title-md" color='neutral' sx={{ textIndent: "25px", fontSize: "14px" }}>Sale Limit Search</Typography>
                            </Box>
                        </Card>
                    </Box>

                </Grid>
                <Grid item xs={12} md={7}>
                    <Card
                        variant="outlined"
                        size="lg"
                        color='primary'
                        sx={{ backgroundColor: "transparent" }}
                    >
                        <Box>
                            <Typography level="h4" color="primary" sx={{ fontWeight: 700 }}>Payment Form</Typography>
                            <Typography color='neutral' sx={{ fontSize: "14px" }}>Complete your purchase</Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <FormControl>
                                <FormLabel>Email Address:</FormLabel>
                                <Input startDecorator={<MailOutlineRoundedIcon />} type="email" placeholder="Email Address" />

                                <FormLabel sx={{ mt: 2 }}>Card Number:</FormLabel>
                                <Input value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    startDecorator={<CreditCardRoundedIcon />}
                                    placeholder="0000-0000-0000-0000" />

                                {/*CARD DETAILS*/}
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={4}>
                                        <FormLabel sx={{ mt: 1 }}>Expiry Month:</FormLabel>
                                        <Input
                                            placeholder="Month" />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <FormLabel sx={{ mt: 1 }}>Expiry Year:</FormLabel>
                                        <Input
                                            placeholder="Year" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel sx={{ mt: 1 }}>CVV:</FormLabel>
                                        <Input
                                            value={cvv}
                                            onChange={handleCvvChange}
                                            placeholder="000"
                                            inputProps={{ maxLength: 3 }}
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 2 }}>
                                    <Button color="primary" variant='solid' startDecorator={<LockIcon />} fullWidth>
                                        Pay ₱21,000.00
                                    </Button>
                                </Box>
                            </FormControl>
                        </Box>
                    </Card>
                    <Card
                        variant="outlined"
                        size="lg"
                        color='primary'
                        sx={{ backgroundColor: "transparent", mt: 2 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={8} md={10}>
                                <Typography level="h4" startDecorator={<InfoOutlinedIcon />} sx={{ fontSize: "16px" }}> Secure Checkout with PayPal</Typography>
                                <Typography level="title-md" color='neutral' sx={{ textIndent: "28px", fontSize: "14px" }}>Enjoy hassle-free payments with PayPal, our trusted payment partner.</Typography>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <img src="assets/paypal.png" style={{ width: "100px", height: "40px" }} />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
export default SemiMaster;
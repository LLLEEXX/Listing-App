import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../components/TwoSidedLayout';
import { useEffect } from 'react';

export default function ApplyService() {

    const emailLinkApplication = "mailto:example@gmail.com?Subject=Application For Property Management Services";

    //Automatic on top condition
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <>
            <TwoSidedLayout>
                <Typography color="primary" fontSize="lg" fontWeight="lg">
                    Apply Your Property Management Services
                </Typography>
                <Typography
                    level="h1"
                    fontWeight="xl"
                    fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
                >
                    Expand your reach and connect to a broader audience.
                </Typography>
                <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                    Here's what you'll need:
                    <li>DTI (Department of Trade and Industry)</li>
                    <li>Business/Barangay Permit</li>
                    <li>Company Logo</li>
                </Typography>
                <Button
                    size="lg"
                    endDecorator={<ArrowForward />}
                    sx={{ alignSelf: 'stretch' }}
                    component="a"
                    href={emailLinkApplication}
                >
                    Send Application and Get Started
                </Button>
            </TwoSidedLayout>
        </>
    );
}

import './../assets/advertise-service.css';
import Button from '@mui/joy/Button';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useEffect } from 'react';

function AdvertiseService() {
    const emailLinkAdvertiseLanding = "mailto:example@gmail.com?Subject=Advertisement for Landing Page";
    const emailLinkAdvertiseBanner = "mailto:example@gmail.com?Subject=Banner Advertisement";

    //Automatic on top condition
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="service-apply-section">
            <div className="container">
                <div className="row">
                    <div className="content-column col-xl-6 col-lg-12 col-md-12 col-sm-12 order-2">
                        <div className="inner-column">
                            <div className="sec-title">
                                <span className="title">Advertise Your Services</span>
                                <h2>Let's showcase your business and expertise.</h2>
                            </div>
                            <div className="text">Here's what you'll get:</div>
                            <ul className="list-style-one">
                                <li><strong>Maximize Exposure:</strong> Get your services in front of a diverse and engaged audience.</li>
                                <li><strong>Targeted Marketing:</strong> Reach the right customers based on their property needs and preferences.</li>
                                <li><strong>Grow Your Clientele:</strong> Connect with property owners and tenants actively seeking your services.</li>
                            </ul>
                            <Button
                                size="lg"
                                endDecorator={<ArrowForward />}
                                component="a"
                                href={emailLinkAdvertiseBanner}
                                className='btn-advertise-page mt-1'
                                fullWidth
                            >
                                Advertise My Services
                            </Button>

                        </div>
                    </div>

                    <div className="image-column col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="inner-column wow fadeInLeft">
                            <figure className="image-2"><a href="#" className="lightbox-image" data-fancybox="images"><img src="assets/advertisePage1.png" alt="" /></a></figure>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
export default AdvertiseService;
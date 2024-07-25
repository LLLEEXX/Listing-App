import './../assets/about.css';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Button from '@mui/joy/Button';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useEffect } from 'react';

function About() {

    //Automatic on top condition
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    return (
        <div className="aboutMainContainer">
            <div className="responsive-container-block bigContainer">
                <div className="responsive-container-block Container">
                    <div className="imgContainer">
                        <img src="assets/o-logo.png" className="mainImg" alt='Property Web Hub Logo' />
                    </div>
                    <div className="responsive-container-block textSide">
                        <p className="text-blk heading">
                            About Property Web Hub
                        </p>
                        <p className="text-blk subHeading">
                            Property Web Hub is not just a listing website, it's your gateway to a seamless property experience! Whether you're in the market for your dream home or seeking top-notch property services for your property, we've got you covered.                        </p>
                        <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div className="cardImgContainer">
                                <Icon.Shop className='bIcon' />
                            </div>
                            <div className="cardText">
                                <p className="text-blk cardHeading">
                                    Extensive Listings
                                </p>
                                <p className="text-blk cardSubHeading">
                                    Explore a diverse range of properties curated to meet every lifestyle and preference.                                 </p>
                            </div>
                        </div>
                        <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div className="cardImgContainer">
                                <Icon.Tools className='bIcon' />
                            </div>
                            <div className="cardText">
                                <p className="text-blk cardHeading">
                                    Small Business Support
                                </p>
                                <p className="text-blk cardSubHeading">
                                    From maintenance to renovations, we connect you with experts to ensure your property needs.
                                </p>
                            </div>
                        </div>
                        <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div className="cardImgContainer">
                                <Icon.Geo className='bIcon' />

                            </div>
                            <div className="cardText">
                                <p className="text-blk cardHeading">
                                    Effortless Navigation
                                </p>
                                <p className="text-blk cardSubHeading">
                                    Navigate our platform with ease and efficiency, whether you're searching for properties or connecting with service providers.
                                </p>
                            </div>
                        </div>
                        <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div className="cardImgContainer">
                                <Icon.Pencil className='bIcon' />
                            </div>
                            <div className="cardText">
                                <p className="text-blk cardHeading">
                                    Personalized Experience
                                </p>
                                <p className="text-blk cardSubHeading">
                                    Benefit from a personalized experience, where your unique needs take center stage in your property journey.
                                </p>
                            </div>
                        </div>
                        <Link to='/'>
                            <Button
                                size="lg"
                                endDecorator={<ArrowForward />}
                                sx={{ alignSelf: 'stretch', }}
                                component="a"
                            >
                                Explore Our Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default About;
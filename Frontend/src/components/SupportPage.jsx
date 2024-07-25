import "../assets/Support.css";
import { useEffect } from "react";

//MUI Joy
import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

//Bootstrap
import Accordion from 'react-bootstrap/Accordion';

//MUI Icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Launch from '@mui/icons-material/Launch';


export default function SupportPage() {

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="supportContainer">
      <div className="mb-5 justify-content-center text-center">
        <h2 className="fw-bold mb-5">👋 Hello, How can we help you?</h2>
      </div>
      <Tabs
        aria-label="tabs"
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ bgcolor: 'transparent', mb: 4 }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: 'xl',
            bgcolor: '#fff',
            width: '100%',
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'md',
              bgcolor: '#0B6BCB',
              color: '#fff'
            },
          }}
        >
          <Tab disableIndicator><SettingsIcon /> General<KeyboardArrowRightIcon /> </Tab>
          <Tab disableIndicator><PeopleAltIcon /> For Renters or Buyers <KeyboardArrowRightIcon /></Tab>
          <Tab disableIndicator><StorefrontIcon /> For Businesses <KeyboardArrowRightIcon /></Tab>
        </TabList>
      </Tabs>

      {selectedTab === 0 && (
        <div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header><strong>What is Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                <strong>Property Web Hub</strong> is a comprehensive listing website offering a diverse range of properties for sale and rent. We also connect clients with reliable property service providers.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header><strong>How do I create an account?</strong></Accordion.Header>
              <Accordion.Body>
                Simply click on the <strong>"Join"</strong> button on our navigation bar or <Link href="/SignUp" startDecorator={<Launch fontSize="small" />}>click here</Link>, fill in the required information, and start exploring the world of real estate with Property Web Hub.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><strong>Is my personal information secure?</strong></Accordion.Header>
              <Accordion.Body>
                Absolutely! We prioritize the security of your data. Our platform employs robust measures to safeguard your personal information.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header> <strong>Are there any fees for using Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                Registration and browsing listings are free. However, there are limitation rate in browsing, and certain premium features or services may involve fees. <Link href="/Plans" startDecorator={<Launch fontSize="small" />}> Check our pricing section for details.</Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header><strong>What are the difference between the Red and Silver Coins?</strong></Accordion.Header>
              <Accordion.Body>
                The <img src="assets/r-coin.png" className="displaySupp" /> <strong>Red Coins</strong> serves as your <strong>Rental Coins</strong>, you can use this to post your rental property, while the <img src="assets/s-coin.png" className="displaySupp" /> <strong>Silver Coins</strong> serves as your <strong>Sale Coins</strong>, you can also use this as an alternative if you run out of <img src="assets/r-coin.png" className="displaySupp" /> Red Coins
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header> <strong>How do I reset my password?</strong></Accordion.Header>
              <Accordion.Body>
                Click the <strong>"Forgot Password"</strong> on the login page. A link will be sent out to your registered email to reset your password.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header> <strong>Can I save my favorite listings for later viewing?</strong></Accordion.Header>
              <Accordion.Body>
                Absolutely! Create an account, and you can save your favorite listings to revisit them later. Look for the <strong>"Favorites"</strong> option on your Profile.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header><strong> How do I report an issue or provide feedback?</strong></Accordion.Header>
              <Accordion.Body>
                We appreciate your feedback! Use the <strong>"Connect With Us"</strong> button in the footer to report issues or share your suggestions. Our team values your input.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header><strong> Is Property Web Hub available in multiple languages?</strong></Accordion.Header>
              <Accordion.Body>
                Currently, Property Web Hub is available in <strong>English, Chinese and Korean</strong>. We are continuously working to expand language support for a better user experience.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
      {selectedTab === 1 && (
        <div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header><strong>How do I search for rental or for sale properties?</strong></Accordion.Header>
              <Accordion.Body>
                Use our search bar to input your preferences, such as location and property type. Browse through the listings and filter options to find the perfect rental for you.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header><strong>Can I schedule property viewings through Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                While you can explore property details on our platform, scheduling viewings is typically done directly with the property owner or agent. Contact information is provided in the listing.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><strong>How do I apply for a rental property?</strong></Accordion.Header>
              <Accordion.Body>
                Visit the property listing page, and you'll find information on how to apply. Typically, you'll need to contact the property owner or agent for application details.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header><strong> Can I negotiate the rent for a property listed on Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                Absolutely! While the listed rent is a starting point, negotiations are often possible. Feel free to communicate with the property owner or agent to discuss terms.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header><strong>Are amenities included in the rent or sale for properties listed on Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                It varies. Check the property details for information on included utilities. If details are not provided, inquire directly with the property owner or agent.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header><strong> How do I verify the legitimacy of a property listing?</strong></Accordion.Header>
              <Accordion.Body>
                Property Web Hub strives to ensure the accuracy of listings. However, exercise caution. Verify details, conduct property visits, and communicate directly with the property owner or agent.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header><strong>Can I bring pets to a rental property listed on Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                Pet policies differ. Check the property details for information on whether pets are allowed. If not specified, contact the property owner or agent for clarification.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header><strong>How do I know if a property is available for immediate occupancy?</strong></Accordion.Header>
              <Accordion.Body>
                Availability details are usually mentioned in the listing. If not specified, contact the property owner or agent for the most up-to-date information on occupancy.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header><strong>What should I do if I encounter a scam listing?</strong></Accordion.Header>
              <Accordion.Body>
                Report any suspicious listings immediately using the "Connect With Us" button on the footer. Our team will investigate and take necessary action to maintain a secure environment.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
      {selectedTab === 2 && (
        <div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header><strong>How can I register my small business from Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                Scroll to our homepage and find the <strong>"Apply My Services"</strong> button or <Link href="/applyService" startDecorator={<Launch fontSize="small" />}>click here</Link>, send the necessary requirements and wait for our email approval.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header> <strong>Can I advertise my business on Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                Absolutely! Check out our <Link href="/AdvertiseService" startDecorator={<Launch fontSize="small" />}>Advertisements Page</Link> to learn about advertising opportunities and reach a wider audience for your business.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><strong>How can I update my business information on Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                To update your business details, contact us at <a href="">businesssupport@pwh.com</a>. Ensure your details are accurate and up-to-date.              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header><strong> How can I connect with potential clients on Property Web Hub?</strong></Accordion.Header>
              <Accordion.Body>
                Ensure your business details are complete and active. Users looking for property-related services can reach out to you directly through the contact information you've provided.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
      <div className="mt-4 text-align-justify">
        We hope these FAQs address your inquiries. If you need further assistance, feel free to contact our support team at <a href="">support@propertywebhub.com</a>. Happy property hunting! 🏠✨
      </div>
    </div>
  );
}

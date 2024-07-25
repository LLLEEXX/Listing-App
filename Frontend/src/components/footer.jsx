import * as Icon from "react-bootstrap-icons";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../assets/footer.css";

//MUI
import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";

//Translation
import { useTranslation } from "react-i18next";

//Icons
import HouseIcon from '@mui/icons-material/House';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  const [open, setOpen] = React.useState(false);
  const [openCom, setOpenCom] = React.useState(false);

  //Translation
  const { t } = useTranslation("global");

  return (
    <>
      <footer className="footer">
        <div className="footer__addr">
          <Image src="assets/o-logo.png" className="footer-logo me-3" alt="Property Web Hub Logo" rounded />
          Property Web Hub
          <address>
            <HouseIcon /> Metro Manila, Philippines
            <br />
          </address>
          <Button
            className="e-btn"
            variant="outline-danger"
            href="mailto:example@gmail.com"
          > <EmailIcon className="me-1" />
            {t('Footer.email')}
          </Button>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title"> {t('Footer.Soc')}</h2>

            <ul className="nav__ul">
              <li>
                <a href="#">
                  <Icon.Facebook className="me-1" />
                  Facebook
                </a>
              </li>

              <li>
                <a href="#">
                  <Icon.Instagram className="me-1" />
                  Instagram
                </a>
              </li>

              <li>
                <a href="#">
                  <Icon.Twitter className="me-1" />
                  Twitter
                </a>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">{t('Footer.Comp')}</h2>

            <ul className="nav__ul">
              <li>
                <Link to="/about">{t('Footer.aboutUse')}</Link>
              </li>

              <li>
                <Link to="/plans">{t('Footer.planPri')}</Link>
              </li>

              <li>
                <Link to="/AdvertiseService">{t('Footer.Advertise')}</Link>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">{t('Footer.helpSupp')}</h2>

            <ul className="nav__ul">
              <li>
                <Link to="/Support">{t('Footer.FAQ')}</Link>
              </li>

              <li>
                <a onClick={() => setOpenCom(true)} className="linkforModal">
                  {t('Footer.Community')}
                </a>
              </li>

              <li>
                <a onClick={() => setOpen(true)} className="linkforModal">
                  {t('Footer.Terms')}
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <hr />
        <div className="legal d-flex align-items-center justify-content-center">
          <p>&copy; 2023 Property Web Hub. All rights reserved.</p>
        </div>
      </footer>

      {/*MODAL FOR COMUNITY GUIDELINES*/}
      <Modal open={openCom} onClose={() => setOpenCom(false)}>
        <ModalDialog
          color="neutral"
          size="lg"
          sx={{
            overflowY: "auto", maxHeight: "80vh", padding: "20px", height: "auto"
          }}
        >
          <ModalClose></ModalClose>
          <Typography level="title-lg">Community Guidelines</Typography>
          <Typography level="body-sm">
            Welcome to the <strong>Property Web Hub Community!</strong> Our goal is to create a safe, positive, and collaborative space for property enthusiasts, renters, businesses, and service providers. To ensure a harmonious experience for everyone, please abide by the following community guidelines:
            <br /><br />
            <strong>1. Respect and Courtesy:</strong>
            <br />
            • Treat fellow community members with respect and courtesy.<br />
            • Avoid offensive language, discrimination, or any form of harassment.<br /><br />

            <strong>2. Accurate Information:</strong>
            <br />
            • Provide accurate and truthful information in property listings, reviews, and business profiles.<br/>
            • Avoid misleading content that may impact the community's trust.<br /><br />

            <strong>3. No Spam or Promotions:</strong>
            <br />
            • Refrain from spamming the community with irrelevant content or promotions.<br/>
            • Use designated sections for advertisements and promotions.<br /><br />

            <strong>4. Constructive Feedback:</strong>
            <br />
            • Share constructive and relevant feedback in property reviews or business interactions.<br/>
            • Avoid personal attacks or defamatory language.<br /><br />

            <strong>5. Privacy and Safety:</strong>
            <br />
            • Respect the privacy of others. Do not share personal contact details without consent.<br/>
            • Report any suspicious activity or content that may compromise community safety.<br/><br/>
            
            <strong>6. Compliance with Laws:</strong>
            <br/>
            • Adhere to local laws and regulations regarding property transactions, rentals, and business practices.<br/>
            • Report any illegal or unethical activities promptly.<br/><br/>
            
            <strong>7. Intellectual Property:</strong>
            <br/>
            • Respect intellectual property rights. Do not post or use copyrighted content without proper authorization.<br/><br/>
            
            <strong>8. Community Reporting:</strong>
            <br/>
            • Report any violations of these guidelines promptly through the reporting tools available on Property Web Hub.<br/>
            • Help maintain a positive and trustworthy environment for all users.<br/><br/>
            
            <strong>9. Professional Conduct for Businesses:</strong>
            <br/>
            • Businesses should maintain professionalism in their interactions.
            • Deliver services as promised, and resolve disputes or issues promptly and courteously.<br/><br/>
            
            <strong>10. Inclusive Community:</strong>
            <br/>
            • Embrace diversity and foster an inclusive environment for all community members.<br/>
            • Avoid discriminatory language or behavior.<br/><br/>
            
            <strong>11. Transparent Business Practices:</strong>
            <br/>
            • Businesses should provide transparent information about their services, pricing, and terms.<br/>
            • Clearly communicate any changes or updates that may affect users.<br/><br/>
            
            <strong>12. Adherence to Terms of Service:</strong>
            <br/>
            • Abide by the terms of service outlined by Property Web Hub.<br/>
            • Violations may result in the removal of content, account suspension, or other appropriate actions.<br/><br/>
            
            By participating in the Property Web Hub community, you agree to adhere to these guidelines. Your positive contributions play a crucial role in making Property Web Hub a valuable and enjoyable platform for everyone.<br/><br/>

            If you have any questions or encounter issues, please contact our support team at <a href="">support@propertywebhub.com</a><br/><br/>

            Thank you for being a part of the Property Web Hub community! 🏡💙
          </Typography>
        </ModalDialog>
      </Modal>

      {/*MODAL FOR TERMS AND CONDITIONS*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          color="neutral"
          size="lg"
          sx={{
            overflowY: "auto", maxHeight: "80vh", padding: "20px", height: "auto"
          }}
        >
          <ModalClose></ModalClose>
          <Typography level="title-lg">Terms and Conditions</Typography>
          <Typography level="body-sm">
            Welcome to <strong>Property Web Hub</strong>, these Terms and
            Conditions govern your use of our website (collectively, the
            "Services"). By accessing or using the Services, you agree to be
            bound by these Terms. Please read them carefully before using the
            platform.
          </Typography>

          <Typography level="body-sm">
            <strong>1. Eligibility and Use</strong>
          </Typography>
          <Typography level="body-sm">
            • You must be at least 18 years old to use the Platform.
            <br />• You must be legally capable of entering into contracts.
            <br />• You may not use the Platform for any illegal or unauthorized
            purpose.
            <br />• You must comply with all applicable laws and regulations.
          </Typography>

          <Typography level="body-sm">
            <strong>2. User Accounts</strong>
          </Typography>
          <Typography level="body-sm">
            • You may need to create an account to access certain features of
            the Platform.
            <br />• You are responsible for maintaining the confidentiality of
            your account information, including your password.
            <br />• You are responsible for all activity that occurs under your
            account.
            <br />• You agree to notify us immediately of any unauthorized use
            of your account.
          </Typography>

          <Typography level="body-sm">
            <strong>3. Listings and Bookings</strong>
          </Typography>
          <Typography level="body-sm">
            • You may list your property ("Listing") on the Platform for
            short-term rentals.
            <br />• You are responsible for the accuracy and completeness of
            your Listing information.
            <br />• You must have the legal authority to list the property.
            <br />• You are responsible for complying with all applicable laws
            and regulations related to your Listing.
            <br />• You are responsible for communicating with potential guests
            and renters.
            <br />• You are responsible for collecting and processing payments
            directly with guests.
            <br />• We may remove Listings that violate our Terms or are
            otherwise deemed inappropriate.
          </Typography>

          <Typography level="body-sm">
            <strong>4. Guest and Renter Conduct</strong>
          </Typography>
          <Typography level="body-sm">
            • Guests and renters must comply with all applicable laws and
            regulations.
            <br />• Guests and renters must treat the property with respect.
            <br />• Guests and renters must communicate with the property owner
            or manager appropriately.
            <br />• We may deny or revoke access to the Platform for guests or
            renters who violate our Terms.
          </Typography>

          <Typography level="body-sm">
            <strong>5. Fees and Payments</strong>
          </Typography>
          <Typography level="body-sm">
            • We may charge a service fee to property owners and guests.
            <br />• You are responsible for paying all applicable fees.
            <br />• We may offer different payment methods.
            <br />• We are not responsible for any errors or delays in
            processing payments.
          </Typography>

          <Typography level="body-sm">
            <strong>6. Content and intellectual Property</strong>
          </Typography>
          <Typography level="body-sm">
            • You retain all ownership rights to your content.
            <br />• You grant us a non-exclusive, worldwide license to use your
            content on the Platform.
            <br />• You are responsible for ensuring that your content does not
            infringe on the rights of others.
            <br />• We are not responsible for any content that you or others
            submit to the Platform.
          </Typography>

          <Typography level="body-sm">
            <strong>7. Disclaimers and Warranties</strong>
          </Typography>
          <Typography level="body-sm">
            • THE PLATFORM IS PROVIDED "AS IS" AND WITHOUT WARRANTY OF ANY KIND.
            <br />• WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING,
            BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            <br />• WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED,
            ERROR-FREE, OR SECURE.
            <br />• WE ARE NOT RESPONSIBLE FOR ANY DAMAGES ARISING OUT OF YOUR
            USE OF THE PLATFORM.
          </Typography>

          <Typography level="body-sm">
            <strong>8. Limitation of Liability</strong>
          </Typography>
          <Typography level="body-sm">
            • TO THE FULLEST EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR
            ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
            ARISING OUT OF YOUR USE OF THE PLATFORM.
          </Typography>

          <Typography level="body-sm">
            <strong>9. Indemnification</strong>
          </Typography>
          <Typography level="body-sm">
            • You agree to indemnify and hold us harmless from and against any
            and all claims, losses, damages, liabilities, costs, and expenses
            (including attorneys' fees) arising out of or relating to your use
            of the Platform or your breach of these Terms.
          </Typography>

          <Typography level="body-sm">
            <strong>10. Dispute Resolution</strong>
          </Typography>
          <Typography level="body-sm">
            • All disputes arising out of or relating to these Terms will be
            resolved by binding arbitration in accordance with the rules of the
            American Arbitration Association.
            <br />• The arbitration will be conducted in English and will be
            held in [Location].
            <br />• The arbitrator's award will be final and binding on the
            parties.
          </Typography>

          <Typography level="body-sm">
            <strong>11. Governing Law</strong>
          </Typography>
          <Typography level="body-sm">
            • These Terms will be governed by and construed in accordance with
            the laws of the State of [State], without regard to its conflict of
            laws provisions.
          </Typography>

          <Typography level="body-sm">
            <strong>12. Entire Agreement</strong>
          </Typography>
          <Typography level="body-sm">
            • These Terms constitute the entire agreement between you and us
            regarding your use of the Platform.
          </Typography>

          <Typography level="body-sm">
            <strong>13. Termination</strong>
          </Typography>
          <Typography level="body-sm">
            • We may terminate your access to the Platform for any reason, at
            any time, without notice.
            <br />• You may terminate your account at any time.
          </Typography>

          <Typography level="body-sm">
            <strong>14. Modification</strong>
          </Typography>
          <Typography level="body-sm">
            • We may modify these Terms at any time by posting the amended Terms
            on the Platform.
            <br />• Your continued use of the Platform following the posting of
            amended Terms constitutes your acceptance of those Terms.
          </Typography>

          <Typography level="body-sm">
            <strong>15. Severability</strong>
          </Typography>
          <Typography level="body-sm">
            • If any provision of these Terms is held to be invalid or
            unenforceable, such provision will be struck from these Terms and
            the remaining
          </Typography>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default Footer;

import { Suspense, lazy } from "react";
import NavBar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import { Routes, Route, useLocation } from "react-router-dom";

//Pages
import Footer from "./components/footer";
import { SignUp } from "./components/SignUp";
import { SearchTab } from "./components/SearchTab";
import Viewing from "./components/viewing";
import { Loader } from "./components/Loader";
import { ErrorPage } from "./components/adminComponents/adminErrorPage";
import Neighborhood from "./components/Neighborhood";
import { RentProperty } from "./components/InquireProperty/RentProperty";
import { BuyProperty } from "./components/InquireProperty/BuyProperty";

//POST RENT PROPERTY PAGES
import PostingRent from "./components/PostingRent/PostingRent";

import PostingSale from "./components/PostingSale/PostingSale";
import Banner from "./components/banner";
import DisplayList from "./components/PropertyListComponents/displayList";
import FeaturedListing from "./components/featuredListing";
import About from "./components/about";
import i18next from "i18next";
import ForgotPass from "./components/forgot-pass";
import ApplyService from "./components/apply-service";
import InquiryForm from "./components/InquiryForm";
import AdvertiseService from "./components/advertise-service";
import Plans from "./components/plans";
import ExploreBuy from "./components/exploreComponents/ExploreBuy";
import ExploreRent from "./components/exploreComponents/exploreRent";
import ResetPassword from "./components/reset-password";
import ExploreQuickSearch from "./components/exploreComponents/ExploreQuickSearch";

//Payment
import MonthlyBasic from "./components/Payment/monthlyBasic";
import MonthlyStandard from "./components/Payment/monthlyStandard";
import MonthlyPro from "./components/Payment/monthlyPro";
import MonthlyMaster from "./components/Payment/monthlyMaster";
import QuarterlyBasic from "./components/Payment/quarterlyBasic";
import QuarterlyStandard from "./components/Payment/quarterlyStandard";
import QuarterlyPro from "./components/Payment/quarterlyPro";
import QuarterlyMaster from "./components/Payment/quarterlyMaster";
import SemiBasic from "./components/Payment/semiBasic";
import SemiStandard from "./components/Payment/semiStandard";
import SemiPro from "./components/Payment/semiPro";
import SemiMaster from "./components/Payment/SemiMaster";
import AnnualBasic from "./components/Payment/annualBasic";
import AnnualStandard from "./components/Payment/annualStandard";
import AnnualPro from "./components/Payment/annualPro";
import AnnualMaster from "./components/Payment/annualMaster";

//useContext
import { PropertyProvider } from "./utility/PropertyState";

// lazy Loading COMPONENT
const AdminComp = lazy(() => import("./components/AdminComp"));
const PropertyService = lazy(() => import("./components/PropertyServ"));
const AccountDetails = lazy(() =>
  import("./components/userProfile/AccountDetails")
);
const UserProfListing = lazy(() =>
  import("./components/userProfile/userProfListing")
);
const UserFav = lazy(() => import("./components/userProfile/userFav"));
const UserLeadsPool = lazy(() => import("./components/userProfile/leadsPool"));
const AccountDetailsForm = lazy(() =>
  import("./components/userProfile/accountSettings")
);

const Dashboard = lazy(() => import("./components/adminComponents/Dashboard"));
const PmsForm = lazy(() => import("./components/adminComponents/PmsForm"));
const Subscription = lazy(() => import("./components/adminComponents/Subscription"));
const AccActivation = lazy(() => import("./components/adminComponents/accActivation"));
const SupportPage = lazy(() => import("./components/SupportPage"));

const App = () => {
  const CurLocation = useLocation();
  const isHome = CurLocation.pathname === "/";
  const isAdminPage = CurLocation.pathname.startsWith("/adminPage");

  return (
    <>
      {!isAdminPage && (
        <div className="navDiv">
          <NavBar animate={isHome} />
        </div>
      )}
      <main className="mainCont">
        <PropertyProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchTab />
                  <FeaturedListing />
                  <Banner />
                  <Neighborhood />
                </>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/plans" element={<Plans />} />
            {/*Payment Plans*/}
            <Route path="/monthlyBasic" element={<MonthlyBasic/>} />
            <Route path="/monthlyStandard" element={<MonthlyStandard/>} />
            <Route path="/monthlyPro" element={<MonthlyPro/>} />
            <Route path="/monthlyMaster" element={<MonthlyMaster/>} />
            <Route path="/quarterlyBasic" element={<QuarterlyBasic/>} />
            <Route path="/quarterlyStandard" element={<QuarterlyStandard/>} />
            <Route path="/quarterlyPro" element={<QuarterlyPro/>} />
            <Route path="/quarterlyMaster" element={<QuarterlyMaster/>} />
            <Route path="/semiBasic" element={<SemiBasic/>} />
            <Route path="/semiStandard" element={<SemiStandard/>} />
            <Route path="/semiPro" element={<SemiPro/>} />
            <Route path="/semiMaster" element={<SemiMaster/>} />
            <Route path="/annualBasic" element={<AnnualBasic/>} />
            <Route path="/annualStandard" element={<AnnualStandard/>} />
            <Route path="/annualPro" element={<AnnualPro/>} />
            <Route path="/annualMaster" element={<AnnualMaster/>} />

            <Route path="/viewing/:id/:property" element={<Viewing />} />
            <Route path="/about" element={<About />} />
            <Route path="/ForgotPass" element={<ForgotPass />} />
            <Route path="/ApplyService" element={<ApplyService />} />
            <Route path="/AdvertiseService" element={<AdvertiseService />} />

            <Route path="/buyProperty" element={<BuyProperty />} />
            <Route
              path="/explore-buy"
              element={
                <Suspense fallback={<Loader />}>
                  <ExploreBuy />
                </Suspense>
              }
            />
            <Route
              path="/explore-rent"
              element={
                <Suspense fallback={<Loader />}>
                  <ExploreRent />
                </Suspense>
              }
            />
            <Route
              path="/property"
              element={
                <Suspense fallback={<Loader />}>
                  <PropertyService />
                </Suspense>
              }
            />

            <Route path="/quick-search/:status/:propertyType/:city?" element={<ExploreQuickSearch/>}/>

            <Route path="/rentProperty" element={<RentProperty />} />
            <Route path="/adminPage" element={<AdminComp />}>
              <Route
                index
                element={
                  <Suspense fallback={<Loader />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="accActivation"
                element={
                  <Suspense fallback={<Loader />}>
                    <AccActivation />
                  </Suspense>
                }
              />
              <Route
                path="pmsForm"
                element={
                  <Suspense fallback={<Loader />}>
                    <PmsForm />
                  </Suspense>
                }
              />
              <Route
                path="subscription"
                element={
                  <Suspense fallback={<Loader />}>
                    <Subscription />
                  </Suspense>
                }
              />
              {/* ERROR PAGE 404 */}

              <Route path="*" element={<ErrorPage />} />
            </Route>

            {/*POST RENT PROPERTY ROUTE*/}
            <Route path="Post-Rent" element={<PostingRent />} />

            <Route path="postingSale" element={<PostingSale />} />
            <Route
              path="reset-password"
              element={
                <Suspense fallback={<Loader />}>
                  <ResetPassword />
                </Suspense>
              }
            />

            <Route
              path="/userAccount"
              element={
                <Suspense fallback={<Loader />}>
                  <AccountDetails />
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<Loader />}>
                    <UserProfListing />
                  </Suspense>
                }
              />

              <Route
                path="Favorites"
                element={
                  <Suspense fallback={<Loader />}>
                    <UserFav />
                  </Suspense>
                }
              />
              <Route
                path="Leads"
                element={
                  <Suspense fallback={<Loader />}>
                    <UserLeadsPool />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="/account-settings"
              element={
                <Suspense fallback={<Loader />}>
                  <AccountDetailsForm />
                </Suspense>
              }
            ></Route>

            <Route
              path="/Support"
              element={
                <Suspense fallback={<Loader />}>
                  <SupportPage />
                </Suspense>
              }
            />

            <Route
              path="/explorePage"
              element={
                <Suspense fallback={<Loader />}>
                  <DisplayList />
                </Suspense>
              }
            />
            <Route
              path="/inquiries-form-and-contact-details/:inquire"
              element={
                <Suspense fallback={<Loader />}>
                  <InquiryForm />
                </Suspense>
              }
            />

            {/* ERROR PAGE 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </PropertyProvider>
      </main>
      {!isAdminPage && (
        <div className="navDiv">
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;

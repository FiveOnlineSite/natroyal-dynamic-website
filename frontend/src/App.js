import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/user/Home";
import AboutUs from "./pages/user/AboutUs";
import ContactUs from "./pages/user/ContactUs";
import ScrollToSection from "./components/ScrollToSesction";
import Company from "./pages/user/Company";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import RoyalHouse from "./pages/user/RoyalHouse";
import LVT from "./pages/user/LVT";
import VinylFlooring from "./pages/user/VinylFlooring";
import RoyalKnit from "./pages/user/RoyalKnit";
import SeatingComponents from "./pages/user/SeatingComponents";
import CoatedFabrics from "./pages/user/CoatedFabrics";
import AboutCoated from "./pages/user/AboutCoated";
import Laboratory from "./pages/user/Laboratory";
import VinylApplications from "./pages/user/VinylApplications";
import CoatedApplications from "./pages/user/CoatedApplications";
import SeatingApplications from "./pages/user/SeatingApplications";
import VinylnnerApplication from "./pages/user/VinylnnerApplication";

import Login from "./pages/admin/Login";

import AdminRoutes from "./routes/AdminRoutes";

import DashBoard from "./pages/admin/Dashboard";

import HomeBanner from "./pages/admin/Banner/HomeBanner/HomeBanner";
import AddHomeBanner from "./pages/admin/Banner/HomeBanner/AddHomeBanner";
import EditHomeBanner from "./pages/admin/Banner/HomeBanner/EditHomeBanner";

import LandingBanner from "./pages/admin/Banner/LandingBanner/LandingBanner";
import AddLandingBanner from "./pages/admin/Banner/LandingBanner/AddLandingBanner";
import EditLandingBanner from "./pages/admin/Banner/LandingBanner/EditLandingBanner";
import Banner from "./pages/admin/Banner/BannerPage/Banner";
import AddBanner from "./pages/admin/Banner/BannerPage/AddBanner";
import EditBanner from "./pages/admin/Banner/BannerPage/EditBanner";
import About from "./pages/admin/Abouts/About";
import KnitAbout from "./pages/admin/Abouts/KnitAbout";
import LvtAbout from "./pages/admin/Abouts/LvtAbout";
import SeatingAbout from "./pages/admin/Abouts/SeatingAbout";
import Events from "./pages/admin/Lvt/Events";
import Offer from "./pages/admin/Lvt/Offer";
import WhoWeAre from "./pages/admin/Lvt/WhoWeAre";
import PlankSlider from "./pages/admin/Lvt/PlankSlider/PlankSlider";
import AddPlankSlider from "./pages/admin/Lvt/PlankSlider/AddPlankSlider";
import EditPlankSlider from "./pages/admin/Lvt/PlankSlider/EditPlankSlider";
import PlankCategory from "./pages/admin/Lvt/PlankCategory/PlankCategory";
import AddPlankCategory from "./pages/admin/Lvt/PlankCategory/AddPlankCategory";
import EditPlankCategory from "./pages/admin/Lvt/PlankCategory/EditPlankCategory";
import Plank from "./pages/admin/Lvt/Plank";
import VinylApp from "./pages/admin/VinylFlooring/VinylApp";
import VinylProductVariant from "./pages/admin/VinylFlooring/VinylProductVariant";
import VinylProduct from "./pages/admin/VinylFlooring/VinylProduct";

function App() {
  return (
    <Router>
      <ScrollToSection />
      <FloatingWhatsapp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/our-divisions" element={<Company />} />
        <Route path="/royal-house" element={<RoyalHouse />} />
        <Route path="/lvt-flooring" element={<LVT />} />
        <Route path="/vinyl-flooring" element={<VinylFlooring />} />
        <Route path="/knit-fabrics" element={<RoyalKnit />} />
        <Route path="/seating-components" element={<SeatingComponents />} />
        <Route path="/coated-fabrics" element={<CoatedFabrics />} />
        <Route path="/awards-and-recognition" element={<AboutCoated />} />
        <Route path="/research-and-development" element={<Laboratory />} />
        {/* <Route path="/vinyl-applications" element={<VinylApplications />} /> */}
        <Route
          path="/vinyl-flooring/:category"
          element={<VinylApplications />}
        />
        <Route
          path="/coated-fabrics/:category"
          element={<CoatedApplications />}
        />
        <Route
          path="/seating-components/:category"
          element={<SeatingApplications />}
        />
        <Route path="/:innercategory" element={<VinylnnerApplication />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<DashBoard />} />

          <Route path="home-banner" element={<HomeBanner />} />
          <Route path="add/home-banner" element={<AddHomeBanner />} />
          <Route path="edit/home-banner/:id" element={<EditHomeBanner />} />

          <Route path="landing-banner" element={<LandingBanner />} />
          <Route path="add/landing-banner" element={<AddLandingBanner />} />
          <Route
            path="edit/landing-banner/:id"
            element={<EditLandingBanner />}
          />

          <Route path="banner" element={<Banner />} />
          <Route path="add/banner" element={<AddBanner />} />
          <Route path="edit/banner/:id" element={<EditBanner />} />

          <Route path="about" element={<About />} />
          <Route path="knit-about" element={<KnitAbout />} />
          <Route path="lvt-about" element={<LvtAbout />} />
          <Route path="seating-about" element={<SeatingAbout />} />

          <Route path="events" element={<Events />} />
          <Route path="what-we-offer" element={<Offer />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="plank-slider" element={<PlankSlider />} />
          <Route path="add/plank-slider" element={<AddPlankSlider />} />
          <Route path="edit/plank-slider/:id" element={<EditPlankSlider />} />
          <Route path="plank-category" element={<PlankCategory />} />
          <Route path="add/plank-category" element={<AddPlankCategory />} />
          <Route
            path="edit/plank-category/:id"
            element={<EditPlankCategory />}
          />
          <Route path="planks" element={<Plank />} />
          <Route path="vinyl-applications" element={<VinylApp />} />
          <Route path="vinyl-products" element={<VinylProduct />} />
          <Route path="vinyl-product-variants" element={<VinylProductVariant />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

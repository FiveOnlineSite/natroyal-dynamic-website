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
import VinylApp from "./pages/admin/VinylFlooring/VinylApp/VinylApp";
import AddVinylApp from "./pages/admin/VinylFlooring/VinylApp/AddVinylApp";
import EditVinylApp from "./pages/admin/VinylFlooring/VinylApp/EditVinylApp";
import VinylProductVariant from "./pages/admin/VinylFlooring/VinylProductVariant/VinylProductVariant";
import VinylProduct from "./pages/admin/VinylFlooring/VinylProduct/VinylProduct";
import Buttons from "./pages/admin/VinylFlooring/Buttons";
import AddSuitable from "./pages/admin/VinylFlooring/Suitable/AddSuitable";
import Suitable from "./pages/admin/VinylFlooring/Suitable/Suitable";
import EditSuitable from "./pages/admin/VinylFlooring/Suitable/EditSuitable";
import VinylAppContent from "./pages/admin/VinylFlooring/VinylAppContent/VinylAppContent";
import AddVinylAppContent from "./pages/admin/VinylFlooring/VinylAppContent/AddVinylAppContent";
import EditVinylAppContent from "./pages/admin/VinylFlooring/VinylAppContent/EditVinylAppContent";
import AddVinylProduct from "./pages/admin/VinylFlooring/VinylProduct/AddVinylProduct";
import EditVinylProduct from "./pages/admin/VinylFlooring/VinylProduct/EditVinylProduct";
import VinylProductContent from "./pages/admin/VinylFlooring/VinylProductContent/VinylProductContent";
import AddVinylProductContent from "./pages/admin/VinylFlooring/VinylProductContent/AddVinylProductContent";
import EditVinylProductContent from "./pages/admin/VinylFlooring/VinylProductContent/EditVinylProductContent";
import AddVinylProductVariant from "./pages/admin/VinylFlooring/VinylProductVariant/AddVinylProductVariant";
import EditVinylProductVariant from "./pages/admin/VinylFlooring/VinylProductVariant/EditVinylProductVariant";
import CoatedApp from "./pages/admin/CoatedFabrics/CoatedApp/CoatedApp";
import AddCoatedApp from "./pages/admin/CoatedFabrics/CoatedApp/AddCoatedApp";
import EditCoatedApp from "./pages/admin/CoatedFabrics/CoatedApp/EditCoatedApp";
import CoatedAppContent from "./pages/admin/CoatedFabrics/CoatedAppContent/CoatedAppContent";
import AddCoatedAppContent from "./pages/admin/CoatedFabrics/CoatedAppContent/AddCoatedAppContent";
import EditCoatedAppContent from "./pages/admin/CoatedFabrics/CoatedAppContent/EditCoatedAppContent";
import CoatedProduct from "./pages/admin/CoatedFabrics/CoatedProduct/CoatedProduct";
import AddCoatedProduct from "./pages/admin/CoatedFabrics/CoatedProduct/AddCoatedProduct";
import EditCoatedProduct from "./pages/admin/CoatedFabrics/CoatedProduct/EditCoatedProduct";
import SeatingApp from "./pages/admin/SeatingComponents/SeatingApp/SeatingApp";
import AddSeatingApp from "./pages/admin/SeatingComponents/SeatingApp/AddSeatingApp";
import EditSeatingApp from "./pages/admin/SeatingComponents/SeatingApp/EditSeatingApp";
import SeatingAppContent from "./pages/admin/SeatingComponents/SeatingAppContent/SeatingAppContent";
import AddSeatingAppContent from "./pages/admin/SeatingComponents/SeatingAppContent/AddSeatingAppContent";
import EditSeatingAppContent from "./pages/admin/SeatingComponents/SeatingAppContent/EditSeatingAppContent";
import SeatingProduct from "./pages/admin/SeatingComponents/SeatingProduct/SeatingProduct";
import AddSeatingProduct from "./pages/admin/SeatingComponents/SeatingProduct/AddSeatingProduct";
import EditSeatingProduct from "./pages/admin/SeatingComponents/SeatingProduct/EditSeatingProduct";
import Textile from "./pages/admin/KnitFabrics/Textiles/Textile";
import AddTextile from "./pages/admin/KnitFabrics/Textiles/AddTextile";
import EditTextile from "./pages/admin/KnitFabrics/Textiles/EditTextile";
import Tags from "./pages/admin/KnitFabrics/Tags/Tags";
import AddTags from "./pages/admin/KnitFabrics/Tags/AddTags";
import EditTags from "./pages/admin/KnitFabrics/Tags/EditTags";
import MetaData from "./pages/admin/MetaData/MetaData";
import EditMetaData from "./pages/admin/MetaData/EditMetaData";
import AddMetaData from "./pages/admin/MetaData/AddMetaData";

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
          <Route path="add/vinyl-applications" element={<AddVinylApp />} />
          <Route
            path="edit/vinyl-applications/:id"
            element={<EditVinylApp />}
          />

          <Route
            path="vinyl-application-content"
            element={<VinylAppContent />}
          />
          <Route
            path="add/vinyl-application-content"
            element={<AddVinylAppContent />}
          />
          <Route
            path="edit/vinyl-application-content/:id"
            element={<EditVinylAppContent />}
          />

          <Route path="vinyl-products" element={<VinylProduct />} />
          <Route path="add/vinyl-products" element={<AddVinylProduct />} />
          <Route
            path="edit/vinyl-products/:id"
            element={<EditVinylProduct />}
          />

          <Route
            path="vinyl-product-content"
            element={<VinylProductContent />}
          />
          <Route
            path="add/vinyl-product-content"
            element={<AddVinylProductContent />}
          />
          <Route
            path="edit/vinyl-product-content/:id"
            element={<EditVinylProductContent />}
          />

          <Route
            path="vinyl-product-variants"
            element={<VinylProductVariant />}
          />
          <Route
            path="add/vinyl-product-variants"
            element={<AddVinylProductVariant />}
          />
          <Route
            path="edit/vinyl-product-variants/:_id"
            element={<EditVinylProductVariant />}
          />

          <Route path="buttons" element={<Buttons />} />
          <Route path="suitable" element={<Suitable />} />

          <Route path="add/suitable" element={<AddSuitable />} />
          <Route path="edit/suitable/:id" element={<EditSuitable />} />

          <Route path="coated-applications" element={<CoatedApp />} />
          <Route path="add/coated-applications" element={<AddCoatedApp />} />
          <Route
            path="edit/coated-applications/:id"
            element={<EditCoatedApp />}
          />

          <Route
            path="coated-application-content"
            element={<CoatedAppContent />}
          />
          <Route
            path="add/coated-application-content"
            element={<AddCoatedAppContent />}
          />
          <Route
            path="edit/coated-application-content/:id"
            element={<EditCoatedAppContent />}
          />

          <Route path="coated-products" element={<CoatedProduct />} />
          <Route path="add/coated-products" element={<AddCoatedProduct />} />
          <Route
            path="edit/coated-products/:id"
            element={<EditCoatedProduct />}
          />

          <Route path="seating-applications" element={<SeatingApp />} />
          <Route path="add/seating-applications" element={<AddSeatingApp />} />
          <Route
            path="edit/seating-applications/:id"
            element={<EditSeatingApp />}
          />

          <Route
            path="seating-application-content"
            element={<SeatingAppContent />}
          />
          <Route
            path="add/seating-application-content"
            element={<AddSeatingAppContent />}
          />
          <Route
            path="edit/seating-application-content/:id"
            element={<EditSeatingAppContent />}
          />

          <Route path="seating-products" element={<SeatingProduct />} />
          <Route path="add/seating-products" element={<AddSeatingProduct />} />
          <Route
            path="edit/seating-products/:id"
            element={<EditSeatingProduct />}
          />

          <Route path="textiles" element={<Textile />} />
          <Route path="add/textiles" element={<AddTextile />} />
          <Route path="edit/textiles/:id" element={<EditTextile />} />

          <Route path="tags" element={<Tags />} />
          <Route path="add/tags" element={<AddTags />} />
          <Route path="edit/tags/:id" element={<EditTags />} />

          <Route path="meta-data" element={<MetaData />} />
          <Route path="add/meta-data" element={<AddMetaData />} />
          <Route path="edit/meta-data/:id" element={<EditMetaData />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

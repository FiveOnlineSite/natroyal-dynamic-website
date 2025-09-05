const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const Route = require("./routes/index");
const cors = require("cors");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 8000;

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Increase body limit for large videos
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Increase server timeout
app.use((req, res, next) => {
  req.setTimeout(10 * 60 * 1000); // 10 minutes
  res.setTimeout(10 * 60 * 1000); // 10 minutes
  next();
});

// app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api", (req, res) => {
  res.send("This is backend");
});

app.use("/api/auth", Route.authRoute);

app.use("/api/home-banner", Route.homeBannerRoute);
app.use("/api/landing-banner", Route.landingBannerRoute);
app.use("/api/banner", Route.bannerRoute);

app.use("/api/about", Route.aboutRoute);
app.use("/api/knit-about", Route.knitAboutRoute);
app.use("/api/lvt-about", Route.lvtAboutRoute);
app.use("/api/seating-about", Route.seatingAboutRoute);

app.use("/api/coated-feature", Route.coatedFeaturesRoute);
app.use("/api/lvt-feature", Route.lvtFeaturesRoute);

app.use("/api/clients", Route.clientsRoute);
app.use("/api/brochure", Route.brochuresRoute);

app.use("/api/coated-application", Route.coatedAppRoute);
app.use("/api/coated-application-content", Route.coatedAppContentRoute);
app.use("/api/coated-product", Route.coatedProductRoute);

app.use("/api/seating-application", Route.seatingAppRoute);
app.use("/api/seating-application-content", Route.seatingAppContentRoute);

app.use("/api/seating-product", Route.seatingProductRoute);

app.use("/api/vinyl-application", Route.vinylAppRoute);
app.use("/api/vinyl-application-content", Route.vinylAppContentRoute);

app.use("/api/vinyl-product-content", Route.vinylProductContentRoute);
app.use("/api/vinyl-product", Route.vinylProductRoute);

app.use("/api/vinyl-product-variant", Route.vinylProductVariantRoute);

app.use("/api/suitable", Route.suitableRoute);
app.use("/api/button", Route.buttonRoute);

app.use("/api/plank-slider", Route.plankSliderRoute);
app.use("/api/plank-category", Route.plankCategoryRoute);
app.use("/api/events", Route.eventsRoute);
app.use("/api/textiles", Route.textilesRoute);
app.use("/api/tags", Route.tagsRoute);

app.use("/api/who-we-are", Route.whoWeAreRoute);
app.use("/api/planks", Route.plankRoute);
app.use("/api/what-we-offer", Route.whatWeOfferRoute);

app.use("/api/division", Route.divisionsRoute);
app.use("/api/meta-data", Route.metaDataRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/uploads", uploadRoutes);

// app.use("/docs", express.static(path.join(__dirname, "docs")));

// // Serve the sitemap at /sitemap.xml
// app.get("/sitemap.xml", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/sitemap.xml"));
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
// });

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

// All other requests will be handled by React
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
// });

connectDb();

// generateSitemap();

app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.log(`Server connection failed due to ${error}`);
  }
  console.log(`Server is running on port ${PORT}`);
});

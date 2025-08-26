const authRoute = require("./authentication/authRoute");

const homeBannerRoute = require("./banners/homeBannerRoute");
const landingBannerRoute = require("./banners/landingBannerRoute");
const bannerRoute = require("./banners/bannerRoute");

const aboutRoute = require("./about/aboutRoute");
const knitAboutRoute = require("./about/knitAboutRoute");
const lvtAboutRoute = require("./about/lvtAboutRoute");
const seatingAboutRoute = require("./about/seatingAboutRoute");

const coatedFeaturesRoute = require("./features/coatedFeaturesRoute");
const lvtFeaturesRoute = require("./features/lvtFeaturesRoute");

const clientsRoute = require("./othercomponents/clientsRoute");
const brochuresRoute = require("./othercomponents/brochuresRoute");
const textilesRoute = require("./knitfabrics/textilesRoute");

const coatedAppRoute = require("./coatedfabrics/coatedAppRoute");
const coatedProductRoute = require("./coatedfabrics/coatedProductRoute");

const seatingAppRoute = require("./seatingcomponents/seatingAppRoute");
const seatingProductRoute = require("./seatingcomponents/seatingProductRoute");

const vinylAppRoute = require("./vinylflooring/vinylAppRoute");
const vinylAppContentRoute = require("./vinylflooring/vinylAppContentRoute");

const vinylProductRoute = require("./vinylflooring/vinylProductRoute");
const vinylProductContentRoute = require("./vinylflooring/vinylProductContentRoute");

const vinylProductVariantRoute = require("./vinylflooring/vinylProductVariantRoute");

const suitableRoute = require("./vinylflooring/suitableRoute");
const buttonRoute = require("./vinylflooring/buttonRoute");

const plankSliderRoute = require("./lvt/plankSliderRoute");
const plankCategoryRoute = require("./lvt/plankCategoryRoute");
const plankRoute = require("./lvt/plankRoute");
const eventsRoute = require("./lvt/eventsRoute");
const whoWeAreRoute = require("./lvt/whoWeAreRoute");
const whatWeOfferRoute = require("./lvt/whatWeOfferRoute");

const divisionsRoute = require("./otherpages/divisionsRoute");
const metaDataRoute = require("./otherpages/metaDataRoute");
const uploadRoutes = require("./uploadRoutes");

module.exports = {
  authRoute,

  homeBannerRoute,
  landingBannerRoute,
  bannerRoute,

  aboutRoute,
  knitAboutRoute,
  lvtAboutRoute,
  seatingAboutRoute,

  coatedFeaturesRoute,
  lvtFeaturesRoute,

  clientsRoute,
  brochuresRoute,
  textilesRoute,

  coatedAppRoute,
  coatedProductRoute,

  seatingAppRoute,
  seatingProductRoute,

  vinylAppRoute,
  vinylAppContentRoute,

  vinylProductContentRoute,
  vinylProductRoute,
  vinylProductVariantRoute,

  suitableRoute,
  buttonRoute,

  plankSliderRoute,
  plankCategoryRoute,
  plankRoute,
  eventsRoute,
  whoWeAreRoute,
  whatWeOfferRoute,

  divisionsRoute,
  metaDataRoute,
};

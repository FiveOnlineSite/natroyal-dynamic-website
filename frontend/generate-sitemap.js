const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

// The base URL of your site
const sitemap = new SitemapStream({
  hostname: "https://www.natroyalgroup.com",
});

// Write sitemap to public/sitemap.xml
const writeStream = createWriteStream("./public/sitemap.xml");

// Pipe sitemap into file stream
sitemap.pipe(writeStream);

const routes = [
  "/",
  "/about-us",
  "/contact-us",
  "/our-divisions",
  "/lvt-flooring",
  "/vinyl-flooring",
  "/knit-fabrics",
  "/seating-components",
  "/coated-fabrics",
  "/awards-and-recognition",
  "/research-and-development",

  // Static samples for dynamic routes — you must replace with actual values
  "/vinyl-flooring/education",
  "/vinyl-flooring/healthcare",
  "/vinyl-flooring/residential",
  "/vinyl-flooring/offices-retail",
  "/vinyl-flooring/hospitality",
  "/vinyl-flooring/transport",

  "/royal-star",
  "/tiger",
  "/royal-classic",
  "/majesty",
  "/tuff",
  "/orbit",
  "/majesty-pro",
  "/opera",
  "/majesty",
  "/printed-flooring",
  "/suprema-rs",
  "/standard-rs",
  "/sonata",
  "/eco-plus-v",
  "/gripper",

  "/coated-fabrics/automotive",
  "/coated-fabrics/truck",
  "/coated-fabrics/tractor",
  "/coated-fabrics/golf-cart",
  "/coated-fabrics/marine-recreational-vehicles",
  "/coated-fabrics/residential-contract-furnishing",
  "/coated-fabrics/two-wheelers",
  "/coated-fabrics/healthcare",
  "/coated-fabrics/fashion",
  "/coated-fabrics/footwear",

  "/seating-components/railway-metro",
  "/seating-components/driver-seats",
  "/seating-components/bus",
  "/seating-components/cinema",
];

// Write routes to the sitemap stream
routes.forEach((route) => {
  sitemap.write({ url: route, changefreq: "monthly", priority: 0.8 });
});

// End stream and then wait for completion
sitemap.end();

streamToPromise(sitemap)
  .then(() => {
    console.log("Sitemap successfully created at public/sitemap.xml");
  })
  .catch((err) => {
    console.error("Error generating sitemap:", err);
  });

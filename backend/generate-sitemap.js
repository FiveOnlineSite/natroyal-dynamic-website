// scripts/generate-sitemap.js
const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const { SitemapStream, streamToPromise } = require('sitemap');

// Models
const VinylAppModel = require('./models/vinylflooring/vinylAppModel');
const VinylProductModel = require('./models/vinylflooring/vinylProductModel');
const CoatedApplicationModel = require('./models/coatedfabrics/coatedAppModel');
const SeatingAppModel = require('./models/seatingcomponents/seatingAppModel');

require('dotenv').config();

const baseUrl = process.env.PROD_URL || 'https://www.natroyalgroup.com/';
const outPath = path.join(__dirname, '../frontend', 'public', 'sitemap.xml');

// Helper to generate slug from title
function generateSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-'); // replace spaces and non-word characters with dash
}

async function run() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_DB_URL, {});
    console.log('✅ Connected to MongoDB');

    const smStream = new SitemapStream({ hostname: baseUrl });

    // -------------------
    // STATIC PAGES
    // -------------------
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about-us', changefreq: 'weekly', priority: 0.8 },
      { url: '/contact-us', changefreq: 'weekly', priority: 0.8 },
      { url: '/our-divisions', changefreq: 'weekly', priority: 0.7 },
      { url: '/lvt-flooring', changefreq: 'weekly', priority: 0.7 },
      { url: '/vinyl-flooring', changefreq: 'weekly', priority: 0.7 },
      { url: '/knit-fabrics', changefreq: 'weekly', priority: 0.7 },
      { url: '/seating-components', changefreq: 'weekly', priority: 0.7 },
      { url: '/coated-fabrics', changefreq: 'weekly', priority: 0.7 },
      { url: '/awards-and-recognition', changefreq: 'monthly', priority: 0.6 },
      { url: '/research-and-development', changefreq: 'monthly', priority: 0.6 },
    ];

    staticPages.forEach(page => smStream.write(page));

    // -------------------
    // DYNAMIC PAGES
    // -------------------
    const dynamicModels = [
      { model: VinylAppModel, urlPrefix: '/vinyl-flooring/applications/' },
      { model: VinylProductModel, urlPrefix: '/vinyl-flooring/products/' },
      { model: CoatedApplicationModel, urlPrefix: '/coated-fabrics/applications/' },
      { model: SeatingAppModel, urlPrefix: '/seating-components/applications/' },
    ];

    for (const { model, urlPrefix } of dynamicModels) {
      const docs = await model.find({}).select('name updatedAt').lean(); // fetch all documents

      for (const doc of docs) {
        // Generate slug from title or fallback to _id
        const slug = doc.name ? generateSlug(doc.name) : doc._id;

        smStream.write({
          url: `${urlPrefix}${slug}`,
          lastmod: doc.updatedAt ? doc.updatedAt.toISOString() : new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        });
      }
    }

    // -------------------
    // FINALIZE SITEMAP
    // -------------------
    smStream.end();
    const data = await streamToPromise(smStream);
    await fs.outputFile(outPath, data.toString());
    console.log('✅ Sitemap written to', outPath);

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

run();

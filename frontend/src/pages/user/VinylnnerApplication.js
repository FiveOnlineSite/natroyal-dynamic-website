import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Navigate, NavLink, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import { Modal } from "react-bootstrap";
import ApplicationsModal from "../../components/ApplicationsModal";
import innerAppMetaDataMap from "../../data/innerAppMetaDataMap";

const VinylnnerApplication = () => {
  const [technicalModal, setTechnicalModal] = useState(false);
  const [installModal, setInstallModal] = useState(false);

  const { innercategory } = useParams(); // Get innercategory from URL

  useEffect(() => {
    const meta = innerAppMetaDataMap[innercategory] || {
      title: "Vinyl Flooring Applications | Natroyal",
      description:
        "Explore a wide range of vinyl flooring applications by Natroyal. Durable, stylish, and suited for every space.",
      keywords:
        "vinyl flooring, flooring applications, commercial vinyl flooring, residential vinyl flooring",
    };

    // Set Document Title
    document.title = meta.title;

    // Utility to update or create meta tag
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.name = name;
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Apply metadata
    updateMeta("description", meta.description);
    updateMeta("keywords", meta.keywords);

    // Set canonical tag
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;
  }, [innercategory]);

  const applicationData = [
    {
      type: "Moonwalk",
      title: "Moonwalk",
      name: "Moonwalk",
      bannerImg: "/images/categories/Moonwalk-Banner.png",
      technicalImg: "/images/categories/moonwalk/moonwalk-t.png",
      content: [
        {
          para: "Hardwearing Vinyl Floor covering in overall design",
        },
        {
          para: "0.7 mm pure PVC transparent wear layer with floating decorative chips",
        },
        {
          para: "Shades and textures combined to create stunning floor designs",
        },
        {
          para: "PU coating (optional) for easy and low cost maintenance",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },
        {
          para: "Glass fibre scrim for dimensional stability",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/moonwalk/MoonCraterMW2303.jpg",
          name: "Moon Crater MW2303",
        },
        {
          image: "/images/categories/moonwalk/NeonLightMW2305.jpg",
          name: "Neon Light MW2305",
        },
        {
          image: "/images/categories/moonwalk/PearlStarMW2308.jpg",
          name: "Pearl Star MW2308",
        },
        {
          image: "/images/categories/moonwalk/SilverGlazeMW2304.jpg",
          name: "Silver Glaze MW2304",
        },
        {
          image: "/images/categories/moonwalk/SkylineMW2302.jpg",
          name: "Skyline MW2302",
        },
        {
          image: "/images/categories/moonwalk/Sunrise-GloryMW2310.jpg",
          name: "Sunrise Glory MW2310",
        },
        {
          image: "/images/categories/moonwalk/TwilightZoneMW2301.jpg",
          name: "Twilight Zone MW2301",
        },
      ],
    },
    {
      type: "Symphony",
      title: "Symphony",
      name: "Symphony",
      bannerImg: "/images/categories/symphony-Banner.png",
      content: [
        {
          para: "Symphony has a well-orchestrated ensemble of chips that flows in mesmerising patterns",
        },
        {
          para: "1 mm homogenous wear layer with compact vibrant color particles throughout the thickness for enhanced durability",
        },
        {
          para: "PU coating (optional) for easy and low cost maintenance",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },

        {
          para: "Glass fibre scrim for dimensional stability",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/symphony/AngelicaSY2408.jpg",
          name: "Angelica SY2408",
        },
        {
          image: "/images/categories/symphony/BlueChipSY2414.jpg",
          name: "Blue Chip SY2414",
        },
        {
          image: "/images/categories/symphony/ButterflySY2415.jpg",
          name: "Butterfly SY2415",
        },
        {
          image: "/images/categories/symphony/CastleRedSY2409.jpg",
          name: "Castle Red SY2409",
        },
        {
          image: "/images/categories/symphony/ElectricBlueSY2403.jpg",
          name: "Electric Blue SY2403",
        },
        {
          image: "/images/categories/symphony/GoodLuckSY2401.jpg",
          name: "Good Luck SY2401",
        },
        {
          image: "/images/categories/symphony/JonquilSY2411.jpg",
          name: "Jonquil SY2411",
        },
        {
          image: "/images/categories/symphony/JungleGreenSY2406.jpg",
          name: "Jungle Green SY2406",
        },
        {
          image: "/images/categories/symphony/LionsManeSY2402.jpg",
          name: "Lions Mane SY2402",
        },
        {
          image: "/images/categories/symphony/MedallionSY2410.jpg",
          name: "Medallion SY2410",
        },
        {
          image: "/images/categories/symphony/OrientalPearlSY2412.jpg",
          name: "Oriental Pearl SY2412",
        },
        {
          image: "/images/categories/symphony/ParakeetSY2405.jpg",
          name: "Parakeet SY2405",
        },
        {
          image: "/images/categories/symphony/ProsperitySY2407.jpg",
          name: "Prosperity SY2407",
        },
        {
          image: "/images/categories/symphony/RoyaltySY2404.jpg",
          name: "Royalty SY2404",
        },
        {
          image: "/images/categories/symphony/WanderLustSY2413.jpg",
          name: "Wander Lust SY2413",
        },
      ],
    },
    {
      type: "Elegant",
      title: "Elegant",
      name: "Elegant",
      bannerImg: "/images/categories/Elegant-Banner.png",
      content: [
        {
          para: "Printed flooring with floating colourful chips adds elegance to the room decore",
        },
        {
          para: "Elegant comes in versatile vibrant colours",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/elegant/EG2047.jpg",
          name: "BEIGE EG2047",
        },
        {
          image: "/images/categories/elegant/EG2011.jpg",
          name: "YELLOW EG2011",
        },
        {
          image: "/images/categories/elegant/EG2958.jpg",
          name: "BROWN EG2037",
        },
        {
          image: "/images/categories/elegant/EG2029.jpg",
          name: "NAVY BLUE EG2029",
        },
        {
          image: "/images/categories/elegant/EG2957.jpg",
          name: "TERRACOTTA EG2957",
        },
        {
          image: "/images/categories/elegant/EG2031.jpg",
          name: "SKY BLUE EG2031",
        },
        {
          image: "/images/categories/elegant/EG2147.jpg",
          name: "DARK GREY EG2147",
        },
        {
          image: "/images/categories/elegant/EG2041.jpg",
          name: "GREEN EG2041",
        },
        {
          image: "/images/categories/elegant/EG2958.jpg",
          name: "LIGHT Grey EG2958",
        },
      ],
    },
    {
      type: "Accord",
      title: "Accord",
      name: "Accord",
      bannerImg: "/images/categories/accord-banner.png",
      content: [
        {
          para: "1 mm homogenous wear layer with compact sombre color particles throughout the thickness for enhanced durability",
        },
        {
          para: "PU coating (optional) for easy and low cost maintenance",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },

        {
          para: "Glass fibre scrim for dimensional stability",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/accord/BlueberryRushAC2252.jpg",
          name: "Blueberry Rush AC2252",
        },
        {
          image: "/images/categories/accord/BlueLagoonAC2251.jpg",
          name: "Blue Lagoon AC2251",
        },
        {
          image: "/images/categories/accord/GreenTeaAC2258.jpg",
          name: "Green Tea AC2258",
        },
        {
          image: "/images/categories/accord/IcyChillAC2253.jpg",
          name: "Icy Chill AC2253",
        },
        {
          image: "/images/categories/accord/LimeDelightAC2256.jpg",
          name: "Lime Delight AC2256",
        },
        {
          image: "/images/categories/accord/Swiss CoffeeAC2255.jpg",
          name: "Swiss Coffee AC2255",
        },
        {
          image: "/images/categories/accord/TangoAC2257.jpg",
          name: "Tango AC2257",
        },
        {
          image: "/images/categories/accord/ThundercloudAC2254.jpg",
          name: "Thundercloud AC2254",
        },
      ],
    },
    {
      type: "Startrek",
      title: "Startrek",
      name: "Startrek",
      bannerImg: "/images/categories/Startrek-Banner.png",
      content: [
        {
          para: "1 mm homogenous wear layer with compact vibrant color particles throughout the thickness for enhanced durability",
        },
        {
          para: "PU coating (optional) for easy and low cost maintenance",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },

        {
          para: "Glass fibre scrim for dimensional stability",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/startrek/AmazonSK2506.jpg",
          name: "Amazon SK2506",
        },
        {
          image: "/images/categories/startrek/MochaMousseSK2501.jpg",
          name: "Mocha Mousse SK2501",
        },
        {
          image: "/images/categories/startrek/OrangeSparkSK2508.jpg",
          name: "Orange Spark SK2508",
        },
        {
          image: "/images/categories/startrek/SilverLiningSK2502.jpg",
          name: "Silver Lining SK2502",
        },
        {
          image: "/images/categories/startrek/SplashSK2630.jpg",
          name: "Splash SK2630",
        },
        {
          image: "/images/categories/startrek/SunriseSK2509.jpg",
          name: "Sunrise SK2509",
        },
        {
          image: "/images/categories/startrek/TiffanySK2505.jpg",
          name: "Tiffany SK2505",
        },
        {
          image: "/images/categories/startrek/WalnutShellSK2507.jpg",
          name: "Walnut Shell SK2507",
        },
      ],
    },
    {
      type: "Dazzle",
      title: "Dazzle",
      name: "Dazzle",
      bannerImg: "/images/categories/Dazzle-Banner.png",
      content: [
        {
          para: "1 mm homogenous wear layer with compact vibrant color particles throughout the thickness for enhanced durability",
        },
        {
          para: "PU coating (optional) for easy and low cost maintenance",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },

        {
          para: "Glass fibre scrim for dimensional stability",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],
      applications: [
        {
          image: "/images/categories/dazzle/DZ2152.jpg",
          name: "TURQUOISE DZ2152",
        },
        {
          image: "/images/categories/dazzle/DZ2998.jpg",
          name: "TOPAZ DZ2998",
        },
        {
          image: "/images/categories/dazzle/DZ2047.jpg",
          name: "OPAL DZ2047",
        },
        {
          image: "/images/categories/dazzle/DZ2041.jpg",
          name: "EMERALD DZ2041",
        },
        {
          image: "/images/categories/dazzle/DZ2038.jpg",
          name: "MOONSTONE DZ2038",
        },
        {
          image: "/images/categories/dazzle/DZ2147.jpg",
          name: "ONYX DZ2147",
        },
        {
          image: "/images/categories/dazzle/DZ2037.jpg",
          name: "AMBER DZ2037",
        },
        {
          image: "/images/categories/dazzle/DZ2011.jpg",
          name: "CITRINE DZ2011",
        },
        {
          image: "/images/categories/dazzle/DZ2094.jpg",
          name: "RUBY DZ2094",
        },
        {
          image: "/images/categories/dazzle/DZ2032.jpg",
          name: "ZIRCON DZ2032",
        },
      ],
    },
    {
      type: "Mirakle",
      title: "Mirakle",
      name: "Mirakle",
      bannerImg: "/images/categories/Mirakle-Banner.png",
      content: [
        {
          para: "High Quality Vinyl Resilient flooring in Homogenous Construction",
        },
        {
          para: "Anti-bacterial and Anti-Fungal Qualities",
        },
        {
          para: "Superior marbleised designs in refreshed colors",
        },
        {
          para: "Available in tile and roll form in different thickness",
        },

        {
          para: "Value for MONEY option for medium to high traffic areas",
        },
        {
          para: "Tough and durable with PU (optional) for easy and low cost maintenance",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/mirakle/Blue-sea-MK2352.jpg",
          name: "Blue Sea MK2352",
        },
        {
          image: "/images/categories/mirakle/Cool-Breeze-MK2351.jpg",
          name: "Cool Breeze MK2351",
        },
        {
          image: "/images/categories/mirakle/Dusk-cloud-MK2358.jpg",
          name: "Dusk Cloud MK2358",
        },
        {
          image: "/images/categories/mirakle/Forest-whisper-MK2354.jpg",
          name: "Forest whisper MK2354",
        },
        {
          image: "/images/categories/mirakle/Nimbus-shower-MK2357.jpg",
          name: "Nimbus Shower MK2357",
        },
        {
          image: "/images/categories/mirakle/Red-earth-MK2353.jpg",
          name: "Red Earth MK2353",
        },
        {
          image: "/images/categories/mirakle/Stoneware-MK2356.jpg",
          name: "Stoneware MK2356",
        },
        {
          image: "/images/categories/mirakle/Sunny-sands-MK2355.jpg",
          name: "Sunny sands MK2355",
        },
      ],
    },
    {
      type: "Royal-Star",
      title: "Royal",
      spanTitle: "Star",
      name: "Royal Star",
      bannerImg: "/images/categories/Royal-Star-Banner.png",
      content: [
        {
          para: "Colored wear layer with decorative multi-color chips to enhance the room interiors",
        },
        {
          para: "Modern designs in exciting colors",
        },
        {
          para: "Easy low-cost maintenance (PU optional)",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/royal-star/RS3114.jpg",
          name: "Soft Glow RS3114",
        },
        {
          image: "/images/categories/royal-star/RS3100.jpg",
          name: "Crimson Red RS3100",
        },
        {
          image: "/images/categories/royal-star/RS3104.jpg",
          name: "Fire Red RS3104",
        },
        {
          image: "/images/categories/royal-star/RS3109.jpg",
          name: "Sapphire RS3109",
        },
        {
          image: "/images/categories/royal-star/RS3105.jpg",
          name: "Golden Touch RS3105",
        },
        {
          image: "/images/categories/royal-star/RS3112.jpg",
          name: "Ivory Coast RS3112",
        },
        {
          image: "/images/categories/royal-star/RS3106.jpg",
          name: "Water Rapids RS3106",
        },
        {
          image: "/images/categories/royal-star/RS3107.jpg",
          name: "Silver Sand RS3107",
        },
        {
          image: "/images/categories/royal-star/RS3108.jpg",
          name: "Lassic Grey RS3108",
        },
        {
          image: "/images/categories/royal-star/RS3110.jpg",
          name: "Blue Water RS3110",
        },
        {
          image: "/images/categories/royal-star/RS3103.jpg",
          name: "Volcano RS3103",
        },
        {
          image: "/images/categories/royal-star/RS3102.jpg",
          name: "Sea Green RS3102",
        },
      ],
    },
    {
      type: "Nuplank",
      title: "Nuplank",
      name: "Nuplank",
      bannerImg: "/images/categories/Nuplank-Banner.png",
      content: [
        {
          para: "Ideal for showrooms, offices, hotel lobbies and leisure environments",
        },
        {
          para: "Designer collection of realistic looking wooden patterns and colors accurately replicated in PVC planks",
        },
        {
          para: "Available in 2 mm & 1.5 mm thickness and various dimensions",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/nuplank/AspenBrownNU361037.jpg",
          name: "Aspen Brown NU361037",
        },
        {
          image: "/images/categories/nuplank/AspenBrownOrangeNU361039.jpg",
          name: "Aspen Brown Orange",
        },
        {
          image: "/images/categories/nuplank/AspenCreamNU361013.jpg",
          name: "Aspen Cream NU361013",
        },
        {
          image: "/images/categories/nuplank/AspenDarkBeigeNU361008.jpg",
          name: "Aspen Dark Beige NU361008",
        },
        {
          image: "/images/categories/nuplank/BartekBlackNU363051.jpg",
          name: "Bartek Black NU363051",
        },
        {
          image: "/images/categories/nuplank/BartekBrownNU363037.jpg",
          name: "Bartek Brown NU363037",
        },
        {
          image: "/images/categories/nuplank/BartekCreamNU363013.jpg",
          name: "Bartek Cream NU363013",
        },
        {
          image: "/images/categories/nuplank/BartekMaroonNU363026.jpg",
          name: "Bartek Maroon NU363026",
        },
        {
          image: "/images/categories/nuplank/BartekNaturalNU363005.jpg",
          name: "Bartek Natural NU363005",
        },
        {
          image: "/images/categories/nuplank/BartekRosewoodNU363050.jpg",
          name: "Bartek Rosewood NU363050",
        },
        {
          image: "/images/categories/nuplank/CanaryCreamNU362013.jpg",
          name: "Canary Cream NU362013",
        },
        {
          image: "/images/categories/nuplank/CanaryDarkBeigeNU362008.jpg",
          name: "Canary Dark Beige NU362008",
        },
        {
          image: "/images/categories/nuplank/CanaryReddishBrownNU362048.jpg",
          name: "Canary Reddish Brown NU362048",
        },
        {
          image: "/images/categories/nuplank/CanaryRosewoodNU362050.jpg",
          name: "Canary Rosewood NU362050",
        },
        {
          image: "/images/categories/nuplank/WoodyBlackNU364051.jpg",
          name: "Woody Black NU364051",
        },
        {
          image: "/images/categories/nuplank/WoodyCreamNU364013.jpg",
          name: "Woody Cream NU364013",
        },
        {
          image: "/images/categories/nuplank/WoodyLightBeigeNU364004.jpg",
          name: "Woody Light Beige NU364004",
        },
        {
          image: "/images/categories/nuplank/WoodyNaturalNU364005.jpg",
          name: "Woody Natural NU364005",
        },
      ],
    },
    {
      type: "Tiger",
      title: "Tiger",
      name: "Tiger",
      bannerImg: "/images/categories/Tiger vinyl flooring 1.png",
      content: [
        {
          para: "Superior marbleised designs in refreshed colors",
        },
        {
          para: "Available in Roll form in 1 mm, 1.5 mm and 2 mm thickness",
        },
        {
          para: "Value for money option for medium to high traffic areas",
        },
        {
          para: "Suitable for heavy duty commercial areas like shopping complexes, Hospitals, Education, Offices, Retails, Cabins, etc",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/tiger/ice-burg.jpg",
          name: "Ice Burg",
        },
        {
          image: "/images/categories/tiger/castle-red.jpg",
          name: "Castle Red",
        },
        {
          image: "/images/categories/tiger/mellow-green.jpg",
          name: "Mellow Green",
        },
        {
          image: "/images/categories/tiger/Dunhill-copper.jpg",
          name: "Dunhill Copper",
        },
        {
          image: "/images/categories/tiger/soft-linon.jpg",
          name: "Soft Linon",
        },
        {
          image: "/images/categories/tiger/stone-path.jpg",
          name: "Stone path",
        },
        {
          image: "/images/categories/tiger/dessert-ivory.jpg",
          name: "Desert Ivory",
        },
        {
          image: "/images/categories/tiger/caspian-blue.jpg",
          name: "Caspian blue",
        },
        {
          image: "/images/categories/tiger/Water-jet.jpg",
          name: "Water jet",
        },
      ],
    },
    {
      type: "Avengers",
      title: "Avengers",
      name: "Avengers",
      bannerImg: "/images/categories/Avenger-Banner.jpg",
      content: [
        {
          para: "Avengers is multi- purpose sports surface designed for use in a wide range of sporting events like Gymnasiums, Yoga rooms, Table Tennis, fitness centers etc.",
        },
        {
          para: "It is manufactured keeping in view the varying shock absorbing requirements and performance requirements.",
        },
      ],
      suitable: [
        {
          name: "Sports",
          image: "/images/icons/sports.png",
          link: "/vinyl-flooring/sports",
        },
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/avengers/01satinwood.jpg",
          name: "Stainwood 1511",
        },
        {
          image: "/images/categories/avengers/02ebony.jpg",
          name: "Ebony 5013",
        },
        {
          image: "/images/categories/avengers/03basswood.jpg",
          name: "Basswood 6810",
        },
        {
          image: "/images/categories/avengers/04lumber.jpg",
          name: "Lumber 6812",
        },
        {
          image: "/images/categories/avengers/05red.jpg",
          name: "Red 8101",
        },
        {
          image: "/images/categories/avengers/06orange.jpg",
          name: "Orange 8201",
        },
        {
          image: "/images/categories/avengers/07blue.jpg",
          name: "Blue 8301",
        },
        {
          image: "/images/categories/avengers/08green.jpg",
          name: "Green 8401",
        },
        {
          image: "/images/categories/avengers/09steelgrey.jpg",
          name: "Steel Grey 8501",
        },
      ],
    },
    {
      type: "Wally",
      title: "Wally",
      name: "Wally",
      bannerImg: "/images/categories/Wally-Banner.png",
      content: [
        {
          para: "Easy to clean, install and attractive finish",
        },
        {
          para: "Excellent barrier to dirt and infection with PU shield",
        },
        {
          para: "Ideal for wet and Hygiene critical areas due to Anti-fungal and Anti-bacterial treatment",
        },
      ],
      suitable: [
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
      ],

      applications: [
        {
          image: "/images/categories/wally/Aqua-Young-WY2398.jpg",
          name: "Aqua Young WY2398",
        },
        {
          image: "/images/categories/wally/Calming-BlueWY2400.jpg",
          name: "Calming Blue WY2400",
        },
        {
          image: "/images/categories/wally/Coral-Rocks-WY2397.jpg",
          name: "Coral Rocks WY2397",
        },
        {
          image: "/images/categories/wally/Lilac-DashWY2395.jpg",
          name: "Lilac Dash WY2395",
        },
        {
          image: "/images/categories/wally/SnowBlush-WY2399.jpg",
          name: "Snow Blush WY2399",
        },
        {
          image: "/images/categories/wally/Soft-Honey-WY2396.jpg",
          name: "Soft Honey WY2396",
        },
      ],
    },
    {
      type: "Orbit",
      title: "Orbit",
      name: "Orbit",
      bannerImg: "/images/categories/Orbit-Banner.png",
      content: [
        {
          para: "For greater safety in sensitive environments",
        },
        {
          para: "Calendered and compacted with permanent anti-static properties",
        },
        {
          para: " Ideally suitable for high-tech applications, electronics, telecommunication areas, computer rooms, operating theatres, radiology, etc",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/orbit/ArabianSandAT2655.jpg",
          name: "Arabian Sand AT2655",
        },
        {
          image: "/images/categories/orbit/GreyMatterAT2652.jpg",
          name: "Grey Matter AT2652",
        },
        {
          image: "/images/categories/orbit/HazelnutAT2654.jpg",
          name: "Hazelnut AT2654",
        },
        {
          image: "/images/categories/orbit/Olive-PathAT2653.jpg",
          name: "Olive Path AT2653",
        },
        {
          image: "/images/categories/orbit/Plain-BlissAT2651.jpg",
          name: "Plain Bliss AT2651",
        },
      ],
    },
    {
      type: "Aqua-RS",
      title: "Aqua",
      spanTitle: "RS",
      name: "Aqua RS",
      bannerImg: "/images/categories/Aqua-RS-Banner.png",
      content: [
        {
          para: "Designed for barefoot and continually wet areas",
        },
        {
          para: "1 mm homogenous pimple embossed wear layer provides long-life slip resistance with a deep inlay of silicon carbide granules, quartz and colourful chips",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },
        {
          para: "Glass fibre scrim for dimensional stability",
        },
        {
          para: "Non-woven backing enhances sub-floor adhesion (optional for non wet area application)",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/aqua/RQ2640.jpg",
          name: "Water Vapour RQ2640",
        },
        {
          image: "/images/categories/aqua/RQ2641.jpg",
          name: "Deep Dive RQ2641",
        },
        {
          image: "/images/categories/aqua/RQ2642.jpg",
          name: "Ice Berg RQ2642",
        },
        {
          image: "/images/categories/aqua/RQ2644.jpg",
          name: "Grainy Sand RQ2644",
        },
        {
          image: "/images/categories/aqua/RQ2643.jpg",
          name: "Sea Bed RQ2643",
        },
        {
          image: "/images/categories/aqua/RQ2648.jpg",
          name: "African Desert RQ2648",
        },
        {
          image: "/images/categories/aqua/RQ2646.jpg",
          name: "Rainfall RQ2646",
        },
        {
          image: "/images/categories/aqua/RQ2647.jpg",
          name: "Forest Canopy RQ2647",
        },
      ],
    },
    {
      type: "Majesty-Pro",
      title: "Majesty Pro",
      spanTitle: "Pro",
      name: "Majesty Pro",
      bannerImg: "/images/categories/Majesty-Pro-Banner.png",
      content: [
        {
          para: "Hardwearing Vinyl Floor covering in elegant and realistic wood designs",
        },
        {
          para: "0.7 mm pure PVC transparent wear layer",
        },
        {
          para: "PU coating for easy and low cost maintenance",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining.",
        },

        {
          para: "Glass fibre scrim for dimensional stability",
        },
        {
          para: "Ideal for domestic and semi-commercial use",
        },
      ],
      suitable: [
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/majesty-pro/MP 117047.jpg",
          name: "Beige MP117047",
        },
        {
          image: "/images/categories/majesty-pro/MP117005.jpg",
          name: "Natural MP117005",
        },
        {
          image: "/images/categories/majesty-pro/MP117048.jpg",
          name: "Reddish Brown MP117048",
        },
        {
          image: "/images/categories/majesty-pro/MP351013.jpg",
          name: "Cream MP351013",
        },
        {
          image: "/images/categories/majesty-pro/MP353039.jpg",
          name: "Burnt Orange MP351039",
        },
        {
          image: "/images/categories/majesty-pro/MP351985.jpg",
          name: "CN Natural MP351985",
        },
        {
          image: "/images/categories/majesty-pro/MP301008.jpg",
          name: "Dark Beige MP301008",
        },
        {
          image: "/images/categories/majesty-pro/MP305008.jpg",
          name: "Dark Beige MP305008",
        },
        {
          image: "/images/categories/majesty-pro/MP305047.jpg",
          name: "Beige MP305047",
        },
        {
          image: "/images/categories/majesty-pro/MP303013.jpg",
          name: "Cream MP303013",
        },
        {
          image: "/images/categories/majesty-pro/MP305037.jpg",
          name: "Brown MP305037",
        },
        {
          image: "/images/categories/majesty-pro/MP305955.jpg",
          name: "C Rosewood MP305955",
        },
        {
          image: "/images/categories/majesty-pro/MP353004.jpg",
          name: "Light Beige MP353004",
        },
        {
          image: "/images/categories/majesty-pro/MP353037.jpg",
          name: "Brown MP353037",
        },
        {
          image: "/images/categories/majesty-pro/MP353039.jpg",
          name: "Burnt Orange MP353039",
        },
      ],
    },
    {
      type: "Opera",
      title: "Opera",
      name: "Opera",
      bannerImg: "/images/categories/Opera-Banner.png",
      content: [
        {
          para: "Wooden designs in various attractive colors",
        },
        {
          para: "Shades and textures are combined to create stunning floor designs",
        },
        {
          para: "Value for MONEY wood designs suited for residential and small shops",
        },
      ],
      suitable: [
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
      ],

      applications: [
        {
          image: "/images/categories/opera/1.jpg",
          name: "Platina Beige OP307047",
        },
        {
          image: "/images/categories/opera/2.jpg",
          name: "Platina Blue OP307010",
        },
        {
          image: "/images/categories/opera/3.jpg",
          name: "Cream OP306013",
        },
        {
          image: "/images/categories/opera/4.jpg",
          name: "Natural OP306005",
        },
        {
          image: "/images/categories/opera/5.jpg",
          name: "Brown OP306037",
        },
        {
          image: "/images/categories/opera/6.jpg",
          name: "New Natural OP306985",
        },
        {
          image: "/images/categories/opera/7.jpg",
          name: "Light Beige OP301004",
        },
        {
          image: "/images/categories/opera/8.jpg",
          name: "Natural OP301005",
        },
        {
          image: "/images/categories/opera/9.jpg",
          name: "Dark Beige OP301008",
        },
        {
          image: "/images/categories/opera/10.jpg",
          name: "Rosewood OP301955",
        },
        {
          image: "/images/categories/opera/11.jpg",
          name: "Grey 302002",
        },
        {
          image: "/images/categories/opera/12.jpg",
          name: "Beige OP302047",
        },
        {
          image: "/images/categories/opera/13.jpg",
          name: "Burnt Orange OP302039",
        },
        {
          image: "/images/categories/opera/14.jpg",
          name: "Terracotta OP302957",
        },
        {
          image: "/images/categories/opera/15.jpg",
          name: "Light Beige OP303004",
        },
        {
          image: "/images/categories/opera/16.jpg",
          name: "Natural OP303005",
        },
        {
          image: "/images/categories/opera/17.jpg",
          name: "Cream OP303013",
        },
        {
          image: "/images/categories/opera/18.jpg",
          name: "New Natural OP303985",
        },
        {
          image: "/images/categories/opera/19.jpg",
          name: "New Natural OP304985",
        },
        {
          image: "/images/categories/opera/20.jpg",
          name: "Light Beige OP304004",
        },
        {
          image: "/images/categories/opera/21.jpg",
          name: "Natural OP304005",
        },
        {
          image: "/images/categories/opera/22.jpg",
          name: "Brown OP304037",
        },
      ],
    },
    {
      type: "Royal-Classic",
      title: "Royal",
      spanTitle: "Classic",
      name: "Royal Classic",
      bannerImg: "/images/categories/Royal-Classic-Banner.png",
      content: [
        {
          para: "Designers collection of authentic images and colours accurately reproduced in roll form",
        },
        {
          para: "Ideal for HOTELS, residential and leisure enviroments",
        },
      ],
      suitable: [
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/royal-classic/1.jpg",
          name: "Stud Green RC21050",
        },
        {
          image: "/images/categories/royal-classic/2.jpg",
          name: "Beige RC21047",
        },
        {
          image: "/images/categories/royal-classic/3.jpg",
          name: "Chrome Yellow RC21036",
        },
        {
          image: "/images/categories/royal-classic/4.jpg",
          name: "Beige RC22047",
        },
        {
          image: "/images/categories/royal-classic/5.jpg",
          name: "R Brown RC12048",
        },
        {
          image: "/images/categories/royal-classic/6.jpg",
          name: "Cream RC12013",
        },
        {
          image: "/images/categories/royal-classic/7.jpg",
          name: "Natural RC175005",
        },
        {
          image: "/images/categories/royal-classic/8.jpg",
          name: "Beige RC175047",
        },
        {
          image: "/images/categories/royal-classic/9.jpg",
          name: "R Brown RC175048",
        },
        {
          image: "/images/categories/royal-classic/10.jpg",
          name: "Dark Beige RC175008",
        },
        {
          image: "/images/categories/royal-classic/11.jpg",
          name: "R Brown RC13048",
        },
        {
          image: "/images/categories/royal-classic/12.jpg",
          name: "Natural RC13005",
        },
        {
          image: "/images/categories/royal-classic/13.jpg",
          name: "Almond Brown RC13068",
        },
        {
          image: "/images/categories/royal-classic/14.jpg",
          name: "Cream RC15013",
        },
        {
          image: "/images/categories/royal-classic/15.jpg",
          name: "Burnt Orange RC15039",
        },
        {
          image: "/images/categories/royal-classic/16.jpg",
          name: "Natural RC26005",
        },
        {
          image: "/images/categories/royal-classic/17.jpg",
          name: "Chrome Yellow RC26036",
        },
      ],
    },
    {
      type: "Majesty",
      title: "Majesty",
      name: "Majesty",
      bannerImg: "/images/categories/Majesty-Banner.png",
      content: [
        {
          para: "Hardwearing Vinyl Floor covering in elegant and realistic wood designs",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining.",
        },
        {
          para: "Ideal for showroom, HOTELS and leisure enviroments",
        },
      ],
      suitable: [
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/majesty/1.jpg",
          name: "Light Beige MP353004",
        },
        {
          image: "/images/categories/majesty/2.jpg",
          name: "Brown MP353037",
        },
        {
          image: "/images/categories/majesty/3.jpg",
          name: "Burnt Orange MP353039",
        },
        {
          image: "/images/categories/majesty/4.jpg",
          name: "Dark Beige MP305008",
        },
        {
          image: "/images/categories/majesty/5.jpg",
          name: "Beige MP305047",
        },
        {
          image: "/images/categories/majesty/6.jpg",
          name: "Brown MP305037",
        },
        {
          image: "/images/categories/majesty/7.jpg",
          name: "C Rosewood MP305955",
        },
        {
          image: "/images/categories/majesty/8.jpg",
          name: "Beige MP117047",
        },
        {
          image: "/images/categories/majesty/9.jpg",
          name: "Natural MP117005",
        },
        {
          image: "/images/categories/majesty/10.jpg",
          name: "Ddish Brown MP117048",
        },
        {
          image: "/images/categories/majesty/11.jpg",
          name: "Opal Grey MJ352002",
        },
        {
          image: "/images/categories/majesty/12.jpg",
          name: "Cream MP351013",
        },
        {
          image: "/images/categories/majesty/13.jpg",
          name: "Burnt Orange MP351039",
        },
        {
          image: "/images/categories/majesty/14.jpg",
          name: "CN Natural MP351985",
        },
        {
          image: "/images/categories/majesty/15.jpg",
          name: "Opal Blue MJ352010",
        },
      ],
    },
    {
      type: "Printed-Flooring",
      title: "Printed",
      spanTitle: "Flooring",
      name: "Printed Flooring",
      bannerImg: "/images/categories/Printed-Flooring-Banner.png",
      content: [
        {
          para: "Vast collection of over 300 references",
        },
        {
          para: "Designs inculde Floral, Wooden, Geometric shapes, Stones, etc",
        },
        {
          para: "Comes in various thickness ranging 0.40 mm to 0.65 mm",
        },
      ],
      suitable: [
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
      ],

      applications: [
        {
          image: "/images/categories/printed/1.jpg",
          name: "Beige PR188047",
        },
        {
          image: "/images/categories/printed/2.jpg",
          name: "C Brown PR14979",
        },
        {
          image: "/images/categories/printed/3.jpg",
          name: "Natural PR190005",
        },
        {
          image: "/images/categories/printed/4.jpg",
          name: "Cedar Natural PR172005",
        },
        {
          image: "/images/categories/printed/5.jpg",
          name: "Light Beige PR198004",
        },
        {
          image: "/images/categories/printed/6.jpg",
          name: "Light Brown PR167953",
        },
        {
          image: "/images/categories/printed/7.jpg",
          name: "C.C.Yellow PR177983",
        },
        {
          image: "/images/categories/printed/8.jpg",
          name: "Light Beige PR206004",
        },
        {
          image: "/images/categories/printed/9.jpg",
          name: "C.C.Yellow PR54983",
        },
        {
          image: "/images/categories/printed/10.jpg",
          name: "C.C.Yellow PR192983",
        },
        {
          image: "/images/categories/printed/11.jpg",
          name: "Grey PR168002",
        },
        {
          image: "/images/categories/printed/12.jpg",
          name: "Beige PR119047",
        },
        {
          image: "/images/categories/printed/13.jpg",
          name: "Grey PR203002",
        },
        {
          image: "/images/categories/printed/14.jpg",
          name: "Brown PR51037",
        },
        {
          image: "/images/categories/printed/15.jpg",
          name: "Black PR205051",
        },
        {
          image: "/images/categories/printed/16.jpg",
          name: "Beige PR202047",
        },
        {
          image: "/images/categories/printed/17.jpg",
          name: "Blue PR60010",
        },
        {
          image: "/images/categories/printed/18.jpg",
          name: "Natural PR179005",
        },
        {
          image: "/images/categories/printed/19.jpg",
          name: "Beige PR17047",
        },
        {
          image: "/images/categories/printed/20.jpg",
          name: "Brick Gold PR191099",
        },
        {
          image: "/images/categories/printed/21.jpg",
          name: "Beige PR166047",
        },
        {
          image: "/images/categories/printed/22.jpg",
          name: "Natural PR029005",
        },
        {
          image: "/images/categories/printed/23.jpg",
          name: "C.Rosewood PR151955",
        },
        {
          image: "/images/categories/printed/24.jpg",
          name: "Green PR142041",
        },
        {
          image: "/images/categories/printed/25.jpg",
          name: "Green PR041041",
        },
        {
          image: "/images/categories/printed/26.jpg",
          name: "C.Black PR196988",
        },
        {
          image: "/images/categories/printed/27.jpg",
          name: "Beige PR133047",
        },
        {
          image: "/images/categories/printed/28.jpg",
          name: "Cream PR204013",
        },
        {
          image: "/images/categories/printed/29.jpg",
          name: "Burnt Orange PR032039",
        },
        {
          image: "/images/categories/printed/30.jpg",
          name: "C.C.Yellow PR94983",
        },
        {
          image: "/images/categories/printed/31.jpg",
          name: "C.C.Yellow PR93983",
        },
        {
          image: "/images/categories/printed/32.jpg",
          name: "C.C.Yellow PR165983",
        },
      ],
    },
    {
      type: "Tuff",
      title: "Tuff",
      name: "Tuff",
      bannerImg: "/images/categories/Tuff-Banner.png",
      content: [
        {
          para: "Flexible PVC flooring in light marbleised designs",
        },
        {
          para: "Available in tile and roll form in different thickness",
        },
        {
          para: "Value for money option for low to medium traffic areas",
        },
      ],
      suitable: [
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/tuff/1.jpg",
          name: "Ivory TF2070",
        },
        {
          image: "/images/categories/tuff/2.jpg",
          name: "Ocean Blue TF2029",
        },
        {
          image: "/images/categories/tuff/3.jpg",
          name: "Beige TF2047",
        },
        {
          image: "/images/categories/tuff/4.jpg",
          name: "Harvest Green TF2085",
        },
        {
          image: "/images/categories/tuff/5.jpg",
          name: "Craft Brown TF2073",
        },
        {
          image: "/images/categories/tuff/6.jpg",
          name: "Steel Grey D TF2074",
        },
        {
          image: "/images/categories/tuff/7.jpg",
          name: "Copper Gold TF2099",
        },
        {
          image: "/images/categories/tuff/8.jpg",
          name: "Slate Grey TF2078",
        },
        {
          image: "/images/categories/tuff/9.jpg",
          name: "Wine Red TF2088",
        },
        {
          image: "/images/categories/tuff/10.jpg",
          name: "P.O.Red TF2094",
        },
      ],
    },
    {
      type: "Suprema-RS",
      title: "Suprema",
      spanTitle: "RS",
      name: "Suprema RS",
      bannerImg: "/images/categories/Suprema-rs-Banner.png",
      content: [
        {
          para: "1 mm homogenous wear layer provides long-life slip resistance with a deep inlay of silicon carbide granules and color chips",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },
        {
          para: "Glass fibre scrim for dimensional stability",
        },
        {
          para: "Non-woven backing enhances sub-floor adhesion",
        },
      ],
      suitable: [
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
        {
          name: "Transport",
          image: "/images/icons/truck.png",
          link: "/vinyl-flooring/transport",
        },
      ],

      applications: [
        {
          image: "/images/categories/suprema/1.jpg",
          name: "Pink Embrace RU2625",
        },
        {
          image: "/images/categories/suprema/2.jpg",
          name: "Ice Grey RU2627",
        },
        {
          image: "/images/categories/suprema/3.jpg",
          name: "Grazing Land RU2629",
        },
        {
          image: "/images/categories/suprema/4.jpg",
          name: "Splash RU2630",
        },
        {
          image: "/images/categories/suprema/5.jpg",
          name: "Weathered White RU2623",
        },
        {
          image: "/images/categories/suprema/6.jpg",
          name: "Silk Route RU2622",
        },
        {
          image: "/images/categories/suprema/7.jpg",
          name: "Roman Clay RU2628",
        },
        {
          image: "/images/categories/suprema/8.jpg",
          name: "Crimson Depth RU2150",
        },
        {
          image: "/images/categories/suprema/9.jpg",
          name: "Indian Earth RD2606",
        },
        {
          image: "/images/categories/suprema/10.jpg",
          name: "Beige RD2601",
        },
        {
          image: "/images/categories/suprema/11.jpg",
          name: "Peach Sky RD2605",
        },
        {
          image: "/images/categories/suprema/12.jpg",
          name: "Terracotta RD2612",
        },
        {
          image: "/images/categories/suprema/13.jpg",
          name: "Maroon RD2608",
        },
        {
          image: "/images/categories/suprema/14.jpg",
          name: "Ocean Breeze RD2611",
        },
        {
          image: "/images/categories/suprema/15.jpg",
          name: "Rainforest RD2610",
        },
        {
          image: "/images/categories/suprema/16.jpg",
          name: "Winter Sea RD2602",
        },
        {
          image: "/images/categories/suprema/17.jpg",
          name: "Winter Moon RD2609",
        },
        {
          image: "/images/categories/suprema/18.jpg",
          name: "Silver Sand RD2604",
        },
        {
          image: "/images/categories/suprema/19.jpg",
          name: "Lighting Sky RD2603",
        },
      ],
    },
    {
      type: "Standard-RS",
      title: "Standard",
      spanTitle: "RS",
      name: "Standard RS",
      bannerImg: "/images/categories/Standard RS-Banner.png",
      content: [
        {
          para: "1 mm homogenous wear layer provides long-life slip resistance with a deep inlay of silicon carbide granules",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },
        {
          para: "Glass fibre scrim for dimensional stability",
        },
        {
          para: "Non-woven backing enhances sub-floor adhesion (optional)",
        },
      ],
      suitable: [
        {
          name: "Education",
          image: "/images/icons/image 59.png",
          link: "/vinyl-flooring/education",
        },
        {
          name: "Healthcare",
          image: "/images/icons/image 62.png",
          link: "/vinyl-flooring/healthcare",
        },
        {
          name: "Residential",
          image: "/images/icons/residential.png",
          link: "/vinyl-flooring/residential",
        },
        {
          name: "Offices/Retail",
          image: "/images/icons/workspace.png",
          link: "/vinyl-flooring/offices-retail",
        },
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
      ],

      applications: [
        {
          image: "/images/categories/standard/1.jpg",
          name: "Beige RD2601",
        },
        {
          image: "/images/categories/standard/2.jpg",
          name: "Peach Sky RD2605",
        },
        {
          image: "/images/categories/standard/3.jpg",
          name: "Terracotta RD2612",
        },
        {
          image: "/images/categories/standard/4.jpg",
          name: "Maroon RD2608",
        },
        {
          image: "/images/categories/standard/5.jpg",
          name: "Ocean Breeze RD2611",
        },
        {
          image: "/images/categories/standard/6.jpg",
          name: "Rainforest RD2610",
        },
        {
          image: "/images/categories/standard/7.jpg",
          name: "Winter Sea RD2602",
        },
        {
          image: "/images/categories/standard/8.jpg",
          name: "Winter Moon RD2609",
        },
        {
          image: "/images/categories/standard/9.jpg",
          name: "Silver Sand RD2604",
        },
        {
          image: "/images/categories/standard/10.jpg",
          name: "Lighting Sky RD2603",
        },
        {
          image: "/images/categories/standard/11.jpg",
          name: "Indian Earth RD2606",
        },
      ],
    },
    {
      type: "Sonata",
      title: "Sonata",
      name: "Sonata",
      bannerImg: "/images/categories/Sonata-Banner.png",
      content: [
        {
          para: "Sonata is the perfect solution for the discerning bus and coach builders and fleet owners who want flooring to be utmost safe yet aesthetically pleasing",
        },
        {
          para: "1 mm homogenous wear layer provides long-life slip resistance with a deep inlay of silicon carbide granules and color chips",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },
        {
          para: "Glass fibre scrim for dimensional stability",
        },
        {
          para: "Non-woven backing enhances sub-floor adhesion",
        },
      ],
      suitable: [
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
        {
          name: "Transport",
          image: "/images/icons/truck.png",
          link: "/vinyl-flooring/transport",
        },
      ],

      applications: [
        {
          image: "/images/categories/sonata/1.jpg",
          name: "Navy Blue ST2032",
        },
        {
          image: "/images/categories/sonata/2.jpg",
          name: "Light Blue ST2152",
        },
        {
          image: "/images/categories/sonata/3.jpg",
          name: "Alert Yellow ST2011",
        },
        {
          image: "/images/categories/sonata/4.jpg",
          name: "Earthen Brown ST2151",
        },
        {
          image: "/images/categories/sonata/5.jpg",
          name: "Korunde Grey ST2201",
        },
        {
          image: "/images/categories/sonata/6.jpg",
          name: "Grey ST2002",
        },
        {
          image: "/images/categories/sonata/7.jpg",
          name: "Dark Grey ST2147",
        },
        {
          image: "/images/categories/sonata/8.jpg",
          name: "Green ST2041",
        },
        {
          image: "/images/categories/sonata/9.jpg",
          name: "Beige ST2047",
        },
        {
          image: "/images/categories/sonata/10.jpg",
          name: "Rustic Brown ST3000",
        },
        {
          image: "/images/categories/sonata/11.jpg",
          name: "Craft Brown ST2073",
        },
        {
          image: "/images/categories/sonata/12.jpg",
          name: "Terracotta ST2957",
        },
        {
          image: "/images/categories/sonata/13.jpg",
          name: "Electricity RU2621",
        },
        {
          image: "/images/categories/sonata/14.jpg",
          name: "Blue Pottery RU2620",
        },
        {
          image: "/images/categories/sonata/15.jpg",
          name: "Tidal Wave RU2626",
        },
        {
          image: "/images/categories/sonata/16.jpg",
          name: "Mystic Green RU2624",
        },
      ],
    },
    {
      type: "Eco-Plus-V",
      title: "Eco",
      spanTitle: "Plus V",
      name: "Eco Plus V",
      bannerImg: "/images/categories/Ecoplus-V-Banner.png",
      content: [
        {
          para: "Ecoplus V is a Value for money transport flooring option with 500 microns wear layer with silicon carbide granules for slip resistance and colourful chips for better aesthetics",
        },
        {
          para: "Excellent resistance to scratches, abrasion, soiling and staining",
        },

        {
          para: "Non-woven backing enhances sub-floor adhesion",
        },
      ],
      suitable: [
        {
          name: "Hospitality",
          image: "/images/icons/hospital.png",
          link: "/vinyl-flooring/hospitality",
        },
        {
          name: "Transport",
          image: "/images/icons/truck.png",
          link: "/vinyl-flooring/transport",
        },
      ],

      applications: [
        {
          image: "/images/categories/eco/1.jpg",
          name: "Beige EV2047",
        },
        {
          image: "/images/categories/eco/2.jpg",
          name: "Craft Brown EV2073",
        },
        {
          image: "/images/categories/eco/3.jpg",
          name: "Earthen Brown EV2151",
        },
        {
          image: "/images/categories/eco/4.jpg",
          name: "Korunde Rustic Brown EV2703",
        },
        {
          image: "/images/categories/eco/5.jpg",
          name: "Korude Green EV2707",
        },
        {
          image: "/images/categories/eco/6.jpg",
          name: "Green EV2041",
        },
        {
          image: "/images/categories/eco/7.jpg",
          name: "Emerald Green EV2705",
        },
        {
          image: "/images/categories/eco/8.jpg",
          name: "Rustic Brown EV3000",
        },
        {
          image: "/images/categories/eco/9.jpg",
          name: "Horizon Grey EV2407",
        },
        {
          image: "/images/categories/eco/10.jpg",
          name: "Rain Cloud EV2701",
        },
        {
          image: "/images/categories/eco/11.jpg",
          name: "Korunde Grey EV2201",
        },
        {
          image: "/images/categories/eco/12.jpg",
          name: "Korunde Blue EV2703",
        },
        {
          image: "/images/categories/eco/13.jpg",
          name: "Scuba Blue EV2702",
        },
        {
          image: "/images/categories/eco/14.jpg",
          name: "Navy Blue EV2032",
        },
      ],
    },
    {
      type: "Gripper",
      title: "Gripper",
      name: "Gripper",
      bannerImg: "/images/categories/Gripper-Banner.png",
      content: [
        {
          para: "Anti-skid Vinyl Flooring option suitable for bus application, Airports, Floor mats for automobiles etc.",
        },
        {
          para: "Various emboss options such as Stud, Chequered, Ultra, Diamond and Football",
        },
        {
          para: "Available in various color options to match the various interiors",
        },
        {
          para: "Non woven polyester (Optional) backing qualities also available",
        },
      ],
      suitable: [
        {
          name: "Transport",
          image: "/images/icons/truck.png",
          link: "/vinyl-flooring/transport",
        },
      ],

      applications: [
        {
          image: "/images/categories/gripper/1.jpg",
          name: "Stud Green KD2041",
        },
        {
          image: "/images/categories/gripper/2.jpg",
          name: "Brick Gold KD2099",
        },
        {
          image: "/images/categories/gripper/3.jpg",
          name: "Stud Blue KD2010",
        },
        {
          image: "/images/categories/gripper/4.jpg",
          name: "Stud Black KD2051",
        },
        {
          image: "/images/categories/gripper/5.jpg",
          name: "Stud Yellow KD2011",
        },
        {
          image: "/images/categories/gripper/6.jpg",
          name: "Stud Dark Grey KD2147",
        },
        {
          image: "/images/categories/gripper/7.jpg",
          name: "Light Grey KD2038",
        },
        {
          image: "/images/categories/gripper/8.jpg",
          name: "Stud White KD2001",
        },
        {
          image: "/images/categories/gripper/9.jpg",
          name: "Stud Ocean Blue KD2029",
        },
        {
          image: "/images/categories/gripper/10.jpg",
          name: "Diamond Black DA2051",
        },
        {
          image: "/images/categories/gripper/11.jpg",
          name: "Diamond Dark Grey DA2147",
        },
        {
          image: "/images/categories/gripper/12.jpg",
          name: "Football Black KF2051",
        },
        {
          image: "/images/categories/gripper/13.jpg",
          name: "Football Craft Brown KF2073",
        },
        {
          image: "/images/categories/gripper/14.jpg",
          name: "Football Dark Grey KF2147",
        },
        {
          image: "/images/categories/gripper/15.jpg",
          name: "Ultra Rustic Brown GU3000",
        },
        {
          image: "/images/categories/gripper/16.jpg",
          name: "Ultra Grey GU2204",
        },
        {
          image: "/images/categories/gripper/17.jpg",
          name: "Ultra Terracotta GU2957V",
        },
        {
          image: "/images/categories/gripper/18.jpg",
          name: "Ultra Navy Blue GU2032",
        },
        {
          image: "/images/categories/gripper/19.jpg",
          name: "Chequered Ocean Blue KC2029",
        },
        {
          image: "/images/categories/gripper/20.jpg",
          name: "Chequered Brick Gold KC2099",
        },
        {
          image: "/images/categories/gripper/21.jpg",
          name: "Chequered Steel Grey KC2078",
        },
        {
          image: "/images/categories/gripper/22.jpg",
          name: "Chequered Pearl White KC2143",
        },
        {
          image: "/images/categories/gripper/23.jpg",
          name: "Chequered Black KC2051",
        },
        {
          image: "/images/categories/gripper/24.jpg",
          name: "Stud Black GD2051",
        },
        {
          image: "/images/categories/gripper/25.jpg",
          name: "Ultra Black GU2051",
        },
        {
          image: "/images/categories/gripper/26.jpg",
          name: "Stud Korunde Grey GD2201",
        },
        {
          image: "/images/categories/gripper/27.jpg",
          name: "Stud Terracotta GD2957",
        },
        {
          image: "/images/categories/gripper/28.jpg",
          name: "Stud Korunde Black GD2202",
        },
        {
          image: "/images/categories/gripper/29.jpg",
          name: "Stud Korunde Blue GD2203",
        },
        {
          image: "/images/categories/gripper/30.jpg",
          name: "Stud Grey GD2204",
        },
        {
          image: "/images/categories/gripper/31.jpg",
          name: "Stud Ocean Blue GD2029",
        },
        {
          image: "/images/categories/gripper/32.jpg",
          name: "Stud Navy Blue GD2032",
        },
      ],
    },
  ];

  const applicationTabsData = [
    {
      category: "Education",
      url: "/vinyl-flooring/education",
      items: [
        // { name: "Moonwalk", url: "/moonwalk" },
        // { name: "Accord", url: "/accord" },
        // { name: "Mirakle", url: "/mirakle" },
        // { name: "Symphony", url: "/symphony" },
        // { name: "Startrek", url: "/startrek" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tiger", url: "/tiger" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "Majesty", url: "/majesty" },
        { name: "Tuff", url: "/tuff" },
        // { name: "Elegant", url: "/elegant" },
        // { name: "Dazzle", url: "/dazzle" },

        // { name: "Avengers", url: "/avengers" },
      ],
    },
    {
      category: "Health Care",
      url: "/vinyl-flooring/healthcare",
      items: [
        { name: "Orbit", url: "/orbit" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tuff", url: "/tuff" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    // {
    //   category: "Wet Areas",
    //   url: "/vinyl-flooring/wet-areas",
    //   items: [{ name: "Aqua RS", url: "/aqua-rs" }],
    // },
    {
      category: "Residential",
      url: "/vinyl-flooring/residential",
      items: [
        { name: "Majesty Pro", url: "/majesty-pro" },
        { name: "Opera", url: "/opera" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Majesty", url: "/majesty" },
        { name: "Printed Flooring", url: "/printed-flooring" },
      ],
    },
    {
      category: "Offices/Retail",
      url: "/vinyl-flooring/offices-retail",
      items: [
        { name: "Orbit", url: "/orbit" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Majesty Pro", url: "/majesty-pro" },
        { name: "Majesty", url: "/majesty" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    {
      category: "Hospitality",
      url: "/vinyl-flooring/hospitality",
      items: [
        { name: "Tuff", url: "/tuff" },
        { name: "Sonata", url: "/sonata" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "Eco Plus V", url: "/eco-plus-v" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    {
      category: "Transport",
      url: "/vinyl-flooring/transport",
      items: [
        { name: "Sonata", url: "/sonata" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "Eco Plus V", url: "/eco-plus-v" },
        { name: "Gripper", url: "/gripper" },
      ],
    },
    // {
    //   category: "Sports",
    //   url: "/vinyl-flooring/sports",
    //   items: [{ name: "Avengers", url: "/avengers" }],
    // },
  ];

  const selectedCategory = applicationData.find(
    (data) => data.type.toLowerCase() === innercategory.toLowerCase()
  );

  if (!selectedCategory) {
    return <Navigate to="/" replace />;
  }

  const bannerData = {
    bannerImg: selectedCategory.bannerImg,
    title: selectedCategory?.name || "Default Title", // Ensure it doesn't break if selectedCategory is undefined
    breadcrumbs: [
      { label: "Home", path: "/", active: false },
      { label: "Vinyl Flooring", path: "/vinyl-flooring", active: false },
      { label: selectedCategory?.name, path: null, active: true },
    ],
  };

  const openModal = (type) => {
    if (type === "technical") {
      setTechnicalModal(true);
    } else if (type === "install") {
      setInstallModal(true);
    }
  };

  const closeModal = () => {
    setTechnicalModal(false);
    setInstallModal(true);
  };

  return (
    <>
      <Layout>
        <Banner
          bannerImg={bannerData.bannerImg}
          title={bannerData.title}
          breadcrumbs={bannerData.breadcrumbs}
        />

        <section className="applications-section vinyl-applications-section">
          <div className="container">
            <div className="row">
              <ul className="application-tabs d-lg-flex align-items-center justify-content-center d-none">
                {applicationTabsData.map((tab, index) => (
                  <li key={index} className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href={tab.url}
                      role="button"
                    >
                      {tab.category}
                    </a>
                    <ul className="dropdown-menu">
                      {tab.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <a className="dropdown-item" href={item.url}>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="vinyl-applications-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h2 className="title new-title text-start pt-0">
                  {" "}
                  {selectedCategory.title} {""}
                  <span className="yellow-title">
                    {selectedCategory.spanTitle}
                  </span>
                  {""}
                </h2>
              </div>
              <div className="col-lg-8">
                <ul className="d-flex flex-column justify-content-center align-items-start">
                  {" "}
                  {selectedCategory?.content?.map((content, index) => (
                    <li className="paragraph gray-para" key={index}>
                      {content.para}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="application-types-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="row">
                      {selectedCategory.applications.map(
                        (application, index) => (
                          <div
                            className="col-lg-3 col-md-6 col-12 mt-4"
                            key={index}
                          >
                            <div className="single-application-div">
                              <div className="single-application-img">
                                <img
                                  src={application.image}
                                  alt={application.name}
                                />
                              </div>

                              <h4>{application.name}</h4>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="col-lg-3 offset-lg-1 mt-lg-0 mt-5">
                    <h3 className="suitable-for-title">Suitable For</h3>
                    <div className="row ">
                      {selectedCategory?.suitable?.map((suitable, index) => (
                        <div
                          className="col-lg-7 col-md-6 col-sm-6 col-xs-12 mt-4"
                          key={index}
                        >
                          <NavLink to={suitable.link}>
                            <div className="suitable-div">
                              <div className="suitable-img-div">
                                <img src={suitable.image} alt={suitable.name} />
                              </div>
                              <h6>{suitable.name}</h6>
                            </div>
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 ">
              <div className="col-lg-12">
                <div className="row d-flex align-item-center justify-content-start application-tags-row">
                  {/* <NavLink
                  to="/docs/Product Range Catlog_2014_10 Low.pdf"
                  target="_blank"
                >
                  <div className="tags-div ">
                    <div className="single-tag application-tag">
                      <h6 className="tag">Open e-brochure</h6>
                    </div>
                  </div>
                </NavLink> */}

                  <div className="d-flex my-4 w-auto">
                    <button
                      className="custom-button vinyl-button"
                      onClick={() => openModal("technical")}
                    >
                      Technical Specification
                    </button>
                  </div>

                  <div className="d-flex my-4 w-auto">
                    <button
                      className="custom-button vinyl-button"
                      onClick={() => openModal("install")}
                    >
                      Installation & Maintenance
                    </button>
                  </div>

                  <div className="d-flex my-4 w-auto">
                    <NavLink
                      to="/docs/Product Range Catlog_2014_10 Low.pdf"
                      target="_blank"
                      className="custom-button vinyl-button"
                    >
                      Open e-brochure
                    </NavLink>
                  </div>

                  <div className="d-flex my-4 w-auto">
                    <NavLink
                      to="/contact-us#inquire"
                      className="custom-button vinyl-button"
                    >
                      Enquiry Now
                    </NavLink>
                  </div>

                  {/* <NavLink to="/contact-us#inquire">
                  <div className="tags-div">
                    <div className="single-tag application-tag">
                      <h6 className="tag">Enquiry Now</h6>
                    </div>
                  </div>
                </NavLink> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="suitable-for-section">
          <div className="container"></div>
        </section>

        <ApplicationsModal />
      </Layout>

      {technicalModal ? (
        <Modal
          centered
          show={technicalModal}
          onHide={() => setTechnicalModal(false)}
        >
          {applicationData.map((tab, index) => (
            <img src={tab.technicalImg} alt={tab.index} />
          ))}
        </Modal>
      ) : null}

      {installModal ? (
        <Modal
          centered
          show={installModal}
          size="lg"
          onHide={() => setInstallModal(false)}
        >
          <Modal.Body>
            <div className="install-modal">
              <h3 className="mt-4">The Sub Floor</h3>
              <p className="thankyou-msg">
                Sub floor plays important role for any type of installation job,
                hence it is important to ensure that sub floor is evenly
                levelled, dry, tuff and ready for PVC flooring installation
              </p>

              <h3 className="mt-4">General guidelines for making sub floor.</h3>
              <p className="thankyou-msg">
                Base floor should have following properties:
              </p>

              <ul>
                <li>
                  Absolutely hard, level, dry, smooth and ready for
                  installation.
                </li>
                <li>
                  Free from cracks, irregularities , If any should be corrected
                  with appropriate material.
                </li>
                <li>
                  No contamination with oil, grease, paint or any other
                  substance which affects the adhesion.
                </li>
                <li>
                  Use cement based products for sub floor preparation and should
                  be evenly spread
                </li>
                <li>
                  Flat surface with maximum deflexion for 2m spirit level : for
                  0.20m spirit level : 2mm
                </li>
                <li>
                  Moisture content should not be more than 75% R.H. Drying time
                  is required of approximately 1 day per to be measured.
                </li>
                <li>Smoothing compound to use for perfectly smooth floor.</li>
                <li>
                  Floor covering should be laid up to the joints and joints to
                  be covered with an plastic or metal joint cover
                </li>
                <li>
                  Damp proof membrane to laid before installation in case of sub
                  floor direct to ground. This membrane act as a water proof
                  layer.
                </li>
                <li>
                  If there is old carpet, old vinyl, linoleum or rubber flooring
                  already laying remove, clean and apply smoothing compound
                </li>
              </ul>

              <h3 className="mt-4">Sheet laying method:</h3>

              <ul>
                <li>The unrolled sheet must left in the room to be covered</li>
                <li>
                  Vinyl sheet to be laid length wise in the same direction.
                </li>
                <li>Fold back sheet half way.</li>
                <li>Apply Rubber based / Acrylic emulsion adhesive</li>
                <li>
                  Long open time of adhesive will lead to poor transfer of
                  Adhesive. Less open time of adhesive will lead to bubble
                  formation. Refer Adhesive manufacturer’s instruction manual
                </li>
                <li>
                  Smooth down manually and then roll with a 65 kg flooring
                  roller
                </li>
                <li>Grooving and Hot welding to be done after 24 hours</li>
                <li>
                  Do not traffic the floor coverings for 48 hours after
                  installation
                </li>
              </ul>

              <h3 className="mt-4">Maintenance</h3>

              <ul>
                <li>
                  Vinyl Flooring can be cleaned daily with a damp mop and weekly
                  or fortnightly with a mild soap solution.
                </li>
                <li>
                  Severely soiled or floors with stubborn stains can be cleaned
                  with the use of a coir brush or fine steel wool no. 000 soaked
                  in warm soap solution to clean the affected area.
                </li>
                <li>
                  Clear water mopping is necessary to remove chemical spillage
                  on the flooring and after scrubbing operation to remove
                  residue.
                </li>
                <li>
                  Do not throw lit cigarette butts or match sticks on the floor.
                </li>
                <li>
                  Avoid dragging heavy furniture / objects to prevent scratches.
                </li>
                <li>
                  Application of wax polish or floor finish should never be used
                  as it will build up an insulating film on the surface
                </li>
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
};

export default VinylnnerApplication;

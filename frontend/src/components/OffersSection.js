import React from "react";
import OfferSlider from "./OfferSlider";
import { NavLink } from "react-router-dom";
 const OfferingsPrevArrow = (props) => {
   const { onClick } = props;
   return (
     <button className="slick-prev custom-arrow" onClick={onClick}>
       <img src="/images/icons/Group 905.png" alt="left-arrow" />
     </button>
   );
 };
 const OfferingsNextArrow = (props) => {
   const { onClick } = props;
   return (
     <button className="slick-next custom-arrow" onClick={onClick}>
       <img src="/images/icons/Group 906.png" alt="right-arrow" />
     </button>
   );
};
const OffersSection = () => {

  const luxeraData = [
    {
      // image: "/images/planks/lux/Basswood 200 004.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279926/Basswood_200_004_oaahob.jpg",
      name: "Basswood",
      // qr: "/images/planks/lux/Basswood 200 004.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279926/Basswood_200_004_jwvpeh.png",
      type: "200 004",
    },
    {
      // image: "/images/planks/lux/Beech 200 005.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279928/Beech_200_005_tfy50z.jpg",
      name: "Beech",
      // qr: "/images/planks/lux/Beech 200 005.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279927/Beech_200_005_bxea6w.png",
      type: "200 005",
    },
    {
      // image: "/images/planks/lux/Carrara 200 011.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279928/Carrara_200_011_qa5iza.jpg",
      name: "Carrara",
      // qr: "/images/planks/lux/Carrara 200 011.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279928/Carrara_200_011_wdwk57.png",
      type: "200 011",
    },
    {
      // image: "/images/planks/lux/Fir 200 002.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279929/Fir_200_002_h8euqu.jpg",
      name: "Fir",
      // qr: "/images/planks/lux/Fir 200 002.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279929/Fir_200_002_jdmq6y.png",
      type: "200 002",
    },
    {
      // image: "/images/planks/lux/Hemlock 200 006.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279930/Hemlock_200_006_k1n9ap.jpg",
      name: "Hemlock",
      // qr: "/images/planks/lux/Hemlock 200 006.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279930/Hemlock_200_006_ouyaq5.png",
      type: "200 006",
    },
    {
      // image: "/images/planks/lux/Jasper 200 014.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279931/Jasper_200_014_ixmvke.jpg",
      name: "Jasper",
      // qr: "/images/planks/lux/Jasper 200 014.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279931/Jasper_200_014_v3uhcx.png",
      type: "200 014",
    },
    {
      // image: "/images/planks/lux/Larch 200 003.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279931/Larch_200_003_qgjze2.jpg",
      name: "Larch",
      // qr: "/images/planks/lux/Larch 200 003.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279932/Larch_200_003_yqa3lk.png",
      type: "200 003",
    },
    {
      // image: "/images/planks/lux/Mahogany 200 009.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279932/Mahogany_200_009_qvkt5i.jpg",
      name: "Mahogany",
      // qr: "/images/planks/lux/Mahogany 200 009.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279932/Mahogany_200_009_pitb8h.png",
      type: "200 009",
    },
    {
      // image: "/images/planks/lux/Onyx 200 013.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279933/Onyx_200_013_gnnclk.jpg",
      name: "Onyx",
      // qr: "/images/planks/lux/Onyx 200 013.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279933/Onyx_200_013_wsi97x.png",
      type: "200 013",
    },
    {
      // image: "/images/planks/lux/Sandalwood 200 008.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279937/Sandalwood_200_008_dlkq3q.jpg",
      name: "Sandalwood",
      // qr: "/images/planks/lux/Sandalwood 200 008.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279937/Sandalwood_200_008_z3e2gn.png",
      type: "200 008",
    },
    {
      // image: "/images/planks/lux/Shale 200 012.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279938/Shale_200_012_xiexea.jpg",
      name: "Shale",
      // qr: "/images/planks/lux/Shale 200 012.png"
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279938/Shale_200_012_pcjj2e.png",
      type: "200 012",
    },
    {
      // image: "/images/planks/lux/Verawood 200 007.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279938/Verawood_200_007_sojqzp.jpg",
      name: "Verawood",
      // qr: "/images/planks/lux/Verawood 200 007.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279939/Verawood_200_007_k4c9o3.png",
      type: "200 007",
    },
    {
      // image: "/images/planks/lux/Walnut 200 010.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279941/Walnut_200_010_ymlisw.jpg",
      name: "Walnut",
      // qr: "/images/planks/lux/Walnut 200 010.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279941/Walnut_200_010_zeeeio.png",
      type: "200 010",
    },
    {
      // image: "/images/planks/lux/White Oak 200 001.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279942/White_Oak_200_001_fih6x1.jpg",
      name: "White Oak",
      // qr: "/images/planks/lux/White Oak 200 001.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279942/White_Oak_200_001_en9i2d.png",
      type: "200 001",
    },
  ];

  const sortedLuxeraSlides = luxeraData.sort((a, b) => {
    const [prefixA, suffixA] = a.type.split(" ").map(Number);
    const [prefixB, suffixB] = b.type.split(" ").map(Number);

    if (prefixA !== prefixB) {
      return prefixA - prefixB; // Sort by the first part
    }
    return suffixA - suffixB; // Sort by the second part
  });

  const radiantData = [
    {
      // image: "/images/planks/rad/Acacia 150 014.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279943/Acacia_150_014_c4daoq.jpg",
      name: "Acacia",
      // qr: "/images/planks/rad/Acacia 150 014.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279965/Acacia_150_014_xabosn.png",
      type: "150 014",
    },
    {
      // image: "/images/planks/rad/Birch 150 005.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279965/Birch_150_005_unscbw.jpg",
      name: "Birch",
      // qr: "/images/planks/rad/Birch 150 005.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279965/Birch_150_005_aaodez.png",
      type: "150 005",
    },
    {
      // image: "/images/planks/rad/Casuarina 150 010.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279966/Casuarina_150_010_qfywal.jpg",
      name: "Casuarina",
      // qr: "/images/planks/rad/_Casuarina 150 010.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279988/_Casuarina_150_010_cvo2zh.png",
      type: "150 010",
    },
    {
      // image: "/images/planks/rad/Deodar 150 012.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279967/Deodar_150_012_uas3gp.jpg",
      name: "Deodar",
      // qr: "/images/planks/rad/Deodar 150 012.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279967/Deodar_150_012_a2gmqx.png",
      type: "150 012",
    },
    {
      // image: "/images/planks/rad/Grey Elm 150 002.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279968/Grey_Elm_150_002_m1npxs.jpg",
      name: "Grey Elm",
      // qr: "/images/planks/rad/Grey Elm 150 002.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279968/Grey_Elm_150_002_gs4lep.png",
      type: "150 002",
    },
    {
      // image: "/images/planks/rad/Hickory 150 004.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279969/Hickory_150_004_nrgy8v.jpg",
      name: "Hickory",
      // qr: "/images/planks/rad/Hickory 150 004.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279969/Hickory_150_004_z7hvce.png",
      type: "150 004",
    },
    {
      // image: "/images/planks/rad/Hopea 150 013.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279970/Hopea_150_013_mqut0n.jpg",
      name: "Hopea",
      // qr: "/images/planks/rad/Hopea 150 013.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279970/Hopea_150_013_o3693p.png",
      type: "150 013",
    },
    {
      // image: "/images/planks/rad/Mulberry 150 008.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279971/Mulberry_150_008_m7r6fc.jpg",
      name: "Mulberry",
      // qr: "/images/planks/rad/Mulberry 150 008.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279971/Mulberry_150_008_hg3ty1.png",
      type: "150 008",
    },
    {
      // image: "/images/planks/rad/Pine 150 007.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279972/Pine_150_007_zfvnb4.jpg",
      name: "Pine",
      // qr: "/images/planks/rad/Pine 150 007.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279973/Pine_150_007_ymoklr.png",
      type: "150 007",
    },
    {
      // image: "/images/planks/rad/Poplar 150 011.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279974/Poplar_150_011_susp1e.jpg",
      name: "Poplar",
      // qr: "/images/planks/rad/_Poplar 150 011.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279988/_Poplar_150_011_efgc5o.png",
      type: "150 011",
    },
    {
      // image: "/images/planks/rad/Sapwood 150 001.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279974/Sapwood_150_001_dhetiu.jpg",
      name: "Sapwood",
      // qr: "/images/planks/rad/Sapwood 150 001.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279978/Sapwood_150_001_ykaelz.png",
      type: "150 001",
    },
    {
      // image: "/images/planks/rad/Siris 150 009.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279979/Siris_150_009_sjaq7r.jpg",
      name: "Siris",
      // qr: "/images/planks/rad/Siris 150 009.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279983/Siris_150_009_o62mnz.png",
      type: "150 009",
    },
    {
      // image: "/images/planks/rad/Spruce 150 006.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279983/Spruce_150_006_euom7o.jpg",
      name: "Spruce",
      // qr: "/images/planks/rad/Spruce 150 006.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279984/Spruce_150_006_dyarxz.png",
      type: "150 006",
    },
    {
      // image: "/images/planks/rad/Tallowwood 150 003.JPG",
      image: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279985/Tallowwood_150_003_utvjd4.jpg",
      name: "Tallowwood",
      // qr: "/images/planks/rad/Tallowwood 150 003.png",
      qr: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279986/Tallowwood_150_003_aezvt2.png",
      type: "150 003",
    },
  ];

  const sortedRadiantSlides = radiantData.sort((a, b) => {
    const [prefixA, suffixA] = a.type.split(" ").map(Number);
    const [prefixB, suffixB] = b.type.split(" ").map(Number);

    if (prefixA !== prefixB) {
      return prefixA - prefixB; // Sort by the first part
    }
    return suffixA - suffixB; // Sort by the second part
  });

  const offersSettings = {
    dots: false,
    nextArrow: <OfferingsNextArrow />,
    prevArrow: <OfferingsPrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="what-we-offer-section">
      <div className="container">
        <div className="col-lg-8">
          <h6 className="subtitle gray-subtitle">
            What We Offer <span></span>
          </h6>
          <h2 className="title new-title">
            <span className="yellow-title">Innovative</span> Luxury Vinyl Plank
            & Tile Solutions for Modern Spaces
          </h2>
        </div>

        <div className="row radiant-row ">
          <div className="col-lg-6">
            <h2 className="title new-title">
              <span className="yellow-title">Radiant</span> - 1.5mm
            </h2>
          </div>
          <OfferSlider settings={offersSettings} slides={sortedRadiantSlides} />
        </div>

        <div className="row mt-5 luxera-row">
          <div className="col-lg-6">
            <h2 className="title new-title">
              {" "}
              <span className="yellow-title">Luxura</span>
              {""} - 2mm
            </h2>
          </div>
          <OfferSlider settings={offersSettings} slides={sortedLuxeraSlides} />
        </div>
        <div className="d-flex my-5 justify-content-center">
          <NavLink
            to="/docs/LVT-Brochure.pdf"
            target="_blank"
            className="custom-button"
          >
            Download Brochure
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;

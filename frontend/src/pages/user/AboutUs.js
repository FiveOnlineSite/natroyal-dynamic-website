import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import Clients from "../../components/Clients";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import MetaDataComponent from "../../components/MetaDataComponent";

const AboutUs = () => {

  const [about, setAbout] = useState([])

  const location = useLocation();
    const currentPath = location.pathname;

   useEffect(() => {
    const fetchAbout = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/about`);
        const aboutData = response.data.about;

        setAbout(aboutData);
      } catch (error) {
        console.error("Error fetching about:", error);
      } 
    };

    fetchAbout();
  }, []);

  return (
    <Layout>
        <MetaDataComponent />
      <Banner page={currentPath} />

      <section className="about-section">
        <div className="container">
     
          <div className="row align-items-center">
           {about && about.map((about) => (
            <>
           
            <div className="col-lg-5">
              <div className="about-content">
                {/* <div>
                  <p className="paragraph">
                    Since 1954, Natroyal Group has been a pioneering force in
                    India’s manufacturing sector. With decades of expertise and
                    a legacy of innovation, we specialize in the manufacturing
                    and export of:
                  </p>{" "}
                  <div className="company-points mb-4">
                    <div className="company-point about-point">
                      <i className="lni lni-arrow-right"></i>
                      <p>Luxury Vinyl Planks & Tiles (LVT)</p>
                    </div>
                    <div className="company-point about-point">
                      <i className="lni lni-arrow-right"></i>
                      <p>PVC Vinyl Flooring</p>
                    </div>
                    <div className="company-point about-point">
                      <i className="lni lni-arrow-right"></i>
                      <p>Coated Fabrics</p>
                    </div>
                    <div className="company-point about-point">
                      <i className="lni lni-arrow-right"></i>
                      <p>Knit Fabrics</p>
                    </div>
                    <div className="company-point about-point">
                      <i className="lni lni-arrow-right"></i>
                      <p>Seating Components</p>
                    </div>
                  </div>
                </div>
                <p className="paragraph">
                  Driven by quality, reliability, and customer-centricity,
                  Natroyal Group has established itself as a leading brand with
                  a diverse portfolio serving multiple industries and
                  applications.
                </p>

                <p className="paragraph">
                  Our state-of-the-art manufacturing facilities are located near
                  Vadodara (Baroda), Gujarat, while our corporate headquarters
                  are based in Mumbai, India.
                </p>
                <p className="paragraph">
                  Through a strong network of distributors and retailers, our
                  products are widely available across India. Internationally,
                  we proudly export to and are well-recognized in Europe, the
                  USA, South America, the Middle East, Africa, and Southeast
                  Asia.
                </p> */}
                <div
                  className="paragraph about-content"
                  dangerouslySetInnerHTML={{ __html: about.content }}
                ></div>
              </div>
            </div>
            <div className="col-lg-7 mt-lg-0 mt-5">
              <div className="about-content-img">
                {/* <img
                  src="/images/banners/interior-design-with-yoga-mat-floor.png"
                  alt="about-content"
                  className="w-100"
                />
                <div className="projects-div">
                  <div>
                    <img
                      src="/images/icons/buildings.png"
                      alt="building"
                      width="50px"
                      height="60px"
                    />
                  </div>

                  <h2>500+</h2>
                  <p>
                    Completed <br />
                    Projects
                  </p>
                </div>
                <div className="awards-div">
                  <div>
                    <img
                      src="/images/icons/trophy.png"
                      alt="building"
                      width="60px"
                      height="60px"
                    />
                  </div>

                  <h2>48+</h2>
                  <p>
                    Awards <br /> Winning
                  </p>
                </div> */}

                {/* <iframe
                  width="100%"
                  height="500px"
                  src="https://www.youtube.com/embed/ngbVMDCpe78?autoplay=1&mute=1&loop=1&playlist=ngbVMDCpe78&rel=0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe> */}

                <video
                  // src="/videos/India's Largest Manufacturer _ LVT, PVC Flooring, Leather, Fabrics & More! (1).mp4"
                  // src="https://res.cloudinary.com/dcmdihrzp/video/upload/v1751367562/India_s_Largest_Manufacturer___LVT_PVC_Flooring_Leather_Fabrics_More_wdurva.mp4"
                  src={about.video.filepath}
                  controls
                  muted
                  loop
                  autoPlay
                  className="w-100"
                  height="100%"
                  playsInline
                  preload="metadata"
                ></video>
              </div>
            </div>
            </>
            ))}
            
          </div>
           
        </div>
      </section>

      <section className="companies-section" id="company">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <h6 className="subtitle">
                Pioneers in Flooring & Textiles<span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title">Our</span> Companies
              </h2>
            </div>

            <div className="col-lg-6 offset-lg-2 offset-0">
              {/* <p className="paragraph">
                Natroyal Group has been a pioneer in India since 1962,
                specializing in the manufacturing and exporting of Luxury Vinyl
                Plank & Tile, PVC vinyl flooring, coated fabrics, and seating
                components. With state-of-the-art production facilities near
                Vadodara, Gujarat, and a corporate office in Mumbai, our
                products are distributed nationwide and exported to Europe, the
                USA, South America, the Middle East, Africa, and Southeast Asia.
              </p> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="companies-div">
            <NavLink to="/lvt-flooring" className="single-company">
              <div className="single-company-img">
                <img
                  src="/images/icons/Royal House.png"
                  height={"100%"}
                  width={"120px"}
                  alt="company"
                />
              </div>
              <div className="company-content">
                <div className="company-thumbnail">
                  <img
                    // src="/images/banners/63e3a12fc187c70f011a62d15d0de6fe 1.png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277213/63e3a12fc187c70f011a62d15d0de6fe_1_hiyjxv.png"
                    alt="company"
                    className="w-100"
                  />
                </div>
                <div className="company-text">
                  <h2>Luxury Vinyl Planks & Tiles (LVT)</h2>
                  {/* <p>
                    Natroyal Group is a pioneer in India, leading the way in
                    manufacturing and supplying Luxury Vinyl Plank & Tiles for a
                    wide range of industries, including education, healthcare,
                    residential, hospitality, office/retail, and transportation
                    sectors.
                  </p> */}

                  <div className="arrow-div">
                    <i className="lni lni-arrow-angular-top-right"></i>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink to="/vinyl-flooring" className="single-company">
              <div className="single-company-img">
                <img
                  src="/images/icons/Royal House.png"
                  height={"100%"}
                  width={"120px"}
                  alt="company"
                />
              </div>
              <div className="company-content">
                <div className="company-thumbnail">
                  <img
                    // src="/images/banners/living-room (2).png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277270/living-room_2_irwujg.png"
                    alt="company"
                    className="w-100"
                  />
                </div>
                <div className="company-text">
                  <h2>Vinyl Flooring</h2>
                  {/* <p>
                    Natroyal Group manufactures high-quality PVC vinyl flooring
                    ranging from 0.37mm to 3mm, designed for sectors such as
                    education, healthcare, residential, and transport. Under the
                    brand 'Nuplank,' we have introduced India's first Luxury
                    Vinyl Plank & Tile (LVT) in 1.5mm and 2mm thicknesses,
                    available in a 6-inch x 36-inch size.
                  </p> */}

                  <div className="arrow-div">
                    <i className="lni lni-arrow-angular-top-right"></i>
                  </div>
                </div>
              </div>
            </NavLink>

            <NavLink to="/coated-fabrics" className="single-company">
              <div className="single-company-img">
                <img
                  src="/images/icons/Royal Touch.png"
                  height={"100%"}
                  width={"100px"}
                  alt="company"
                />
              </div>
              <div className="company-content">
                <div className="company-thumbnail">
                  <img
                    src="/images/banners/elegant-yacht-interior-with-white-leather-seats-view-sea_28914-81310 1.png"
                    alt="company"
                    className="w-100"
                  />
                </div>
                <div className="company-text">
                  <h2>Coated Fabrics</h2>
                  {/* <p>
                    We manufacture coated fabrics (artificial leather, PVC/PU
                    vinyl) in thicknesses ranging from 0.7mm to 2mm, widely used
                    in home and office furnishings, automotive interiors,
                    fashion accessories, footwear, and medical applications.
                  </p> */}

                  <div className="arrow-div">
                    <i className="lni lni-arrow-angular-top-right"></i>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink to="/seating-components" className="single-company">
              <div className="single-company-img">
                <img
                  src="/images/icons/Vijayjyot.png"
                  height={"100%"}
                  width={"140px"}
                  alt="company"
                />
              </div>

              <div className="company-content">
                <div className="company-thumbnail">
                  <img
                    // src="/images/banners/pexels-emmanuel-codden-1502600-18362051.png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277297/pexels-emmanuel-codden-1502600-18362051_wanahq.png"
                    alt="company"
                    className="w-100"
                  />
                </div>
                <div className="company-text">
                  <h2>Seating Components</h2>
                  {/* <p>
                    The Seating Component Division produces frame fabrication,
                    trim covers, and polyurethane foam for various seating
                    needs, including automotive, cinema, auditorium, metro, bus,
                    truck, and railway seats, such as driver seats and chair car
                    seats.
                  </p> */}
                  <div className="arrow-div">
                    <i className="lni lni-arrow-angular-top-right"></i>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink to="/knit-fabrics" className="single-company">
              <div className="single-company-img">
                <img
                  src="/images/icons/Royal Knit.png"
                  height={"100%"}
                  width={"100px"}
                  alt="company"
                />
              </div>
              <div className="company-content">
                <div className="company-thumbnail">
                  <img
                    // src="/images/banners/Products For Coating 1.png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277323/Products_For_Coating_1_y97fzk.png"
                    alt="company"
                    className="w-100"
                  />
                </div>
                <div className="company-text">
                  <h2>Knit Fabrics</h2>
                  {/* <p>
                    We manufacture technical textile circular and warp-knit
                    fabrics, which are key ingredients in making leather
                    cloth/coated fabrics and backing fabrics for automotive
                    upholstery, utilizing foaming technology.
                  </p> */}
                  <div className="arrow-div">
                    <i className="lni lni-arrow-angular-top-right"></i>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="subdivision-div">
              <h6 className="subtitle text-center">
                Excellence & Sustainability <span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title">Our</span> Mission
              </h2>

              <p className="paragraph">
                To deliver high-quality, innovative solutions that meet our
                customers' evolving needs, drive sustainable growth, and foster
                long-term partnerships.
              </p>
            </div>

            <div className="row justify-content-center mt-5">
              <div className="col-lg-8">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="mission-div">
                      <div className="mission-no">01</div>
                      <div className="mission-img">
                        <img src="/images/icons/team.png" alt="team" />
                      </div>
                      <h4>Customer-Centric Excellence</h4>
                      <p className="paragraph">
                        Deliver high-quality, innovative solutions that meet our
                        customers' needs.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-lg-0 mt-5">
                    <div className="mission-div">
                      <div className="mission-no">02</div>
                      <div className="mission-img">
                        <img src="/images/icons/leaves.png" alt="team" />
                      </div>
                      <h4>Sustainable Innovation</h4>
                      <p className="paragraph">
                        Drive sustainable growth through eco-friendly practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="subdivision-div">
              <h6 className="subtitle text-center">
                Global Leadership <span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title">Our</span> Vision
              </h2>

              <p className="paragraph">
                To be a global leader in Luxury Vinyl Plank & Tile, PVC vinyl
                flooring, coated fabrics, knit fabrics and seating components,
                known for our innovation, sustainability, and commitment to
                customer satisfaction.
              </p>
            </div>

            <div className="row justify-content-center mt-5">
              <div className="col-lg-12">
                <div className="row justify-content-center">
                  <div className="col-lg-4">
                    <div className="vision-div">
                      <div className="vision-no">01</div>
                      <div className="vision-img">
                        <img src="/images/icons/team.png" alt="team" />
                      </div>
                      <div className="vision-content">
                        <h4>Leadership</h4>
                        <p className="paragraph text-center">
                          Leaders in Coated Fabrics, Flooring, Knit Fabrics, and
                          Seating components.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-lg-0 mt-5">
                    <div className="vision-div">
                      <div className="vision-no">02</div>
                      <div className="vision-img">
                        <img src="/images/icons/achievements.png" alt="team" />
                      </div>
                      <div className="vision-content">
                        <h4>Excellence</h4>
                        <p className="paragraph text-center">
                          To set new standards in innovation, quality, and
                          sustainability.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-lg-0 mt-5">
                    <div className="vision-div">
                      <div className="vision-no">03</div>
                      <div className="vision-img">
                        <img src="/images/icons/growth.png" alt="team" />
                      </div>
                      <div className="vision-content">
                        <h4>Growth</h4>
                        <p className="paragraph text-center">
                          To expand our reach and strengthen customer trust
                          worldwide.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Clients />
    </Layout>
  );
};

export default AboutUs;

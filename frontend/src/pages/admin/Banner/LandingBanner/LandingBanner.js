import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LandingBanner = () => {
  const [landingBanner, setLandingBanner] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandingBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "landing-banner",
        });

        setLandingBanner(response.data.banners);
        // console.log(response.data.news);
        console.log("filepath", response.data.banners.banner[0].filepath);
        // setLandingBanner(response.data.LandingBanner);
      } catch (error) {
        console.error("Error fetching Landing Banner:", error);
      }
    };

    fetchLandingBanner();
  }, []);

  const handleDelete = async (id, heading) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${heading}" landing banner ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `landing-banner/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setLandingBanner(null); // Update user state to null after deletion
      // setTimeout(() => {
      //   navigate("/admin/FactsheetPresentation");
      // }, 2000);
      console.log(response.data);
      setLandingBanner(landingBanner.filter((banner) => banner._id !== id));
      setTimeout(() => {
        navigate("/admin/landing-banner");
      }, 3000);
    } catch (error) {
      console.error("Error deleting landing banner:", error);
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Landing Banner
          <NavLink to="/admin/add/landing-banner" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Landing Banner
          </NavLink>
        </h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table id="example" className="table nowrap">
                <thead>
                  <tr>
                    <th>Banner</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Heading</th>
                    <th className="text-center">Heading Color</th>
                    <th className="text-center">Page</th>
                    <th className="text-center">Edit</th>
                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {landingBanner &&
                    landingBanner.map((banners) => (
                      <tr key={banners._id}>
                        <td>
                           {banners.type === "image" ? (
                            <img
                              src={banners.banner.filepath}
                              alt={banners.banner.alt || "banner-image"}
                              style={{ width: "100px", height: "100px" }}
                              loading="lazy"
                            />
                          ) : banners.type === "video" ? (
                            <video
                              src={banners.banner.filepath}
                              style={{ width: "100px", height: "100px" }}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <p>No media available</p>
                          )}
                        </td>
                        <td className="text-center">{banners.alt}</td>
                        <td className="text-center">{banners.heading}</td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <span
                              className="me-2 border"
                              style={{
                                backgroundColor: `${banners.heading_color}`,
                                width: "50px",
                                height: "30px",
                              }}
                            ></span>
                            {banners.heading_color}
                          </div>
                        </td>
                        <td className="text-center">{banners.page}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/landing-banner/${banners._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(banners._id, banners.heading)
                            }
                          >
                            <i className="las la-trash"></i>{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LandingBanner;

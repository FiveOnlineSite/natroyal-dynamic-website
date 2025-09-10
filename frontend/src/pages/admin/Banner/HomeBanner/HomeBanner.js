import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const HomeBanner = () => {
  const [homeBanner, setHomeBanner] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "home-banner",
        });

        setHomeBanner(response.data.banners);
        // console.log(response.data.news);
        console.log("filepath", response.data.banners.banner[0].filepath);
        // setHomeBanner(response.data.HomeBanner);
      } catch (error) {
        console.error("Error fetching Home Banner:", error);
      }
    };

    fetchHomeBanner();
  }, []);

  const handleDelete = async (id, heading) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${heading}" home banner ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `home-banner/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setHomeBanner(null); // Update user state to null after deletion
      // setTimeout(() => {
      //   navigate("/admin/FactsheetPresentation");
      // }, 2000);
      console.log(response.data);
      setHomeBanner(homeBanner.filter((banner) => banner._id !== id));
        toast.success("Home banner deleted successfully!");
      
      setTimeout(() => {
        navigate("/admin/home-banner");
      }, 3000);
    } catch (error) {
        toast.success("Failed to delete home banner");
      
      console.error("Error deleting home banner:", error);
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Home Banner
          <NavLink to="/admin/add/home-banner" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Home Banner
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
                    <th className="text-center">Button</th>
                    <th className="text-center">Button Url</th>
                    <th className="text-center">Edit</th>
                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {homeBanner &&
                    homeBanner.map((banners) => (
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
                        <td className="text-center">{banners.button}</td>
                        <td className="text-center">{banners.button_url}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/edit/home-banner/${banners._id}`}
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

export default HomeBanner;

import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlankSlider = () => {
  const [plankSlider, setPlankSlider] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlankSlider = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "plank-slider",
        });

        setPlankSlider(response.data.plankSliders);
        // console.log(response.data.news);
        console.log("Plank Sliders", response.data.plankSliders);
        // setPlankSlider(response.data.PlankSlider);
      } catch (error) {
        console.error("Error fetching Plank Sliders:", error);
      }
    };

    fetchPlankSlider();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}" plank slider ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `plank-slider/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setPlankSlider(null); // Update user state to null after deletion
      // setTimeout(() => {
      //   navigate("/admin/FactsheetPresentation");
      // }, 2000);
      console.log(response.data);
      setPlankSlider(
        plankSlider.filter((plankSlider) => plankSlider._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/plank-slider");
      }, 3000);
      toast.success("Plank slider deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting Plank Sliders:", error);
      toast.error("Failed to delete plank slider");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Plank Slider
          <NavLink to="/admin/add/plank-slider" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Plank Slider
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
                    <th>Name</th>
                    <th className="text-center">Code</th>
                    <th className="text-center">PlankSlider Category</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">QR</th>
                    <th className="text-center">QR Alt</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {plankSlider &&
                    plankSlider.map((PlankSlider) => (
                      <tr key={PlankSlider._id}>
                        <td>{PlankSlider.name}</td>
                        <td className="text-center">{PlankSlider.code}</td>
                        <td className="text-center">
                          {PlankSlider.category_id
                            ? PlankSlider.category_id.title
                            : "N/A"}
                        </td>
                        {/* <td className="text-center">
                          {PlankSlider.category_id ? PlankSlider.category_id.size : "N/A"}
                        </td> */}

                        <td className="text-center">
                          {PlankSlider.image[0]?.filepath && (
                            <img
                              src={PlankSlider.image[0]?.filepath}
                              alt={PlankSlider.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {PlankSlider.alt}</td>
                        <td className="text-center">
                          {PlankSlider.qr[0]?.filepath && (
                            <img
                              src={PlankSlider.qr[0]?.filepath}
                              alt={PlankSlider.qr_alt}
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center">{PlankSlider.qr_alt}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/edit/plank-slider/${PlankSlider._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(PlankSlider._id, PlankSlider.name)
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

export default PlankSlider;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";

const Textile = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [textiles, setTextiles] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTextiles = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/textiles`);
        const textilesData = response.data.textiles;

        setTextiles(textilesData);
        console.log("Fetched title:", textilesData.title);
      } catch (error) {
        console.error("Error fetching textiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTextiles();
  }, []);

  const handleDeleteApplication = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${title}" textiles?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/textiles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setTextiles((prev) => prev.filter((app) => app._id !== id));
      setTimeout(() => {
        navigate("/admin/textiles");
      }, 3000);
    } catch (error) {
      console.error("Error deleting textiles:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete textiles"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          textiles
          <NavLink to="/admin/add/textiles" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add textiles
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
                    <th>Title</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Content</th>
                    <th className="text-center">Lamination Content</th>
                    <th className="text-center">Coating Content</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {textiles &&
                    textiles.map((app) => (
                      <tr key={app._id}>
                        <td>{app.title}</td>

                        <td className="text-center">
                          {app.image[0]?.filepath && (
                            <img
                              src={app.image[0]?.filepath}
                              alt={app.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {app.alt}</td>
                        <td className="text-center"> {app.content}</td>

                        <td className="text-center"> {app.lamination_content}</td>
                        <td className="text-center"> {app.coating_content}</td>


                        <td className="text-center">
                          <Link
                            to={`/admin/edit/textiles/${app._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteApplication(app._id, app.title)
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

export default Textile;

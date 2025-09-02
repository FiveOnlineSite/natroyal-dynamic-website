import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";

const LvtFeature = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [CoatedFabricsApp, setCoatedFabricsApp] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCoatedFabricsApp = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/coated-application`);
        const CoatedFabricsAppData = response.data.LvtFeature;

        setCoatedFabricsApp(CoatedFabricsAppData);
        console.log("Fetched name:", CoatedFabricsAppData.name);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoatedFabricsApp();
  }, []);

  const handleDeleteApplication = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${name}" application?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/coated-application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setCoatedFabricsApp((prev) => prev.filter((app) => app._id !== id));
      setTimeout(() => {
        navigate("/admin/coated-applications");
      }, 3000);
    } catch (error) {
      console.error("Error deleting application:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete application"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Coated Applications
          <NavLink to="/admin/add/coated-applications" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add coated Application
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
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {CoatedFabricsApp &&
                    CoatedFabricsApp.map((app) => (
                      <tr key={app._id}>
                        <td>{app.name}</td>

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

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/coated-applications/${app._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteApplication(app._id, app.name)
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

export default LvtFeature;

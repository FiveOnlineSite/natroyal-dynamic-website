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
  const [lvtFeature, setLvtFeature] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLvtFeatures = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/lvt-feature`);
        const LvtFeature = response.data.lvtFeature;

        setLvtFeature(LvtFeature);
        console.log("Fetched name:", LvtFeature.name);
      } catch (error) {
        console.error("Error fetching lvt feature:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLvtFeatures();
  }, []);

  const handleDeletefeaturelication = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${name}" lvt feature?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/lvt-feature/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setLvtFeature((prev) => prev.filter((feature) => feature._id !== id));
      setTimeout(() => {
        navigate("/admin/lvt-features");
      }, 3000);
    } catch (error) {
      console.error("Error deleting lvt feature:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete featurelication"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         lvt feature
          <NavLink to="/admin/add/lvt-features" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add lvt feature
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
                    <th className="text-center">Icon</th>
                    <th className="text-center">Alt</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {lvtFeature &&
                    lvtFeature.map((feature) => (
                      <tr key={feature._id}>
                        <td>{feature.name}</td>

                        <td className="text-center">
                          {feature.icon[0]?.filepath && (
                            <img
                              src={feature.icon[0]?.filepath}
                              alt={feature.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {feature.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/lvt-features/${feature._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeletefeaturelication(feature._id, feature.name)
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

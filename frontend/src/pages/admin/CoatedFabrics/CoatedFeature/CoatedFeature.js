import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";
import { toast } from "react-toastify";

const CoatedFeature = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [coatedFeature, setCoatedFeature] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCoatedFeature = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/coated-feature`);
        const coatedFeatureData = response.data.CoatedFeature;

        setCoatedFeature(coatedFeatureData);
        console.log("Fetched name:", coatedFeatureData.name);
      } catch (error) {
        console.error("Error fetching coated feature:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoatedFeature();
  }, []);

  const handleDeleteFeature = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${name}" coated feature?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/coated-feature/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setCoatedFeature((prev) => prev.filter((feature) => feature._id !== id));
      setTimeout(() => {
        navigate("/admin/coated-features");
      }, 3000);

      toast.success("Coated fabrics feature deleted successfully!");

    } catch (error) {
      console.error("Error deleting coated feature:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete coated feature"
      );
      toast.error("Failed to delete coated fabrics feature");
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Coated feature
          <NavLink to="/admin/add/coated-features" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add coated feature
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
                  {coatedFeature &&
                    coatedFeature.map((feature) => (
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
                            to={`/admin/edit/coated-features/${feature._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteFeature(feature._id, feature.name)
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

export default CoatedFeature;

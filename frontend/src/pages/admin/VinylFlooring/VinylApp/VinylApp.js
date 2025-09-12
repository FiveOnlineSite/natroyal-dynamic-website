import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";
import { toast } from "react-toastify";

const VinylApp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [vinylApp, setVinylApp] = useState("");
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVinylApp = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-application`);
        const VinylAppData = response.data.vinylApp;

        setVinylApp(VinylAppData);
        console.log("Fetched name:", VinylAppData.name);
     } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylApp();
  }, []);

const handleDeleteApplication = async (id, name) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete the "${name}" application?\n\n` +
    "All content linked to this application and any product that only belongs to it will also be deleted."
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;

    // call API with forceDelete right away
    await axios.delete(`${apiUrl}/api/vinyl-application/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setVinylApp((prev) => prev.filter((app) => app._id !== id));
    toast.success("Vinyl flooring application deleted successfully!");
    navigate("/admin/vinyl-applications");
  } catch (err) {
    console.error("Delete failed:", err);
    setErrorMessage(err.response?.data?.message || "Failed to delete application");
    toast.error("Failed to delete vinyl flooring application");
  }
};



  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Vinyl Applications
          <NavLink to="/admin/add/vinyl-applications" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Vinyl Application
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
                     <th className="text-center">Icon</th>
                    <th className="text-center">Icon Alt</th>
                     <th className="text-center">Content</th>
                    
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {vinylApp &&
                    vinylApp.map((vinylApp) => (
                      <tr key={vinylApp._id}>
                        <td>{vinylApp.name}</td>
                       

                        <td className="text-center">
                          {vinylApp.image[0]?.filepath && (
                            <img
                              src={vinylApp.image[0]?.filepath}
                              alt={vinylApp.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {vinylApp.alt}</td>
                        <td className="text-center">
                          {vinylApp.icon[0]?.filepath && (
                            <img
                              src={vinylApp.icon[0]?.filepath}
                              alt={vinylApp.icon_alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {vinylApp.icon_alt}</td>
                         <td className="text-center"> {vinylApp.content}</td>
                         <td className="text-center">
                          <Link
                            to={`/admin/edit/vinyl-applications/${vinylApp._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteApplication(vinylApp._id, vinylApp.name)
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

export default VinylApp;


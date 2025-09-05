import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";

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
  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;

    // First delete attempt
    await axios.delete(`${apiUrl}/api/vinyl-application/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    setVinylApp(vinylApp.filter((app) => app._id !== id));
    navigate("/admin/vinyl-applications");
  } catch (error) {
    // If backend sends custom restriction message
    if (error.response?.data?.message && error.response?.data?.productName) {
      const confirmDelete = window.confirm(
        `${error.response.data.message}\n\nDo you still want to delete this "${name}" application along with the product?`
      );

      if (confirmDelete) {
        try {
          const access_token = localStorage.getItem("access_token");
          const apiUrl = process.env.REACT_APP_API_URL;

         await axios.delete(
            `${apiUrl}/api/vinyl-application/${id}?forceDelete=true`,
            { headers: { Authorization: `Bearer ${access_token}` } }
          );

          setVinylApp(vinylApp.filter((app) => app._id !== id));
          navigate("/admin/vinyl-applications");
        } catch (forceError) {
          console.error("Error force deleting application:", forceError);
          setErrorMessage(
            forceError.response?.data?.message || "Failed to delete application"
          );
        }
      }
    } else {
      console.error("Error deleting application:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete application"
      );
    }
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


import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";

const VinylAppContent = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [VinylAppContent, setVinylAppContent] = useState("");

  useEffect(() => {
    const fetchVinylAppContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-application-content`);
        const VinylAppContentData = response.data.VinylAppContent;

        setVinylAppContent(VinylAppContentData);
        console.log("Fetched name:", VinylAppContentData.name);
     } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylAppContent();
  }, []);

const handleDeleteAppContent = async (id, appName) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete this "${appName}" application content?`
  );
  if (!confirmDelete) return;

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;

    await axios.delete(`${apiUrl}/api/vinyl-application-content/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    setVinylAppContent((prev) =>
      prev.filter((item) => item._id !== id)
    );
    setTimeout(() => {
        navigate("/admin/vinyl-application-content");
      }, 3000);
  } catch (error) {
    console.error("Error deleting application:", error);
    setErrorMessage(error.response?.data?.message || "Failed to delete application");
  }
};


  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Vinyl Application Content
          <NavLink to="/admin/add/vinyl-application-content" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Vinyl Application Content
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
                    <th>Application</th>
                    <th className="text-center">Yellow Name</th>
                    <th className="text-center">Black Name</th>
                     <th className="text-center">Content</th>
                    
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                 {VinylAppContent.length > 0 ? (
                  <>
                    {VinylAppContent.map((item) => (
                      <tr key={item._id}>
                        <td>{item.application.name}</td>
                        <td className="text-center">{item.yellow_title}</td>
                        <td className="text-center">{item.black_title}</td>
                        <td className="text-center">{item.content}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/edit/vinyl-application-content/${item._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteAppContent(item._id, item.application.name)
                            }
                          >
                            <i className="las la-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data found.
                    </td>
                  </tr>
                )}

                   
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VinylAppContent;


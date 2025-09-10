import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";
import { toast } from "react-toastify";

const Tags = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Tags, setTags] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/tags`
        );
        const TagsData = response.data.tags;

        setTags(TagsData);
        console.log("Fetched tag:", TagsData.tag);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleDeleteAppContent = async (id, tag) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${tag}"?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/tags/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setTags((prev) => prev.filter((item) => item._id !== id));
      setTimeout(() => {
        navigate("/admin/tags");
      }, 3000);

      toast.success("Tag deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting tags:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete tags"
      );
      toast.error("Failed to delete tag");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          tags
          <NavLink
            to="/admin/add/tags"
            className="theme-cta"
          >
            <i className="las la-plus-circle"></i>
            Add tags
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
                    <th>Textile</th>
                    <th className="text-center">Tag</th>
             
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Tags.length > 0 ? (
                    <>
                      {Tags.map((item) => (
                        <tr key={item._id}>
                          <td>{item.textile.title}</td>
                          <td className="text-center">{item.tag}</td>
                          <td className="text-center">
                            <Link
                              to={`/admin/edit/tags/${item._id}`}
                              title="Edit"
                            >
                              <i className="las la-pencil-alt"></i>
                            </Link>
                          </td>
                          <td className="text-center">
                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDeleteAppContent(
                                  item._id,
                                  item.tag
                                )
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

export default Tags;

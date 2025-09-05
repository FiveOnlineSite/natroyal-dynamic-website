import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";

const VinylProductContent = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [VinylProductContent, setVinylProductContent] = useState("");

  useEffect(() => {
    const fetchVinylProductContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product-content`);
        const VinylProductContentData = response.data.VinylProductContent;

        setVinylProductContent(VinylProductContentData);
        console.log("Fetched name:", VinylProductContentData.name);
     } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProductContent();
  }, []);

const handleDeleteAppContent = async (id, appName) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete this "${appName}" product content?`
  );
  if (!confirmDelete) return;

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;

    await axios.delete(`${apiUrl}/api/vinyl-product-content/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    setVinylProductContent((prev) =>
      prev.filter((item) => item._id !== id)
    );
    setTimeout(() => {
        navigate("/admin/vinyl-product-content");
      }, 3000);
  } catch (error) {
    console.error("Error deleting product content:", error);
    setErrorMessage(error.response?.data?.message || "Failed to delete product content");
  }
};


  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Vinyl Product Contents
          <NavLink to="/admin/add/vinyl-product-content" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Vinyl Product Content
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
                    <th>Product</th>
                    <th className="text-center">Title1</th>
                    <th className="text-center">Title2</th>
                     <th className="text-center">Content</th>
                    
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                 {VinylProductContent.length > 0 ? (
                  <>
                    {VinylProductContent.map((item) => (
                      <tr key={item._id}>
                        <td>{item.product.name}</td>
                        <td className="text-center">{item.title1}</td>
                        <td className="text-center">{item.title2}</td>
                        <td className="text-center">{item.content}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/edit/vinyl-product-content/${item._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteAppContent(item._id, item.product.name)
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

export default VinylProductContent;


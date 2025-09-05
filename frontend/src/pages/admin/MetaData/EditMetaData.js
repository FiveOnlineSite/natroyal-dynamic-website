import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMetaData = () => {
  const { id } = useParams();
  const [metaData, setMetaData] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    page: "",
    metaTitle: "",
    metaDescription: "",
    metaKeyword: "",
  });

  useEffect(() => {
    const fetchmetaData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: `meta-data/by-id/${id}`,
        });
        const metaDataData = response.data;
        setMetaData(metaDataData);
        // Set media state from galleryData
        // setMedia(galleryData.media);

        // Set formData based on gallery media type
        setFormData({
          page: metaDataData.page,
          metaTitle: metaDataData.metaTitle,
          metaDescription: metaDataData.metaDescription,
          metaKeyword: metaDataData.metaKeyword,
        });
      } catch (error) {
        console.error("Error fetching meta data:", error);
      }
    };

    fetchmetaData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("page", formData.page);
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);
      formDataToSend.append("metaKeyword", formData.metaKeyword);
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "PATCH",
        baseURL: `${apiUrl}/api/`,
        url: `/meta-data/${id}`,
        data: formDataToSend,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log(response.data);

      navigate("/admin/meta-data");
    } catch (error) {
      console.error("Error updating meta data:", error);
      setErrorMessage(
        `${error.response?.data?.message}` || "An error occurred"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Meta Data</h2>
      </div>
      <div className="form-white-bg">
        <div className="form-white-bg">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Page</label>
                  <input
                    type="text"
                    name="page"
                    required
                    value={formData.page}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    required
                    value={formData.metaTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Meta Description</label>
                  <input
                    type="text"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Meta Keyword</label>
                  <input
                    type="text"
                    name="metaKeyword"
                    value={formData.metaKeyword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="error-message text-danger mt-2">
                  {errorMessage}
                </div>
              )}

              <div className="col-12">
                <div className="theme-form">
                  <button type="submit">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditMetaData;

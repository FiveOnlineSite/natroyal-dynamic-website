import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditMetaData = () => {
  const { id } = useParams();
  const [metaData, setMetaData] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState("");
  
  const [formData, setFormData] = useState({
    page: "",
    metaTitle: "",
    metaDescription: "",
    metaKeyword: "",
  });

    const [allPages, setAllPages] = useState([])
    
    useEffect(() => {
      const fetchAllPages = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(
              `${apiUrl}/api/banner/all-pages`
            );
            const pagesData = response.data.pages;
            setAllPages(pagesData);
    
          } catch (error) {
            console.error("Error fetching all pages:", error);
          } 
        }
    
        fetchAllPages();
      }, []);

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
      if (isSubmitting) return;
    
      if (errorMessage) {
                      toast.error(errorMessage);
                      return;
                    }
    
     if (validationError) {
        toast.error(validationError);
        return;
    }
      
      setIsSubmitting(true);
      setErrorMessage("");

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
      toast.success("Meta data updated successfully!");
      
    } catch (error) {
      console.error("Error updating meta data:", error);
      setErrorMessage(
        `${error.response?.data?.message}` || "An error occurred"
      );
      toast.error("Failed to update meta data");
      
    } finally {
    setIsSubmitting(false);
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
                   <select
                     name="page"
                     required
                     disabled
                     value={formData.page} 
                     onChange={handleChange}
                   >
                  <option value="" disabled>
                    Select a Page
                  </option>

                  {[
                    { key: "home", label: "Home", url: "/" },

                    { key: "about-us", label: "About Us", url: "/about-us" },
                    { key: "our-divisions", label: "Our Divisions", url: "/our-divisions" },
                    { key: "contact-us", label: "Contact Us", url: "/contact-us" },
                    { key: "vinyl-flooring", label: "Vinyl Flooring", url: "/vinyl-flooring" },
                    { key: "coated-fabrics", label: "Coated Fabrics", url: "/coated-fabrics" },
                    { key: "seating-components", label: "Seating Components", url: "/seating-components" },
                    { key: "knit-fabrics", label: "Knit Fabrics", url: "/knit-fabrics" },
                    { key: "awards-and-recognition", label: "Awards & Recognition", url: "/awards-and-recognition" },
                    { key: "research-and-development", label: "Research & Development (R&D)", url: "/research-and-development" },

                  ].map((p, idx) => (
                    <option key={`static-${idx}`} value={p.url}>
                      {p.label}
                    </option>
                  ))}

                  {allPages.map((p, idx) => (
                    <option key={`dynamic-${idx}`} value={p.url}>
                      {p.label}
                    </option>
                  ))}
                </select>
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
                  <textarea
                    rows="4"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                  ></textarea>
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

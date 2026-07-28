import React, { useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddMetaData = () => {
  const [page, setPage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState("");
  
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
         if (validationError) {
                 toast.error(validationError);
                 return;
             }
         
              if (errorMessage) {
                 toast.error(errorMessage);
                 return;
             }
    
        setIsSubmitting(true);
        setErrorMessage("");
setValidationError("")

    try {
      // Create a FormData object to store the form data
      const formData = new FormData();
      formData.append("page", page);
      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);
      formData.append("metaKeyword", metaKeyword);
      const access_token = localStorage.getItem("access_token");

      // Make a POST request to the backend to create a new team

      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios({
        method: "POST",
        baseURL: `${apiUrl}/api/`,
        url: "meta-data",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
      navigate("/admin/meta-data");

      toast.success("Meta data added successfully!");
      
    } catch (error) {
      console.error("Error creating meta data:", error);
      setErrorMessage(
        ` ${error.response?.data?.message}` || "An error occurred"
      );
      toast.error("Failed to add meta data");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Meta Data</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Page</label>
                <select
                  name="page"
                  required
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                >
                  <option value="" disabled>
                    Select a Page
                  </option>

                  {/* Static pages */}
                  <option value="/">Home</option>

                  <option value="/about-us">About Us</option>
                  <option value="/our-divisions">Our Divisions</option>
                  <option value="/contact-us">Contact Us</option>
                  <option value="/vinyl-flooring">Vinyl Flooring</option>
                  <option value="/coated-fabrics">Coated Fabrics</option>
                  <option value="/seating-components">Seating Components</option>
                  <option value="/knit-fabrics">Knit Fabrics</option>
                  <option value="/awards-and-recognition">Awards & Recognition</option>
                  <option value="/research-and-development">Research & Development (R&D)</option>

                  

                  {/* Dynamic pages from API */}
                  {allPages.map((p, idx) => (
                    <option key={idx} value={p.url}>
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
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Description</label>
                <textarea
                  rows="4"
                  name="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Keyword</label>
                <input
                  type="text"
                  name="metaKeyword"
                  value={metaKeyword}
                  onChange={(e) => setMetaKeyword(e.target.value)}
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
                {/* <input type="button" value="Save" onClick={handleSubmit}/> */}
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddMetaData;

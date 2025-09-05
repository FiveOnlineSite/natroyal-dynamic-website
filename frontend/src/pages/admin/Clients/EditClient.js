import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [client, setClient] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    alt: "",
    logo: {
      file: "",
      filepath: "",
    },
  });

  useEffect(() => {
    const fetchclient = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/clients/${id}`
        );
        const clientData = response.data.client;
        setClient(clientData);

        console.log("client data", clientData);

        setFormData({
          alt: clientData.alt,
          logo: {
            file: clientData.logo?.[0]?.filename || "",
            filepath: clientData.logo?.[0]?.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchclient();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      if (name === "logo") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          logo: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } 
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim(),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const islogo = !!formData.logo.file;

    if (!islogo) {
      setValidationError("logo is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("alt", formData.alt || "");
      if (islogo) {
        formDataToSend.append("logo", formData.logo.file);
      }
      await axios.patch(
        `${apiUrl}/api/clients/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/clients");
      }, 1000);
    } catch (error) {
      console.error("Error updating clients:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit client</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={handleChange}
                />
                {formData.logo?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.logo.filepath}
                    alt={formData.alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}
            <div className="col-12">
              <div className="theme-form">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="d-flex align-items-center">
                      <span
                        className="spinner-border me-2"
                        role="status"
                      ></span>
                      Save
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditClient;

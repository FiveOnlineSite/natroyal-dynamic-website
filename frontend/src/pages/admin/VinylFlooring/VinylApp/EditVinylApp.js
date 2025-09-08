import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditVinylApp = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [vinylApp, setVinylApp] = useState("");
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const [formData, setFormData] = useState({
     name: "",
     content: "",
     alt: "",
     icon_alt: "",
     image: {
       file: "",
       filepath: "",
     },
     icon: {
       file: "",
       filepath: "",
     },
   });

   
  useEffect(() => {
    const fetchVinylApp = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-application/${id}`);
        const vinylAppData = response.data.application;
        setVinylApp(vinylAppData);

        console.log("vinyl app data", vinylAppData);

        setFormData({
          name: vinylAppData.name,
          content: vinylAppData.content,
          alt: vinylAppData.alt,
          icon_alt: vinylAppData.icon_alt,
          image: {
            file: vinylAppData.image?.[0]?.filename || "",
            filepath: vinylAppData.image?.[0]?.filepath || "",
          },
          icon: {
            file: vinylAppData.icon?.[0]?.filename || "",
            filepath: vinylAppData.icon?.[0]?.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching vinyl app:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylApp();
  }, []);

   const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      if (name === "image") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else if (name === "icon") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          icon: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const isImage = !!formData.image.file;
    const isIcon = !!formData.icon.file;

    if (!isIcon) {
      setValidationError("Icon is required.");
      setIsSubmitting(false);
      return;
    }

    if (!isImage) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("content", formData.content || "");
      formDataToSend.append("alt", formData.alt || "");
      formDataToSend.append("icon_alt", formData.icon_alt || "");
      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }
      if (isIcon) {
        formDataToSend.append("icon", formData.icon.file);
      }

      await axios.patch(`${apiUrl}/api/vinyl-application/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/vinyl-applications");
      }, 1000);
    } catch (error) {
      console.error("Error adding vinyl applications:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit vinyl applications</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>
                 <CKEditor
                   editor={ClassicEditor}
                   data={formData.content}
                   onChange={(event, editor) => {
                                                                                 const data = editor.getData();
                                                                                  setFormData((prev) => ({ ...prev, content: data }));
                                                              }}
                   config={{
                                                                                 toolbar: [
                                                                                   "heading", "|",
                                                                                   "bold", "italic", "underline", "link", "|",
                                                                                   "bulletedList", "numberedList", "|",
                                                                                   "undo", "redo", "codeBlock"
                                                                                 ],
                                                                                 height: 200,
                                                                               }}
                 />
              </div>
            </div>


            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={handleChange
                  }
                />
                 {formData.image?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.image.filepath}
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Icon</label>
                <input
                  type="file"
                  name="icon"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={handleChange
                  }
                />
                  {formData.icon?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.icon.filepath}
                    alt={formData.icon_alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Icon Alt</label>
                <input
                  type="text"
                  name="icon_alt"
                  value={formData.icon_alt}
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

export default EditVinylApp;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Editor } from "@tinymce/tinymce-react";
=======
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60

const AddVinylApp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [icon, setIcon] = useState({ file: "" });
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [alt, setAlt] = useState("");
  const [iconAlt, setIconAlt] = useState("");
  
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const isImage = !!image.file;
    const isIcon = !!icon.file;

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
    if (isImage && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    if (isIcon && iconAlt.trim() === "") {
      setValidationError("Alt text is required when uploading icon.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("name", name);
      formData.append("content", content);
      formData.append("alt", alt);
      formData.append("icon_alt", iconAlt);
      if (image.file) {
        formData.append("image", image.file);
      }
      if (icon.file) {
        formData.append("icon", icon.file);
      }

      await axios.post(`${apiUrl}/api/vinyl-application`, formData, {
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
        <h2>Add vinyl applications</h2>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

<<<<<<< HEAD
             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                         <div className="theme-form">
                           <label>Content</label>
                           <Editor
                             apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                             value={content}
                             init={{
                               height: 200,
                                                       menubar: false,
                                                        forced_root_block: "",
                                                       plugins: ["link", "lists", "code", "casechange"],
                                                       toolbar:
                                                         "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                                                       content_style: `
                                                         body {
                                                           font-family: 'Jost', sans-serif;
                                                           color: #6d7175;
                                                         }
                                                       `,
                                                     }}
                             onEditorChange={(newContent) => setContent(newContent)} 
                           />
                         </div>
                       </div>
=======
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>
                <input
                  type="text"
                  name="content"
                  value={content}
                  required
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60


            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setImage({
                      ...image,
                      file: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={alt}
                  required
                  onChange={(e) => setAlt(e.target.value)}
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
                  onChange={(e) =>
                    setIcon({
                      ...icon,
                      file: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Icon Alt</label>
                <input
                  type="text"
                  name="icon_alt"
                  value={iconAlt}
                  required
                  onChange={(e) => setIconAlt(e.target.value)}
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

export default AddVinylApp;

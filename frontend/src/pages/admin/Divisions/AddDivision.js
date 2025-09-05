import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";

const AddDivision = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [logo, setLogo] = useState({ file: "" });
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");

  const [content, setContent] = useState("");
  const [button, setButton] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  const [alt, setAlt] = useState("");
  const [logoAlt, setLogoAlt] = useState("");
  
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const isImage = !!image.file;
    const islogo = !!logo.file;

    if (!islogo) {
      setValidationError("logo is required.");
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

    if (islogo && logoAlt.trim() === "") {
      setValidationError("Alt text is required when uploading logo.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("title1", title1);
      formData.append("title2", title2 || "");

      formData.append("content", content);
      formData.append("alt", alt);
      formData.append("button", button);
      formData.append("button_url", buttonUrl);

      formData.append("logo_alt", logoAlt);
      if (image.file) {
        formData.append("image", image.file);
      }
      if (logo.file) {
        formData.append("logo", logo.file);
      }

      await axios.post(`${apiUrl}/api/division`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/division");
      }, 1000);
    } catch (error) {
      console.error("Error adding division:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add division</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title1</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={title1}
                  onChange={(e) => setTitle1(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title2</label>
                <input
                  type="text"
                  name="name"
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                />
              </div>
            </div>

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
                <label>Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setLogo({
                      ...logo,
                      file: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Logo Alt</label>
                <input
                  type="text"
                  name="logo_alt"
                  value={logoAlt}
                  required
                  onChange={(e) => setLogoAlt(e.target.value)}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Button</label>
                <input
                  type="text"
                  name="button"
                  value={button}
                  required
                  onChange={(e) => setButton(e.target.value)}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Button Url</label>
                <input
                  type="text"
                  name="button_url"
                  value={buttonUrl}
                  required
                  onChange={(e) => setButtonUrl(e.target.value)}
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

export default AddDivision;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AddTextile = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [content, setContent] = useState("")
  const [laminationContent, setLaminationContent] = useState("")

  const [coatingContent, setCoatingContent] = useState("")

  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);
  setErrorMessage("");

  if (!image.file) {
    setValidationError("Image is required.");
    setIsSubmitting(false);
    return;
  }
  if (image.file && alt.trim() === "") {
    setValidationError("Alt text is required when uploading an image.");
    setIsSubmitting(false);
    return;
  }

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();

    formData.append("title", title);
    formData.append("alt", alt);

    // ✅ Append only if not empty
    if (content.trim()) {
      formData.append("content", content);
    }
    if (laminationContent.trim()) {
      formData.append("lamination_content", laminationContent);
    }
    if (coatingContent.trim()) {
      formData.append("coating_content", coatingContent);
    }

    if (image.file) {
      formData.append("image", image.file);
    }

    await axios.post(`${apiUrl}/api/textiles`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    navigate("/admin/textiles");
  } catch (error) {
    console.error("Error adding textiles:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add textile</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Name */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Image */}
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

            {/* Alt */}
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
                                        <label>Content</label>
                        
                                        <Editor 
                                          disabled={laminationContent.trim() || coatingContent.trim()}
                                          apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                                          // apiKey="4cfoeyqhz0nv3detfgli55jdylht31u9qyb3p4hv2ri3vaop"
                                          value={content}
                                          init={{
                                            height: 200,
                                            menubar: false,
                                            plugins: ["link", "lists", "code", "casechange"],
                                            toolbar:
                                              "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                                            content_style: `   body {
                                                font-family: 'Jost', sans-serif;
                                                color:      color: #6d7175;
                                                      }`,
                                          }}
                                          onEditorChange={(content) => setContent(content)}
                                        />
                                      </div>
                                    </div>
            

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                      <div className="theme-form">
                                        <label>Lamination Content</label>
                        
                                        <Editor
                                          apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                                          disabled={content.trim()} 
                                           // apiKey="4cfoeyqhz0nv3detfgli55jdylht31u9qyb3p4hv2ri3vaop"
                                          value={laminationContent}
                                          init={{
                                            height: 200,
                                            menubar: false,
                                            plugins: ["link", "lists", "code", "casechange"],
                                            toolbar:
                                              "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                                            content_style: `   body {
                                                font-family: 'Jost', sans-serif;
                                                color:      color: #6d7175;
                                                      }`,
                                          }}
                                          onEditorChange={(newContent) => setLaminationContent(newContent)} 
                                        />
                                      </div>
                                    </div>
            
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                      <div className="theme-form">
                                        <label>Coating Content</label>
                        
                                        <Editor
                                          apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                                          disabled={content.trim()} 
                                           // apiKey="4cfoeyqhz0nv3detfgli55jdylht31u9qyb3p4hv2ri3vaop"
                                          value={coatingContent}
                                          init={{
                                            height: 200,
                                            menubar: false,
                                            plugins: ["link", "lists", "code", "casechange"],
                                            toolbar:
                                              "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                                            content_style: `   body {
                                                font-family: 'Jost', sans-serif;
                                                color:      color: #6d7175;
                                                      }`,
                                          }}
                                          onEditorChange={(newContent) => setCoatingContent(newContent)}
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

export default AddTextile;

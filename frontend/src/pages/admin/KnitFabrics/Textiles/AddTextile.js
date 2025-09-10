import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

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
    toast.success("Textile created successfully!");
    
  } catch (error) {
    console.error("Error adding textiles:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to create textile");
    
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
                        
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={content}
                                          onChange={(event, editor) => {
                                                                                                                                                                                     const data = editor.getData();
                                                                                                                                                                                     setContent(data);
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
                                        <label>Lamination Content</label>
                        
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={laminationContent}
                                          onChange={(event, editor) => {
                                                                                                                                                                                     const data = editor.getData();
                                                                                                                                                                                     setLaminationContent(data);
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
                                        <label>Coating Content</label>
                        
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={coatingContent}
                                          onChange={(event, editor) => {
                                                                                                                                                                                     const data = editor.getData();
                                                                                                                                                                                     setCoatingContent(data);
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

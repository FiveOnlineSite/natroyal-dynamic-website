import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const EditTextile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [textile, setTextile] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    alt: "",
    image: {
      file: "",
      filepath: "",
    },
    content: "",
    lamination_content: "",
    coating_content: "",
  });

  useEffect(() => {
    const fetchTextile = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/textiles/${id}`
        );
        const textilesData = response.data.textile;
        setTextile(textilesData);

        console.log("textiles data", textilesData);

        setFormData({
          title: textilesData.title,
          alt: textilesData.alt,
          image: {
            file: textilesData.image?.[0]?.filename || "",
            filepath: textilesData.image?.[0]?.filepath || "",
          },
          content: textilesData.content,
          lamination_content: textilesData.lamination_content,
          coating_content: textilesData.coating_content
        });
      } catch (error) {
        console.error("Error fetching textile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTextile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        icon: {
          file: files[0],
          filepath: URL.createObjectURL(files[0]),
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim() === "" ? "" : value,
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);
  setErrorMessage("");
  setValidationError(""); // clear previous errors

  const isImage = !!formData.image.file;

  if (!isImage) {
    setValidationError("Image is required.");
    setIsSubmitting(false);
    return;
  }

  // ✅ Validation for content rules
  const hasContent = (formData.content || "").trim() !== "";
  const hasLaminationOrCoating =
    (formData.lamination_content || "").trim() !== "" ||
    (formData.coating_content || "").trim() !== "";

  if (hasContent && hasLaminationOrCoating) {
    setValidationError(
      "Please provide either 'Content' OR 'Lamination/Coating Content', not both."
    );
    setIsSubmitting(false);
    return;
  }

  if (!hasContent && !hasLaminationOrCoating) {
    setValidationError(
      "Please provide either 'Content' OR 'Lamination/Coating Content'."
    );
    setIsSubmitting(false);
    return;
  }

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title || "");
    formDataToSend.append("alt", formData.alt || "");
    if (isImage) {
      formDataToSend.append("image", formData.image.file);
    }
    formDataToSend.append("content", formData.content || "");
    formDataToSend.append("lamination_content", formData.lamination_content || "");
    formDataToSend.append("coating_content", formData.coating_content || "");

    await axios.patch(`${apiUrl}/api/textiles/${id}`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setTimeout(() => {
      navigate("/admin/textiles");
    }, 1000);
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
        <h2>Edit textile</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                                                    <label>Lamination Content</label>
                                    
                                                    <CKEditor
                                                      editor={ClassicEditor}
                                                      data={formData.lamination_content}
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
                                                    <label>Coating Content</label>
                                    
                                                    <CKEditor
                                                      editor={ClassicEditor}
                                                      data={formData.coating_content}
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
            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            {validationError && (
  <div className="text-danger col-12 mt-2">{validationError}</div>
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

export default EditTextile;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const EditSeatingApp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [seatingApp, setSeatingApp] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    alt: "",
    image: {
      file: "",
      filepath: "",
    },
  });

  useEffect(() => {
    const fetchseatingApp = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/seating-application/${id}`
        );
        const seatingAppData = response.data.application;
        setSeatingApp(seatingAppData);

        console.log("seating app data", seatingAppData);

        setFormData({
          name: seatingAppData.name,
          alt: seatingAppData.alt,
          image: {
            file: seatingAppData.image?.[0]?.filename || "",
            filepath: seatingAppData.image?.[0]?.filepath || "",
          },
          content: seatingAppData.content
        });
      } catch (error) {
        console.error("Error fetching seating app:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchseatingApp();
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
        [name]: value.trim(),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
        if (errorMessage) {
              toast.error(errorMessage);
              return;
            }
          
    setIsSubmitting(true);
    setErrorMessage("");

    const isImage = !!formData.image.file;

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
      formDataToSend.append("alt", formData.alt || "");
      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }formDataToSend.append("content", formData.content || "");
      

      await axios.patch(
        `${apiUrl}/api/seating-application/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/seating-applications");
      }, 1000);

              toast.success("Seating component application updated successfully!");
      
    } catch (error) {
      console.error("Error adding seating applications:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
              toast.error("Failed to update seating component application");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit seating applications</h2>
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
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 500; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024;

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(`File is too large! Maximum allowed size is ${maxSizeMB} KB.`);
                      e.target.value = ""; // clear the file input
                      return;
                    }

                    // Clear any previous error
                    setErrorMessage("");

                    // Proceed if size is okay
                    setFormData((prev) => ({
                      ...prev,
                        image: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
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

export default EditSeatingApp;

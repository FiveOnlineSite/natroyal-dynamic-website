import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const EditDivision = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [division, setDivision] = useState("");
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const [formData, setFormData] = useState({
     title1: "",
     title2: "",

     content: "",
     alt: "",
     logo_alt: "",
     image: {
       file: "",
       filepath: "",
     },
     logo: {
       file: "",
       filepath: "",
     },
     button: "",
     button_url: "",
   });

   
  useEffect(() => {
    const fetchdivision = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/division/${id}`);
        const divisionData = response.data.division;
        setDivision(divisionData);

        console.log("division data", divisionData);

        setFormData({
          title1: divisionData.title1,
          title2: divisionData.title2 || "",
          content: divisionData.content,
          alt: divisionData.alt,
          logo_alt: divisionData.logo_alt,
          image: {
            file: divisionData.image?.[0]?.filename || "",
            filepath: divisionData.image?.[0]?.filepath || "",
          },
          logo: {
            file: divisionData.logo?.[0]?.filename || "",
            filepath: divisionData.logo?.[0]?.filepath || "",
          },
          button: divisionData.button,
          button_url: divisionData.button_url
        });
      } catch (error) {
        console.error("Error fetching division:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchdivision();
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
      } else if (name === "logo") {
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

    const isImage = !!formData.image.file;
    const islogo = !!formData.logo.file;

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

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      
      formDataToSend.append("title1", formData.title1 || "");
      formDataToSend.append("title2", formData.title2 || "");

      formDataToSend.append("content", formData.content || "");
      formDataToSend.append("alt", formData.alt || "");
      formDataToSend.append("logo_alt", formData.logo_alt || "");
      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }
      if (islogo) {
        formDataToSend.append("logo", formData.logo.file);
      }
      formDataToSend.append("button", formData.button || "");
      formDataToSend.append("button_url", formData.button_url || "");


      await axios.patch(`${apiUrl}/api/division/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/division");
      }, 1000);

      toast.success("Division updated successfully!");
      
    } catch (error) {
      console.error("Error adding division:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update division");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit division</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title1</label>
                <input
                  type="text"
                  name="title1"
                  required
                  value={formData.title1}
                  onChange={handleChange}
                />
              </div>
            </div>

               <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title2</label>
                <input
                  type="text"
                  name="title2"
                  value={formData.title2}
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
                             required
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
                <label>logo</label>
                <input
                  type="file"
                  name="logo"
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
                        logo: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                  {formData.logo?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.logo.filepath}
                    alt={formData.logo_alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>logo Alt</label>
                <input
                  type="text"
                  name="logo_alt"
                  value={formData.logo_alt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Button</label>
                <input
                  type="text"
                  name="button"
                  value={formData.button}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Button Url</label>
                <input
                  type="text"
                  name="button_url"
                  value={formData.button_url}
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

export default EditDivision;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const EditCoatedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [coatedProduct, setcoatedProduct] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applications, setApplications] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    alt: "",
    image: {
      file: "",
      filepath: "",
    },
    brochure: {
      file: "",
      filepath: "",
    },
    button: "",
    application: "",
    content: ""
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/coated-application`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setApplications(response.data.coatedApp || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchCoatedProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/coated-product/${id}`);
        const coatedProductData = response.data.product;
        setcoatedProduct(coatedProductData);

        console.log("coated product data", coatedProductData);

        setFormData({
          name: coatedProductData.name,
          alt: coatedProductData.alt,
          image: {
            file: coatedProductData.image?.[0]?.filename || "",
            filepath: coatedProductData.image?.[0]?.filepath || "",
          },
           brochure: {
            filename: coatedProductData.brochure?.filename || "",
            filepath: coatedProductData.brochure?.filepath || "",
            file: null, // nothing yet, only when uploading
          },
          content: coatedProductData.content,

          button: coatedProductData.button,
          application: coatedProductData.application?._id || coatedProductData.application || "",
        });
      } catch (error) {
        console.error("Error fetching coated product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoatedProduct();
  }, []);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: {
        file: files[0],
        filepath: URL.createObjectURL(files[0]),
      },
    }));
  } else if (name === "brochure") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      brochure: {
        filename: files[0]?.name || prevFormData.brochure.filename,
        filepath: URL.createObjectURL(files[0]),
        file: files[0],
      },
    }));
  } else if (name === "button") {
    // When button is emptied, clear brochure too
    if (value.trim() === "") {
      setFormData((prev) => ({
        ...prev,
        button: "",
        brochure: { file: "", filepath: "", filename: "" },
      }));
    } else {
      setFormData((prev) => ({ ...prev, button: value }));
    }
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

  const isImage = !!formData.image.file || !!formData.image.filepath;

  if (!isImage) {
    setValidationError("Image is required.");
    setIsSubmitting(false);
    return;
  }

  // ✅ Validate brochure when button has text
  if (
    formData.button.trim() !== "" &&
    !formData.brochure.file &&
    !formData.brochure.filepath
  ) {
    setValidationError("Please upload a brochure when Button text is provided.");
    setIsSubmitting(false);
    return;
  }

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("alt", formData.alt || "");
    formDataToSend.append("content", formData.content || "");
    formDataToSend.append("button", formData.button || "");

    if (formData.image.file) {
      formDataToSend.append("image", formData.image.file);
    }
    formDataToSend.append("application", formData.application);

    if (formData.brochure?.file) {
      formDataToSend.append("brochure", formData.brochure.file);
    }

    if (formData.button.trim() === "") {
      formDataToSend.append("removeBrochure", "true");
    }

    await axios.patch(`${apiUrl}/api/coated-product/${id}`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setTimeout(() => {
      navigate("/admin/coated-products");
    }, 1000);

    toast.success("Coated fabrics product updated successfully!");
  } catch (error) {
    console.error("Error updating coated products:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to update coated fabrics product");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit coated products</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Application</label>
                <select
                  required
                  name="application"
                  value={formData.application}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option selected disabled value="">
                    Select Application
                  </option>
                  {applications &&
                    applications.map((app) => (
                      <option key={app._id} value={app._id}>
                        {app.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

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
                {formData.image.filepath && (
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
                <label>Button</label>
                <input
                  type="text"
                  name="button"
                  value={formData.button}
                  onChange={handleChange}
                />
              </div>
            </div>

{formData.button.trim() !== "" && (
    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Brochure</label>
                <input
                  key={formData.button} 
                  type="file"
                  name="brochure"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 5; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024 * 1024;

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
                        brochure: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                {formData.brochure?.filepath && formData.brochure.filepath.trim() !== "" ? (
                          <a
                            href={`${process.env.REACT_APP_API_URL}/${formData.brochure.filepath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            📄 View PDF - {formData.brochure?.filename}
                          </a>
                        ) : (
                          <span>No brochure</span>
                        )}
              </div>
            </div>
)}
              

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

export default EditCoatedProduct;

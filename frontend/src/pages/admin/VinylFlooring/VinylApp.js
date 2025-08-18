import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const VinylApp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blackTitle, setBlackTitle] = useState("");
  const [application, setApplication] = useState([
    { name: "", image: null, icon: null, icon_alt: "", alt: "", content: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchVinylApp = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-application`);
        const VinylAppData = response.data.vinylApp[0];

        setYellowTitle(VinylAppData.yellow_title || "");
        setBlackTitle(VinylAppData.black_title || "");
        setApplication(VinylAppData.application || []);
        console.log("Fetched alt:", VinylAppData.application[0]?.alt);
        console.log("Fetched application:", VinylAppData.application);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylApp();
  }, []);

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (isSubmitting) return;
   setIsSubmitting(true);
   setErrorMessage("");

const imageErrors = application.some((application) => {
  return (
    !application._id &&
    (!(application.image instanceof File) ||
      !(application.icon instanceof File))
  );
});

    if (imageErrors) {
      setErrorMessage("Please upload images for new application.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("yellow_title", yellowTitle);
      formData.append("black_title", blackTitle);

      const applicationArray = application.map((application, index) => {
        const imageKey = `image_${index}`;
         const iconKey = `icon_${index}`;

        // Only append if it's a new file (not already uploaded object)
        if (application.image instanceof File) {
          formData.append(imageKey, application.image);
        }

         if (application.icon instanceof File) {
           formData.append(iconKey, application.icon);
         }

        return {
          name: application.name,
          alt: application.alt,
          content: application.content,
          icon_alt: application.icon_alt,
          _id: application._id,
          image_key: imageKey,
          icon_key: iconKey,
        };
      });

      formData.append("application", JSON.stringify(applicationArray));

      await axios.patch(`${apiUrl}/api/vinyl-application`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/vinyl-applications");
      }, 1000);
    } catch (error) {
      console.error("Error updating vinyl application:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
 };


  const handleDeleteApplication = async (applicationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/vinyl-application/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const updatedApps = application.filter(
        (item) => item._id !== applicationId
      );
      setApplication(updatedApps);
    } catch (error) {
      console.error("Error deleting application:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete application"
      );
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Vinyl Applications</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <div className="theme-form">
                <label>Yellow Title</label>
                <input
                  type="text"
                  required
                  value={yellowTitle}
                  onChange={(e) => setYellowTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="theme-form">
                <label>Black Title</label>
                <input
                  type="text"
                  value={blackTitle}
                  onChange={(e) => setBlackTitle(e.target.value)}
                />
              </div>
            </div>

            {application.map((item, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Name</label>
                      <input
                        type="text"
                        value={item.name}
                        required
                        onChange={(e) => {
                          const updated = [...application];
                          updated[index].name = e.target.value;
                          setApplication(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Alt</label>
                      <input
                        type="text"
                        value={item.alt}
                        required
                        onChange={(e) => {
                          const updated = [...application];
                          updated[index].alt = e.target.value;
                          setApplication(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Icon Alt</label>
                      <input
                        type="text"
                        value={item.icon_alt}
                        required
                        onChange={(e) => {
                          const updated = [...application];
                          updated[index].icon_alt = e.target.value;
                          setApplication(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Image</label>
                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 10 * 1024 * 1024) {
                            setErrorMessage(
                              "Image too large. Max size is 10MB."
                            );
                            return;
                          }

                          const updated = [...application];
                          updated[index].image = file;
                          setApplication(updated);
                        }}
                      />
                      {Array.isArray(item.image) &&
                        !(item.image instanceof File) &&
                        item.image[0]?.filepath && (
                          <img
                            src={item.image[0].filepath}
                            alt={item.alt || ""}
                            className="form-profile mt-2"
                          />
                        )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Icon</label>
                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 10 * 1024 * 1024) {
                            setErrorMessage(
                              "Icon too large. Max size is 10MB."
                            );
                            return;
                          }

                          const updated = [...application];
                          updated[index].icon = file;
                          setApplication(updated);
                        }}
                      />
                      {Array.isArray(item.icon) &&
                        !(item.icon instanceof File) &&
                        item.icon[0]?.filepath && (
                          <img
                            src={item.icon[0].filepath}
                            alt={item.icon_alt || ""}
                            className="form-profile mt-2"
                          />
                        )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Content</label>
                      <Editor
                        apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                        value={item.content}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: ["link", "lists", "code"],
                          toolbar:
                            "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                          content_style: "body { font-family: 'Jost', sans-serif; color: #6d7175; }",
                        }}
                        onEditorChange={(content) => {
                          const updated = [...application];
                          updated[index].content = content;
                          setApplication(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {item._id ? (
                  <button
                    type="button"
                    className="btn m-2 delete-btn"
                    onClick={() => handleDeleteApplication(item._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn remove-btn m-2"
                    onClick={() => {
                      const updated = [...application];
                      updated.splice(index, 1);
                      setApplication(updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            <div className="col-lg-6 d-flex align-items-center">
              <div className="theme-form">
                <button
                  type="button"
                  onClick={() =>
                    setApplication([
                      ...application,
                      {
                        name: "",
                        image: null,
                        icon: null,
                        icon_alt: "",
                        alt: "",
                        content: "",
                        link: "",
                      },
                    ])
                  }
                >
                  + Add New application
                </button>
              </div>

              <div className="theme-form ms-3">
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
    </Layout>
  );
};

export default VinylApp;


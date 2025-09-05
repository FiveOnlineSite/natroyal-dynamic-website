import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const EditVinylAppContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [vinylAppContent, setVinylAppContent] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
<<<<<<< HEAD
    title1: "",
    title2: "",
=======
    yellow_title: "",
    black_title: "",
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
    content: "",
    application: "",
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/vinyl-application`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setApplications(response.data.vinylApp || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchVinylAppContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/vinyl-application-content/${id}`
        );
        const vinylAppContentData = response.data.appContent;
        setVinylAppContent(vinylAppContentData);

        console.log("vinyl app data", vinylAppContentData);

        setFormData({
<<<<<<< HEAD
          title1: vinylAppContentData.title1,
          title2: vinylAppContentData.title2,
=======
          yellow_title: vinylAppContentData.yellow_title,
          black_title: vinylAppContentData.black_title,
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
          content: vinylAppContentData.content,
          application: vinylAppContentData.application?._id || "",
        });
      } catch (error) {
        console.error("Error fetching vinyl app Content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylAppContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.patch(
        `${apiUrl}/api/vinyl-application-content/${id}`,
        {
<<<<<<< HEAD
          title1: formData.title1,
          title2: formData.title2,
=======
          yellow_title: formData.yellow_title,
          black_title: formData.black_title,
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
          content: formData.content,
          application: formData.application,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/vinyl-application-content");
      }, 1000);
    } catch (error) {
      console.error("Error adding vinyl application contents:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit vinyl application content</h2>
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

            <div className="col-lg-6">
              <div className="theme-form">
<<<<<<< HEAD
                <label>Title1</label>
                <input
                  type="text"
                  required
                  name="title1"
                  value={formData.title1}
=======
                <label>Yellow Title</label>
                <input
                  type="text"
                  required
                  name="yellow_title"
                  value={formData.yellow_title}
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="theme-form">
<<<<<<< HEAD
                <label>Title2</label>
                <input
                  type="text"
                  name="title2"
                  value={formData.title2}
=======
                <label>Black Title</label>
                <input
                  type="text"
                  name="black_title"
                  value={formData.black_title}
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>
                <Editor
                  apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                  value={formData.content}
                  init={{
                    height: 200,
                    menubar: false,
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
                  onEditorChange={(newContent) =>
                    setFormData((prev) => ({ ...prev, content: newContent }))
                  }
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

export default EditVinylAppContent;

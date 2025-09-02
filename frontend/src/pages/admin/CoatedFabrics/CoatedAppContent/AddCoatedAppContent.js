import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AddCoatedAppContent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [blackTitle, setBlackTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const apiUrl = process.env.REACT_APP_API_URL;

        const res = await axios.get(`${apiUrl}/api/coated-application`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        setApplications(res.data.coatedApp || []); // adjust key based on your API
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      // Strip HTML tags to get plain text
      const plainContent = content.replace(/<\/?[^>]+(>|$)/g, "");

      await axios.post(
        `${apiUrl}/api/coated-application-content`,
        {
          application,
          yellow_title: yellowTitle,
          black_title: blackTitle,
          content: plainContent,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      setTimeout(() => {
        navigate("/admin/coated-application-content");
      }, 1000);
    } catch (error) {
      console.error("Error adding coated applications:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Coated application content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Application Dropdown */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Application</label>
                <select
                  required
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">
                    Select Application
                  </option>
                  {applications.map((app) => (
                    <option key={app._id} value={app._id}>
                      {app.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Yellow Title */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Yellow Title</label>
                <input
                  type="text"
                  value={yellowTitle}
                  onChange={(e) => setYellowTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Black Title */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Black Title</label>
                <input
                  type="text"
                  value={blackTitle}
                  onChange={(e) => setBlackTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Content */}
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

export default AddCoatedAppContent;

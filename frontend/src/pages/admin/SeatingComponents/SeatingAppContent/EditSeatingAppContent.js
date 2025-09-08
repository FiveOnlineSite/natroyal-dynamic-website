import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditSeatingAppContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [seatingAppContent, setSeatingAppcontent] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title1: "",
    title2: "",
    content: "",
    application: "",
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/seating-application`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setApplications(response.data.seatingApp || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchseatingAppContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/seating-application-content/${id}`
        );
        const seatingAppContentData = response.data.appContent;
        setSeatingAppcontent(seatingAppContentData);

        console.log("seating app data", seatingAppContentData);

        setFormData({
          title1: seatingAppContentData.title1,
          title2: seatingAppContentData.title2,
          content: seatingAppContentData.content,
          application: seatingAppContentData.application?._id || "",
        });
      } catch (error) {
        console.error("Error fetching seating app Content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchseatingAppContent();
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
        `${apiUrl}/api/seating-application-content/${id}`,
        {
          title1: formData.title1,
          title2: formData.title2,
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
        navigate("/admin/seating-application-content");
      }, 1000);
    } catch (error) {
      console.error("Error adding seating application contents:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit seating application content</h2>
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
                <label>Title1</label>
                <input
                  type="text"
                  required
                  name="title1"
                  value={formData.title1}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6">
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

export default EditSeatingAppContent;

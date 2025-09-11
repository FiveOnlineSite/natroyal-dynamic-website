import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const About = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    content: "",
    video: {
      file: null,
      filepath: "",
    },
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/about`);
        const aboutData = response.data.about[0];

        setFormData({
          content: aboutData.content || "",
          video: {
            file: null, // keep null until user uploads new file
            filepath: aboutData.video.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching about:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

    const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          video: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim(),
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (errorMessage) {
    toast.error(errorMessage);
    return;
  }

  setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const formDataToSend = new FormData();
      formDataToSend.append("content", formData.content || "");

      if (formData.video.file instanceof File) {
        formDataToSend.append("video", formData.video.file);
      }

      await axios.patch(`${apiUrl}/api/about`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("About content updated successfully!");
      setTimeout(() => {
        navigate("/admin/about");
      }, 1000);
    } catch (error) {
      console.error("Error updating about:", error);
       toast.error(error.response?.data?.message || "Failed to update about content");
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit About</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Video Upload */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Video</label>
                <input
                  type="file"
                  name="video"
                  accept=".mp4"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 10; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024 * 1024;

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(`File is too large! Maximum allowed size is ${maxSizeMB} MB.`);
                      e.target.value = ""; // clear the file input
                      return;
                    }

                    // Clear any previous error
                    setErrorMessage("");

                    // Proceed if size is okay
                    setFormData((prev) => ({
                      ...prev,
                      video: {
                        file,
                        filepath: URL.createObjectURL(file),
                      },
                    }));
                  }}
                />


                {formData.video?.filepath && (
                  <video className="form-profile mt-2" src={formData.video?.filepath} width="200" autoPlay playsInline loop muted />
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>
                <CKEditor
                  editor={ClassicEditor}
                  required
                  data={formData.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      content: data, 
                    }));
                  }}
                  config={{
                    toolbar: [
                      "heading", "|",
                      "bold", "italic", "underline", "link", "|",
                      "bulletedList", "numberedList", "|",
                      "undo", "redo", "codeBlock"
                    ],
                  }}
                />

              </div>
            </div>

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            {/* Submit */}
            <div className="col-12">
              <div className="theme-form">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="d-flex align-items-center">
                      <span
                        className="spinner-border me-2"
                        role="status"
                      ></span>
                      Saving...
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

export default About;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const About = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/about`);
        const aboutData = response.data.about[0];

        setVideoUrl(aboutData.video_url || "");
        setContent(aboutData.content || "");

        console.log("Fetched content:", aboutData.content);
      } catch (error) {
        console.error("Error fetching about:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.patch(
        `${apiUrl}/api/about`,
        {
          video_url: videoUrl,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/about");
      }, 1000);
    } catch (error) {
      console.error("Error updating about:", error);
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
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Video URL</label>
                <input
                  type="text"
                  name="video_url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>

                <Editor
                  apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                  // apiKey="4cfoeyqhz0nv3detfgli55jdylht31u9qyb3p4hv2ri3vaop"
                  value={content}
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: ["link", "lists", "code", "casechange"],
                    toolbar:
                      "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                    content_style: `   body {
                        font-family: 'Jost', sans-serif;
                        color:      color: #6d7175;
                              }`,
                  }}
                  onEditorChange={(content) => setContent(content)}
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
    </Layout>
  );
};

export default About;

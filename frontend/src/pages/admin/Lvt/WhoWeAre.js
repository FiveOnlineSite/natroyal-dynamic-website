import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const WhoWeAre = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [alt, setAlt] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchWhoWeAre = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/who-we-are`);
        const WhoWeAreData = response.data.whoWeAre;

        setTitle1(WhoWeAreData.title1 || "");
        setTitle2(WhoWeAreData.title2 || "");
        setSubtitle(WhoWeAreData.subtitle || "");
        setContent(WhoWeAreData.content || "");
        setAlt(WhoWeAreData.alt || "");
        setImage(WhoWeAreData.image[0] || "");

        console.log(WhoWeAreData);
      } catch (error) {
        console.error("Error fetching who we are data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWhoWeAre();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (errorMessage) {
          toast.error(errorMessage);
          return;
        }
    

    setIsSubmitting(true);
    setErrorMessage("");

    const formDataToSend = new FormData();

    formDataToSend.append("title1", title1 || "");
    formDataToSend.append("title2", title2 || "");
    formDataToSend.append("subtitle", subtitle || "");
    formDataToSend.append("content", content || "");

    formDataToSend.append("image", image.file);
    formDataToSend.append("alt", alt || "");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.patch(
        `${apiUrl}/api/who-we-are`,
        formDataToSend,

        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/who-we-are");
      }, 1000);
      toast.success("Who We Are content updated successfully!");
      
    } catch (error) {
      console.error("Error updating who we are data:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update Who We Are content");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Who We Are</h2>
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
                  value={title1}
                  required
                  onChange={(e) => setTitle1(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title2</label>
                <input
                  type="text"
                  name="title2"
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={subtitle}
                  required
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={alt}
                  required
                  onChange={(e) => setAlt(e.target.value)}
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
                    setImage({
                      ...image,
                      file: e.target.files[0],
                    })
                  }}
                />
                {image.filepath && (
                  <img
                    className="form-profile"
                    src={`${image.filepath}`}
                    alt={`${alt}`}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>

                 <CKEditor
                   editor={ClassicEditor}
                   data={content}
                   required
                   onChange={(event, editor) => {
                                                      const data = editor.getData();
                                                      setContent(data);
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
    </Layout>
  );
};

export default WhoWeAre;

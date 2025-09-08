import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const SeatingAbout = () => {
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
    const fetchSeatingAbout = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/seating-about`);
        const SeatingAboutData = response.data.seatingAbout[0];

        setTitle1(SeatingAboutData.title1 || "");
        setTitle2(SeatingAboutData.title2 || "");
        setSubtitle(SeatingAboutData.subtitle || "");
        setContent(SeatingAboutData.content || "");
        setAlt(SeatingAboutData.alt || "");
        setImage(SeatingAboutData.image[0] || "");

        console.log(SeatingAboutData);
      } catch (error) {
        console.error("Error fetching seating about data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeatingAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
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
        `${apiUrl}/api/seating-about`,
        formDataToSend,

        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/seating-about");
      }, 1000);
    } catch (error) {
      console.error("Error updating seating About data:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Seating Components About</h2>
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
                <label>Image</label>

                <input
                  type="file"
                  name="image"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setImage({
                      ...image,
                      file: e.target.files[0],
                    })
                  }
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
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>

                 <CKEditor
                   editor={ClassicEditor}
                   data={content}
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

export default SeatingAbout;

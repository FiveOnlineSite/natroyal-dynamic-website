import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const Plank = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blackTitle, setBlackTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [brochure, setBrochure] = useState({ file: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPlank = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/planks`);
        const PlankData = response.data.plank;

        setYellowTitle(PlankData.yellow_title || "");
        setBlackTitle(PlankData.black_title || "");
        setSubtitle(PlankData.subtitle || "");
        setBrochure(PlankData.brochure || {});

        console.log("Fetched content:", PlankData);
      } catch (error) {
        console.error("Error fetching Plank:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlank();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const formData = new FormData();
      formData.append("yellow_title", yellowTitle);
      formData.append("black_title", blackTitle);
      formData.append("subtitle", subtitle);

      // Only append brochure if a new file is selected
      if (brochure?.file) {
        formData.append("brochure", brochure.file);
      }

      await axios.patch(`${apiUrl}/api/planks`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/planks");
      }, 1000);
    } catch (error) {
      console.error("Error updating Plank:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Plank</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Yellow Title</label>
                <input
                  type="text"
                  name="yellow_title"
                  value={yellowTitle}
                  onChange={(e) => setYellowTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Black Title</label>

                <input
                  type="text"
                  name="black_title"
                  value={blackTitle}
                  onChange={(e) => setBlackTitle(e.target.value)}
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
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Brochure</label>
                <input
                  type="file"
                  name="brochure"
                  accept=".pdf"
                  onChange={(e) =>
                    setBrochure({
                      ...brochure,
                      file: e.target.files[0],
                    })
                  }
                />

                {brochure?.length > 0 && (
                  //   <a
                  //     href={`${
                  //       process.env.REACT_APP_API_URL
                  //     }/${brochure[0].filepath.replace(/\\/g, "/")}`}
                  //     target="_blank"
                  //     rel="noopener noreferrer"
                  //     className="d-block mt-2"
                  //   >
                  //     {brochure[0].filename}
                  //   </a>

                  <a
                    href={`${
                      process.env.REACT_APP_API_URL
                    }/${brochure[0].filepath.replace(/\\/g, "/")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 View PDF - {`${brochure[0].filename}`}
                  </a>
                )}
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

export default Plank;

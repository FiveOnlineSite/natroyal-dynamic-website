import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/AdminLayout";

const Buttons = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [technicalSpecification, setTechnicalSpecification] = useState({
    file: "",
  });
  const [installationMaintenance, setInstallationMaintenance] = useState("");
  const [brochure, setBrochure] = useState({ file: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchButtons = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/button`);
        const buttonData = response.data.button;

        setTechnicalSpecification(buttonData.technical_specification || "");
        setInstallationMaintenance(buttonData.installation_maintenance || "");
        setBrochure(buttonData.brochure || "");

        console.log(buttonData);
        console.log("Fetched content:", buttonData.content);
      } catch (error) {
        console.error("Error fetching about:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchButtons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const formDataToSend = new FormData();

    formDataToSend.append(
      "technical_specification",
      technicalSpecification.file
    );
    formDataToSend.append(
      "installation_maintenance",
      installationMaintenance || ""
    );
    if (brochure?.file) {
      formDataToSend.append("brochure", brochure.file);
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.patch(
        `${apiUrl}/api/button`,
        formDataToSend,

        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/buttons");
      }, 1000);
    } catch (error) {
      console.error("Error updating button data:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Vinyl Buttons</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Technical Specification</label>
                <input
                  type="file"
                  name="technical_specification"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setTechnicalSpecification({
                      ...technicalSpecification,
                      file: e.target.files[0],
                    })
                  }
                />
                {technicalSpecification.filepath && (
                  <img
                    className="form-profile"
                    src={`${technicalSpecification.filepath.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Profile"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Installation Maintenance</label>

                <input
                  type="text"
                  name="installation_maintenance"
                  value={installationMaintenance}
                  onChange={(e) => setInstallationMaintenance(e.target.value)}
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

                {brochure?.filepath && (
                  <a
                    href={`${process.env.REACT_APP_API_URL}/${brochure[0].filepath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brochure[0].filename}
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

export default Buttons;

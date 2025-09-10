import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/AdminLayout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const Buttons = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [technicalSpecification, setTechnicalSpecification] = useState({
  file: "",
  filepath: "",
});
const [brochure, setBrochure] = useState({
  file: "",
  filepath: "",
  filename: "",
});
  const [installationMaintenance, setInstallationMaintenance] = useState("");
  

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  const fetchButtons = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/button`);
      const buttonData = response.data.button;

      // API already returns objects, not arrays
      setTechnicalSpecification(
        buttonData.technical_specification || { file: "", filepath: "", filename: "" }
      );
      setBrochure(
        buttonData.brochure || { file: "", filepath: "", filename: "" }
      );

      setInstallationMaintenance(buttonData.installation_maintenance || "");
    } catch (error) {
      console.error("Error fetching button data:", error);
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

              toast.success("Button content updated successfully!");

    } catch (error) {
      console.error("Error updating button data:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");

              toast.success("Failed to update button content");

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
                {technicalSpecification?.filepath && (
  <img
    className="form-profile"
    src={technicalSpecification.filepath.replace(/\\/g, "/")}
    alt={technicalSpecification.filename || "Technical Specification"}
    loading="lazy"
  />
)}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="theme-form">
                            <label>Installation Maintenance</label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={installationMaintenance}
                              onChange={(event, editor) => {
                                                                  const data = editor.getData();
                                                                  setInstallationMaintenance(data);
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
    href={
      brochure.filepath.startsWith("http")
        ? brochure.filepath.replace(/\\/g, "/")
        : `${process.env.REACT_APP_API_URL}/${brochure.filepath.replace(/\\/g, "/")}`
    }
    target="_blank"
    rel="noopener noreferrer"
  >
    {brochure.filename}
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

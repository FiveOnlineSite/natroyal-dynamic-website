import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const EditTags = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [tag, setTag] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
  tag: "",
    textile: "",
  });

  const [textiles, setTextiles] = useState([]);

  useEffect(() => {
    const fetchtextiles = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/textiles`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setTextiles(response.data.textiles || []);
      } catch (error) {
        console.error("Error fetching textiles:", error);
      }
    };
    fetchtextiles();
  }, []);

  useEffect(() => {
    const fetchtag = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/tags/${id}`
        );
        const tagData = response.data.tag;
        setTag(tagData);

        console.log("tag data", tagData);

        setFormData({
          tag: tagData.tag,
          textile: tagData.textile?._id || "",
        });
      } catch (error) {
        console.error("Error fetching tag:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchtag();
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
        `${apiUrl}/api/tags/${id}`,
        {
          tag: formData.tag,
          textile: formData.textile,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/tags");
      }, 1000);
    } catch (error) {
      console.error("Error updating tag:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit tag</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Textile</label>
                <select
                  required
                  name="textile"
                  value={formData.textile}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option selected disabled value="">
                    Select textile
                  </option>
                  {textiles &&
                    textiles.map((textile) => (
                      <option key={textile._id} value={textile._id}>
                        {textile.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="theme-form">
                <label>Tag</label>
                <input
                  type="text"
                  required
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
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

export default EditTags;

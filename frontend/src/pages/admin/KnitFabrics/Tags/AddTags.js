import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AddTags = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [textiles, setTextiles] = useState([]);
  const [textile, setTextile] = useState("");
  const [tag, setTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  const fetchtextiles = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const res = await axios.get(`${apiUrl}/api/textiles`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      // use "textiles" not "textile"
      setTextiles(res.data.textiles || []); 
      console.log("titles", (res.data.textiles || []).map((t) => t.title));
    } catch (error) {
      console.error("Error fetching textiles:", error);
    }
  };
  fetchtextiles();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.post(
        `${apiUrl}/api/tags`,
        {
          textile,
          tag: tag,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      setTimeout(() => {
        navigate("/admin/tags");
      }, 1000);
    } catch (error) {
      console.error("Error adding tag:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add tag </h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* textile Dropdown */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Textile</label>
                <select
                  required
                  value={textile}
                  onChange={(e) => setTextile(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">
                    Select textile
                  </option>
                  {textiles.map((textile) => (
                    <option key={textile._id} value={textile._id}>
                      {textile.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Yellow Title */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Tag</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
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

export default AddTags;

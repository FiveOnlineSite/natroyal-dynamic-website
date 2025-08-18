import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const VinylProduct = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blackTitle, setBlackTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedApplications, setSelectedApplications] = useState({});

  const [vinylApplication, setVinylApplication] = useState([]);
  const [product, setProduct] = useState([
    { name: "", image: null, alt: "", link: "", applications: [] },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVinylApp = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-application`);
        const vinylApplication = response.data.vinylApp;
        setVinylApplication(vinylApplication);
      } catch (error) {
        console.error("Error fetching vinyl application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylApp();
  }, []);

  useEffect(() => {
    const fetchVinylProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product`);
        const VinylProductData = response.data.VinylProduct[0];

        setYellowTitle(VinylProductData.yellow_title || "");
        setBlackTitle(VinylProductData.black_title || "");
        setContent(VinylProductData.content || "");

        const products = (VinylProductData.product || []).map((pro) => ({
          ...pro,
          _id: pro._id?.toString() || "",
          name: pro.name || "",
          alt: pro.alt || "",
          image: pro.image || null,
          link: pro.link || "",
          applications: pro.applications || "",
          application_name: pro.application_name || ""
        }));
        setProduct(products);

        const selectedApps = {};
        products.forEach((pro) => {
          if (pro.applications) {
            selectedApps[pro._id] = pro.applications.toString();
          }
        });
        setSelectedApplications(selectedApps);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProduct();
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiUrl}/api/vinyl-product`);
      const data = res.data;

      setVinylApplication(data.vinylApplications); // full app list
      setProduct(data.VinylProduct[0]?.product || []);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
}, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const titleForm = new FormData();
      titleForm.append("yellow_title", yellowTitle);
      titleForm.append("black_title", blackTitle);
      titleForm.append("content", content);

      await axios.patch(`${apiUrl}/api/vinyl-product`, titleForm, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      for (const pro of product) {
        const formData = new FormData();

        if (pro.image instanceof File) formData.append("image", pro.image);

        const productObj = {
          _id: pro._id,
          name: pro.name || "",
          alt: pro.alt || "",
          link: pro.link || "",
          applications: Array.isArray(pro.applications) ? pro.applications : [],
        };

        formData.append("product", JSON.stringify([productObj]));

        await axios.patch(`${apiUrl}/api/vinyl-product`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setTimeout(() => navigate("/admin/vinyl-products"), 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/vinyl-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const updatedpros = product.filter((item) => item._id !== productId);
      setProduct(updatedpros);

      setSelectedApplications((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  };

   const handleDeleteProductApplication = async (applicationId) => {
     const confirmDelete = window.confirm(
       "Are you sure you want to delete this product application?"
     );
     if (!confirmDelete) return;

     try {
       const access_token = localStorage.getItem("access_token");
       const apiUrl = process.env.REACT_APP_API_URL;

       await axios.delete(`${apiUrl}/api/vinyl-product/${applicationId}`, {
         headers: {
           Authorization: `Bearer ${access_token}`,
         },
       });

       const updatedpros = product.filter((item) => item._id !== applicationId);
       setProduct(updatedpros);

       setSelectedApplications((prev) => {
         const copy = { ...prev };
         delete copy[applicationId];
         return copy;
       });
     } catch (error) {
       console.error("Error deleting product application:", error);
       setErrorMessage(
         error.response?.data?.message ||
           "Failed to delete product application"
       );
     }
   };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Vinyl Products</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <div className="theme-form">
                <label>Yellow Title</label>
                <input
                  type="text"
                  required
                  value={yellowTitle}
                  onChange={(e) => setYellowTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="theme-form">
                <label>Black Title</label>
                <input
                  type="text"
                  value={blackTitle}
                  onChange={(e) => setBlackTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>
                <Editor
                  apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                  value={content}
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: ["link", "lists", "code", "casechange"],
                    toolbar:
                      "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                    content_style: `
                      body {
                        font-family: 'Jost', sans-serif;
                        color: #6d7175;
                      }
                    `,
                  }}
                  onEditorChange={(content) => setContent(content)}
                />
              </div>
            </div>

            {product.map((item, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Name</label>
                      <input
                        type="text"
                        value={item.name}
                        required
                        onChange={(e) => {
                          const updated = [...product];
                          updated[index].name = e.target.value;
                          setProduct(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Alt</label>
                      <input
                        type="text"
                        value={item.alt}
                        required
                        onChange={(e) => {
                          const updated = [...product];
                          updated[index].alt = e.target.value;
                          setProduct(updated);
                        }}
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Application</label>
                      <select
                        value={selectedApplications[item._id] || ""}
                        required
                        onChange={(e) =>
                          setSelectedApplications((prev) => ({
                            ...prev,
                            [item._id]: e.target.value,
                          }))
                        }
                      >
                        <option value="" selected disabled>
                          Select an Application
                        </option>
                        {flattenedApplications.map((app) => (
                          <option key={app._id} value={app._id}>
                            {app.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Image</label>
                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 10 * 1024 * 1024) {
                            setErrorMessage(
                              "Image too large. Max size is 10MB."
                            );
                            return;
                          }
                          const updated = [...product];
                          updated[index].image = file;
                          setProduct(updated);
                        }}
                      />
                      {Array.isArray(item.image) &&
                        !(item.image instanceof File) &&
                        item.image[0]?.filepath && (
                          <img
                            src={item.image[0].filepath}
                            alt={item.alt || ""}
                            className="form-profile mt-2"
                          />
                        )}
                    </div>
                  </div>
                </div>

                <div className="suitable-applications theme-form">
                  <label>Applications</label>
                  <div className="row">
                    {vinylApplication.flatMap((vApp) =>
                      vApp.application.map((app) => (
                        <div key={app._id} className="col-lg-3">
                          {/* <input
                            type="checkbox"
                            id={`app-${index}-${app._id}`}
                            checked={product[index].applications?.includes(
                              app._id
                            )}
                            onChange={() => {
                              const updated = [...product];
                              const apps = Array.isArray(
                                updated[index].applications
                              )
                                ? updated[index].applications
                                : [];
                              if (apps.includes(app._id)) {
                                updated[index].applications = apps.filter(
                                  (id) => id !== app._id
                                );
                              } else {
                                updated[index].applications = [
                                  ...apps,
                                  app._id,
                                ];
                              }
                              setProduct(updated);
                            }}
                          /> */}
                          <input
                            type="checkbox"
                            checked={item.applications?.includes(app._id)}
                            onChange={() => {
                              setProduct((prev) =>
                                prev.map((p, i) => {
                                  if (i !== index) return p;
                                  const apps = Array.isArray(p.applications)
                                    ? p.applications
                                    : [];
                                  return {
                                    ...p,
                                    applications: apps.includes(app._id)
                                      ? apps.filter((id) => id !== app._id) // remove
                                      : [...apps, app._id], // add
                                  };
                                }));
                            }}
                          />

                          <label htmlFor={`app-${index}-${app._id}`}>
                            {app.name}
                          </label>
                        </div>
                      )))}
                  </div>
                </div>

                {item._id ? (
                  <button
                    type="button"
                    className="btn m-2 delete-btn"
                    onClick={() => handleDeleteProduct(item._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn remove-btn m-2"
                    onClick={() => {
                      const updated = [...product];
                      updated.splice(index, 1);
                      setProduct(updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            <div className="col-lg-6 d-flex align-items-center">
              <div className="theme-form">
                <button
                  type="button"
                  onClick={() =>
                    setProduct([
                      ...product,
                      {
                        name: "",
                        image: null,
                        alt: "",
                        link: "",
                        application_id: "",
                      },
                    ])
                  }
                >
                  + Add New product
                </button>
              </div>

              <div className="theme-form ms-3">
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

export default VinylProduct;

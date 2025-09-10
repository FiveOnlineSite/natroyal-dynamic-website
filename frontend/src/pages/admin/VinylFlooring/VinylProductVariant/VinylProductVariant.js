import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";
import { toast } from "react-toastify";

const VinylProductVariant = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [VinylProductVariant, setVinylProductVariant] = useState([]);
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVinylProductVariant = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product-variant`);
        const VinylProductVariantData = response.data.VinylProductVariants;

        setVinylProductVariant(VinylProductVariantData);
        console.log("Fetched name:", VinylProductVariantData.name);
     } catch (error) {
        console.error("Error fetching variant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProductVariant();
  }, []);


  const handleDeleteApplication = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${name}" product variant?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(`${apiUrl}/api/vinyl-product-variant/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setVinylProductVariant(null)
console.log(response.data);
       setVinylProductVariant(
        VinylProductVariant.filter((VinylProductVariant) => VinylProductVariant._id !== id)
      );
       setTimeout(() => {
        navigate("/admin/vinyl-product-variants");
      }, 3000);

              toast.success("Vinyl flooring product variant deleted successfully!");

    } catch (error) {
      console.error("Error deleting product variant:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete product variant"
      );
              toast.error("Failed to delete vinyl flooring product variant");

    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Vinyl Product Variants
          <NavLink to="/admin/add/vinyl-product-variants" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Vinyl Product variants
          </NavLink>
        </h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table id="example" className="table nowrap">
                <thead>
                  <tr>
                     <th>Product</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {VinylProductVariant &&
                    VinylProductVariant.map((variant) => (
                      <tr key={variant._id}>
                          <td> {variant.product.name}</td>
                        <td className="text-center">{variant.name}</td>

                        <td className="text-center">
                          {variant.image[0]?.filepath && (
                            <img
                              src={variant.image[0]?.filepath}
                              alt={variant.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {variant.alt}</td>
                         <td className="text-center">
                          <Link
                            to={`/admin/edit/vinyl-product-variants/${variant._id}`}
                            title="Edit"
                          >
                            
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteApplication(variant._id, variant.application.name)
                            }
                          >
                            <i className="las la-trash"></i>{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VinylProductVariant;


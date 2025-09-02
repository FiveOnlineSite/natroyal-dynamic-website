import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";

const VinylProduct = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [VinylProduct, setVinylProduct] = useState([]);
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVinylProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product`);
        const VinylProductData = response.data.vinylProducts;

        setVinylProduct(VinylProductData);
        console.log("Fetched name:", VinylProductData.name);
     } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProduct();
  }, []);



  const handleDeleteApplication = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${name}" product?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(`${apiUrl}/api/vinyl-product/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setVinylProduct(null)
console.log(response.data);
       setVinylProduct(
        VinylProduct.filter((VinylProduct) => VinylProduct._id !== id)
      );
       setTimeout(() => {
        navigate("/admin/vinyl-products");
      }, 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Vinyl products
          <NavLink to="/admin/add/vinyl-products" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Vinyl product
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
                     <th>Applications</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {VinylProduct &&
                    VinylProduct.map((product) => (
                      <tr key={product._id}>
                          <td> {product.applications.map((app) => (
                          <div key={app._id}>{app.name}</div>
                        ))}</td>
                        <td className="text-center">{product.name}</td>

                        <td className="text-center">
                          {product.image[0]?.filepath && (
                            <img
                              src={product.image[0]?.filepath}
                              alt={product.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {product.alt}</td>
                         <td className="text-center">
                          <Link
                            to={`/admin/edit/vinyl-products/${product._id}`}
                            title="Edit"
                          >
                            
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteApplication(product._id, product.application.name)
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

export default VinylProduct;


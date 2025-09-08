import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../../components/AdminLayout";

const CoatedProduct = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [CoatedProduct, setCoatedProduct] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCoatedProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/coated-product`);
        const CoatedProductData = response.data.coatedProducts;

        setCoatedProduct(CoatedProductData);
     CoatedProductData.forEach((p, i) => {
  console.log(
    `Product ${i + 1} brochure:`,
    p.brochure?.[0]?.filepath || "No brochure"
  );
});
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoatedProduct();
  }, []);

  const handleDeleteProduct = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${name}" product?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/coated-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setCoatedProduct(null);
      console.log(response.data);
      setCoatedProduct(
        CoatedProduct.filter((CoatedProduct) => CoatedProduct._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/coated-products");
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
          coated products
          <NavLink to="/admin/add/coated-products" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add coated product
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
                    <th className="text-center">Content</th>
                    <th className="text-center">Button</th>
                    <th className="text-center">Brochure</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {CoatedProduct &&
                    CoatedProduct.map((product) => (
                      <tr key={product._id}>
                        <td>{product.application.name}</td>
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
                        <td className="text-center"> {product.content}</td>
                        <td className="text-center"> {product.button}</td>

                       <td className="text-center">
                        {product.brochure?.filepath && product.brochure.filepath.trim() !== "" ? (
                          <a
                            href={`${product.brochure.filepath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            📄 View PDF - {product.brochure.filename}
                          </a>
                        ) : (
                          <span>No brochure</span>
                        )}
                      </td>


                        <td className="text-center">
                          <Link
                            to={`/admin/edit/coated-products/${product._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteProduct(
                                product._id,
                                product.application.name
                              )
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

export default CoatedProduct;

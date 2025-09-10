import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlankCategory = () => {
  const [plankCategory, setPlankCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlankCategory = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "plank-category",
        });

        setPlankCategory(response.data.plankCategories);
        console.log("category", response.data.plankCategories);
      } catch (error) {
        console.error("Error fetching plank category:", error);
      }
    };

    fetchPlankCategory();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}" plank category ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `plank-category/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setPlankCategory(null);
      console.log(response.data);
      setPlankCategory(
        plankCategory.filter((plankCategory) => plankCategory._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/plank-category");
      }, 3000);
      toast.success("Plank category deleted successfully!");

    } catch (error) {
      console.error("Error deleting plank category:", error);
      toast.error("Failed to delete plank category");
      
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Plank Category
          <NavLink to="/admin/add/plank-category" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Plank Category
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
                    <th>Title</th>
                    <th className="text-center">Size</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {plankCategory &&
                    plankCategory.map((category) => (
                      <tr key={category._id}>
                        <td>{category.title}</td>
                        <td className="text-center">{category.size}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/plank-category/${category._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(category._id, category.title)
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

export default PlankCategory;

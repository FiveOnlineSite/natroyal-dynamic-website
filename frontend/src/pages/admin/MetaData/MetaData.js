import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MetaData = () => {
  const [MetaData, setMetaData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "meta-data",
        });
        console.log(response.data.metaData);
        setMetaData(response.data.metaData);
      } catch (error) {
        console.error("Error fetching Meta data:", error);
      }
    };

    fetchMetaData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `meta-data/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setMetaData(null); // Update user state to null after deletion
      // setTimeout(() => {
      //   navigate("/admin/FactsheetPresentation");
      // }, 2000);
      console.log(response.data);
      setMetaData(MetaData.filter((MetaData) => MetaData._id !== id));
      setTimeout(() => {
        navigate("/admin/meta-data");
      }, 3000);

              toast.success("Meta data deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting Meta data:", error);
              toast.error("Failed to delete meta data");
      
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          MetaData
          <NavLink to="/admin/add/meta-data" className="theme-cta">
            <i class="las la-plus-circle"></i>
            Add Meta Data
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
                    <th>Page</th>
                    <th className="text-center">Meta Title</th>
                    <th className="text-center">Meta Description</th>
                    <th className="text-center">Meta Keyword</th>
                    <th className="text-center">Edit</th>
                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {MetaData &&
                    MetaData.map((MetaData) => (
                      <tr key={MetaData._id}>
                        <td>{MetaData.page}</td>
                        <td className="text-center">{MetaData.metaTitle}</td>

                        <td className="text-center">
                          {MetaData.metaDescription}
                        </td>
                        <td className="text-center">{MetaData.metaKeyword}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/edit/meta-data/${MetaData._id}`}
                            title="Edit"
                          >
                            <i class="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        {/* <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(MetaData._id)}
                          >
                            <i class="las la-trash"></i>{" "}
                          </button>
                        </td> */}
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

export default MetaData;

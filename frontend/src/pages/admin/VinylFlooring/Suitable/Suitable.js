import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Suitable = () => {
  const [suitable, setSuitable] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuitable = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "suitable",
        });

        setSuitable(response.data.suitables);
        console.log(response.data.suitables);
        // console.log(response.data.news);
        console.log("suitable", response.data.suitables);
        // setSuitable(response.data.Suitable);
      } catch (error) {
        console.error("Error fetching suitable:", error);
      }
    };

    fetchSuitable();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}" suitable ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `suitable/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setSuitable(null); // Update user state to null after deletion
      // setTimeout(() => {
      //   navigate("/admin/FactsheetPresentation");
      // }, 2000);
      console.log(response.data);
      setSuitable(
        suitable.filter((Suitable) => Suitable._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/suitable");
      }, 3000);

              toast.success("Suitable deleted successfully!");

    } catch (error) {
      console.error("Error deleting suitable:", error);
              toast.success("Failed to delete suitable");

    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Suitable
          <NavLink to="/admin/add/suitable" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Suitable
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
                    <th>Application</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {suitable &&
                    suitable.map((Suitable) => (
                      <tr key={Suitable._id}>
                        <td>{Suitable.application.name}</td>
                       

                        <td className="text-center">
                          {Suitable.image[0]?.filepath && (
                            <img
                              src={Suitable.image[0]?.filepath}
                              alt={Suitable.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Suitable.alt}</td>
                         <td className="text-center">
                          <Link
                            to={`/admin/edit/suitable/${Suitable._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(Suitable._id, Suitable.name)
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

export default Suitable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../components/AdminLayout";
import { toast } from "react-toastify";

const Client = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Client, setClient] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/clients`);
        const ClientData = response.data.clients;

        setClient(ClientData);
       
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, []);

  const handleDeleteclientlication = async (id) => {
    const confirmDelete = window.confirm(
      "  Are you sure you want to delete this client?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/clients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setClient((prev) => prev.filter((client) => client._id !== id));
      setTimeout(() => {
        navigate("/admin/clients");
      }, 3000);
      toast.success("Client deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting clients:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete clients"
      );
      toast.error("Failed to delete client");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          clients
          <NavLink to="/admin/add/clients" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add clients
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
                    <th>Logo</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Client &&
                    Client.map((client) => (
                      <tr key={client._id}>

                        <td>
                          {client.logo[0]?.filepath && (
                            <img
                              src={client.logo[0]?.filepath}
                              alt={client.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {client.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/clients/${client._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteclientlication(client._id)
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

export default Client;

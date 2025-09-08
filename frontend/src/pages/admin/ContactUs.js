import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-bootstrap";

const Contact = () => {
  const [contact, setContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
          const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "contact",
          headers: {
          Authorization: `Bearer ${access_token}`,
        },
        });

        const contactData = response.data.contacts;

        const sortedContact = [...contactData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setContact(sortedContact);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, []);

  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `contact/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setContact((prev) => prev.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const filteredContacts = contact.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="pages-headers">
        <div className="row align-items-center justify-content-center">
            <h2>Contact Us</h2>
        </div>
      </div>

      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table className="table nowrap">
                <thead>
                  <tr>
                    <th>Page</th>

                    <th className="text-center">Name</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Message</th>
                    <th className="text-center">Date & Time</th>

                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>{contact.page}</td>
                        <td className="text-center">{contact.name}</td>
                        <td className="text-center">{contact.email}</td>
                        <td className="text-center">{contact.phone}</td>
                        <td className="text-center">{contact.message}</td>
                        <td className="text-center">
                          {new Date(contact.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              timeZone: "Asia/Kolkata",
                            }
                          )}{" "}
                          at{" "}
                          {new Date(contact.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "Asia/Kolkata",
                            }
                          )}
                        </td>
                        {/* <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(contact._id)}
                          >
                            <i className="las la-trash"></i>
                          </button>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No contact data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Contact;

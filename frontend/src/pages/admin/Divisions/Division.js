import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../components/AdminLayout";
import { toast } from "react-toastify";

const Division = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Division, setDivision] = useState("");
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/division`);
        const DivisionData = response.data.divisions;

        setDivision(DivisionData);
       } catch (error) {
        console.error("Error fetching division:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDivision();
  }, []);

  const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this division?");
      if (!confirmDelete) return;
  
      try {
        const access_token = localStorage.getItem("access_token");
        const apiUrl = process.env.REACT_APP_API_URL;
  
        const response = await axios.delete(
          `${apiUrl}/api/division/${id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setDivision(null);
        console.log(response.data);
        setDivision(
          Division.filter((Division) => Division._id !== id)
        );
        setTimeout(() => {
          navigate("/admin/division");
        }, 3000);
  
        toast.success("Division deleted successfully!");
        
      } catch (error) {
        console.error("Error deleting division:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to delete division"
        );
  
        toast.error("Failed to delete division");
        
      }
    };


  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
        Division
          <NavLink to="/admin/add/division" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Division
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
                    <th>Title1</th>
                    <th>Title2</th>

                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                     <th className="text-center">Logo</th>
                    <th className="text-center">Logo Alt</th>
                     <th className="text-center">Button</th>
                     <th className="text-center">Button Url</th>

                    
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Division &&
                    Division.map((Division) => (
                      <tr key={Division._id}>
                        <td>{Division.title1}</td>
                        <td>{Division.title2}</td>

                       

                        <td className="text-center">
                          {Division.image[0]?.filepath && (
                            <img
                              src={Division.image[0]?.filepath}
                              alt={Division.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Division.alt}</td>
                        <td className="text-center">
                          {Division.logo[0]?.filepath && (
                            <img
                              src={Division.logo[0]?.filepath}
                              alt={Division.logo_alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Division.logo_alt}</td>
                         <td className="text-center"> {Division.button}</td>

                         <td className="text-center"> {Division.button_url}</td>

                         <td className="text-center">
                          <Link
                            to={`/admin/edit/division/${Division._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(Division._id)
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

export default Division;


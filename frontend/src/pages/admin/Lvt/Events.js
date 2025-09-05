import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const Events = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [title1, setTitle1] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title2, setTitle2] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [events, setEvents] = useState([
    { youtube_url: "", youtube_thumbnail: null, alt: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/events`);
        const EventsData = response.data.events[0];

        setTitle1(EventsData.title1 || "");
        setTitle2(EventsData.title2 || "");
        setSubtitle(EventsData.subtitle || "");
        setEvents(EventsData.event || []);

        console.log("Fetched alt:", EventsData.event[0]?.alt);
        console.log("Fetched Events:", EventsData.event);
      } catch (error) {
        console.error("Error fetching Events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const hasThumbnailErrors = events.some((event) => {
      return !event._id && !(event.youtube_thumbnail instanceof File);
    });
    if (hasThumbnailErrors) {
      setErrorMessage("Please upload thumbnail images for new events.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("title1", title1);
      formData.append("title2", title2);
      formData.append("subtitle", subtitle);

      const eventArray = events.map((event, index) => {
        const thumbnailKey = `youtube_thumbnail_${index}`;

        // Only append if it's a new file (not already uploaded object)
        if (event.youtube_thumbnail instanceof File) {
          formData.append(thumbnailKey, event.youtube_thumbnail);
        }

        return {
          youtube_url: event.youtube_url,
          alt: event.alt,
          _id: event._id,
          thumbnail_key: thumbnailKey,
        };
      });

      formData.append("event", JSON.stringify(eventArray));

      await axios.patch(`${apiUrl}/api/events`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/events");
      }, 1000);
    } catch (error) {
      console.error("Error updating events:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Remove from local state
      const updatedEvents = events.filter((ev) => ev._id !== eventId);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete event"
      );
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Events</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title1</label>
                <input
                  type="text"
                  name="title1"
                  required
                  value={title1}
                  onChange={(e) => setTitle1(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title2</label>
                <input
                  type="text"
                  name="title2"
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={subtitle}
                  required
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>
            </div>

            {events.map((event, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>YouTube URL</label>
                      <input
                        type="text"
                        value={event.youtube_url}
                        required
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].youtube_url = e.target.value;
                          setEvents(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Alt Text</label>
                      <input
                        type="text"
                        value={event.alt}
                        required
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].alt = e.target.value;
                          setEvents(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Thumbnail Image</label>

                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 10 * 1024 * 1024) {
                            setErrorMessage(
                              "Thumbnail too large. Max size is 10MB."
                            );
                            return;
                          }

                          const updated = [...events];
                          updated[index].youtube_thumbnail = file;
                          setEvents(updated);
                        }}
                      />

                      {/* Show preview if filepath exists */}

                      {Array.isArray(event.youtube_thumbnail) &&
                        event.youtube_thumbnail[0]?.filepath && (
                          <img
                            src={event.youtube_thumbnail[0].filepath}
                            alt={event.alt || ""}
                            className="form-profile mt-2"
                          />
                        )}
                    </div>
                  </div>
                </div>

                {event._id ? (
                  <button
                    type="button"
                    className="btn m-2 delete-btn"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn remove-btn m-2"
                    onClick={() => {
                      const updated = [...events];
                      updated.splice(index, 1);
                      setEvents(updated);
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

            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div className="theme-form">
                <button
                  type="button"
                  onClick={() =>
                    setEvents([
                      ...events,
                      { youtube_url: "", youtube_thumbnail: null, alt: "" },
                    ])
                  }
                >
                  + Add New Event
                </button>
              </div>

              <div className="theme-form">
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

export default Events;

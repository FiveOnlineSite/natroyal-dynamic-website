import React, { useState } from "react";
import Slider from "react-slick";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

const VideosSlider = ({ settings, slides }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlay = (videoUrl) => {
     if (!videoUrl) return; 
    setSelectedVideo(videoUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

      const [event, setEvent] = useState("")
  
             useEffect(() => {
                const fetchEvents = async () => {
                  try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const response = await axios.get(`${apiUrl}/api/events`);
                    const EventsData = response.data.events[0].event;
            
                    setEvent(EventsData);
                  } catch (error) {
                    console.error("Error fetching Events:", error);
                  }
                };
            
                fetchEvents();
              }, []);

  return (
    <>
      <Slider {...settings}>
        {event && event.map((event) => (
          <div key={event._id} className="video-slide-container">
            <div className="poster-container video-container">
              {event?.youtube_thumbnail?.[0].filepath && (
               <img
                 src={event.youtube_thumbnail[0].filepath}
                 alt={event.alt}
                 className="thumbnail-img w-100"
               />
              )}

              <div className="button-div">
                <button
                  className="play-button-div"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(event.youtube_url);
                  }}
                >
                  <div className="button-outer-circle has-scale-animation"></div>
                  <div className="button-outer-circle has-scale-animation has-delay-short"></div>
                  <div className="play-button">
                    <img src="/images/icons/play (1).png" alt="play-icon" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Bootstrap Video Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="modal-body video-modal-body">
          {/* <button className="close-button" onClick={handleClose}>
            &times;
          </button> */}
          {selectedVideo && (
            <iframe
              width="560"
              height="400"
              src={`${selectedVideo}${
                selectedVideo.includes("?") ? "&" : "?"
              }rel=0`}
              className="video-modal w-100"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideosSlider;

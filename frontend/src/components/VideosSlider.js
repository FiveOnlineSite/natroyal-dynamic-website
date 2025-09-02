import React, { useState } from "react";
import Slider from "react-slick";
import { Modal } from "react-bootstrap";

const VideosSlider = ({ settings, slides }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlay = (videoUrl) => {
    // Convert YouTube link to embeddable format
    const videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0]; // Extract video ID
    const embedUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : videoUrl;

    setSelectedVideo(embedUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="video-slide-container">
            <div className="poster-container video-container">
              <img
                src={slide.thumbnail}
                alt="thumbnail"
                className="thumbnail-img w-100"
              />

              <div className="button-div">
                <button
                  className="play-button-div"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(slide.video);
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

// import React from "react";

// const FloatingWhatsapp = () => {
//   const phoneNumber = "+919081434036";

//   // Get current page URL
//   const currentUrl = window.location.href;

//   const message = `Hi! I have a query on this page: ${currentUrl}`;

//   return (
//     <div>
//       <a
//         href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//           message
//         )}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="whatsapp-icon"
//       >
//         <i className="fa-brands fa-whatsapp"></i>
//       </a>
//     </div>
//   );
// };

// export default FloatingWhatsapp;

import React from "react";

const FloatingWhatsapp = () => {
  const phoneNumber = "919081434036";

  const handleClick = () => {
    const currentUrl = window.location.href;
    const message = `Hi! I have a query on this page: ${currentUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div>
      <button onClick={handleClick} className="whatsapp-icon">
        <i className="fa-brands fa-whatsapp"></i>
      </button>
    </div>
  );
};

export default FloatingWhatsapp;

import React from "react";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";

const LandingLayout = ({ children }) => {
  return (
    <div>
      <LandingHeader />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;

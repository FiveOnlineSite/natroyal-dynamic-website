import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import SidebarAccordion from "./SidebarAccordion";

const AdminSidebar = () => {
  const { auth, setAuth } = useAuth();

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (key) => {
    setOpenAccordion((prev) => (prev === key ? prev : key));
  };

  // console.log("Auth:", auth);
  // console.log("User:", auth.user);
  // console.log("Access Token:", auth.access_token);
  // console.log("LocalStorage - auth:", localStorage.getItem("auth"));
  // console.log(
  //   "LocalStorage - access_token:",
  //   localStorage.getItem("access_token")
  // );

  const handleLogout = () => {
    setAuth({
      user: null,
      access_token: "",
    });
    localStorage.removeItem("access_token");
  };

  if (!auth) {
    // Handle case when auth is not defined
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="sidebar-brand">
        <NavLink to="/admin/dashboard">
          <img
            className="admin-logo"
            src="/images/icons/Natroyal-logo.jpg"
            alt="Logo"
            loading="lazy"
          />{" "}
          <span>Natroyal Group</span>
        </NavLink>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className="nav-link" title="Home">
              <span className="las la-home"></span> <span>Dashboard</span>
            </NavLink>
          </li>

          <SidebarAccordion
            title="Banners"
            iconClass="las la-home"
            isOpen={openAccordion === "banners"}
            toggleOpen={() => handleAccordionToggle("banners")}
            links={[
              {
                to: "/admin/home-banner",
                linkIcon: "las la-tasks",
                label: "Home banner",
              },
              {
                to: "/admin/landing-banner",
                linkIcon: "las la-home",
                label: "Landing banner",
              },
              {
                to: "/admin/banner",
                linkIcon: "las la-home",
                label: "Banner",
              },
            ]}
            l
          />

          <SidebarAccordion
            title="About"
            iconClass="las la-home"
            isOpen={openAccordion === "abouts"}
            toggleOpen={() => handleAccordionToggle("abouts")}
            links={[
              {
                to: "/admin/lvt-about",
                linkIcon: "las la-home",
                label: "Lvt About",
              },
              {
                to: "/admin/seating-about",
                linkIcon: "las la-home",
                label: "Seating components About",
              },
              {
                to: "/admin/knit-about",
                linkIcon: "las la-home",
                label: "Knit Fabrics About",
              },
              {
                to: "/admin/about",
                linkIcon: "las la-home",
                label: "About",
              },
            ]}
          />

          <SidebarAccordion
            title="LVT Flooring"
            iconClass="las la-home"
            isOpen={openAccordion === "lvt"}
            toggleOpen={() => handleAccordionToggle("lvt")}
            links={[
              {
                to: "/admin/events",
                linkIcon: "las la-home",
                label: "Events",
              },
              {
                to: "/admin/planks",
                linkIcon: "las la-home",
                label: "Planks Section",
              },
              {
                to: "/admin/plank-category",
                linkIcon: "las la-home",
                label: "Planks Category",
              },
              {
                to: "/admin/plank-slider",
                linkIcon: "las la-home",
                label: "Planks Slider",
              },
              {
                to: "/admin/who-we-are",
                linkIcon: "las la-home",
                label: "Who We Are",
              },
              {
                to: "/admin/what-we-offer",
                linkIcon: "las la-home",
                label: "What We Offer",
              },
              {
                to: "/admin/lvt-features",
                linkIcon: "las la-home",
                label: "Features",
              },
            ]}
          />

          <SidebarAccordion
            title="Vinyl Flooring"
            iconClass="las la-home"
            isOpen={openAccordion === "vinyl"}
            toggleOpen={() => handleAccordionToggle("vinyl")}
            links={[
              {
                to: "/admin/vinyl-applications",
                linkIcon: "las la-home",
                label: "Applications",
              },
              {
                to: "/admin/vinyl-application-content",
                linkIcon: "las la-home",
                label: "Application Contents",
              },

              {
                to: "/admin/vinyl-products",
                linkIcon: "las la-home",
                label: "Products",
              },

              {
                to: "/admin/vinyl-product-content",
                linkIcon: "las la-home",
                label: "Product Contents",
              },
              {
                to: "/admin/vinyl-product-variants",
                linkIcon: "las la-home",
                label: "Product Variants",
              },
              {
                to: "/admin/buttons",
                linkIcon: "las la-home",
                label: "Buttons",
              },
              {
                to: "/admin/suitable",
                linkIcon: "las la-home",
                label: "Suitable",
              },
            ]}
          />

          <SidebarAccordion
            title="Coated Fabrics"
            iconClass="las la-home"
            isOpen={openAccordion === "coated"}
            toggleOpen={() => handleAccordionToggle("coated")}
            links={[
              {
                to: "/admin/coated-applications",
                linkIcon: "las la-home",
                label: "Applications",
              },
              {
                to: "/admin/coated-application-content",
                linkIcon: "las la-home",
                label: "Application Content",
              },
              {
                to: "/admin/coated-products",
                linkIcon: "las la-home",
                label: "Products",
              },
              {
                to: "/admin/coated-features",
                linkIcon: "las la-home",
                label: "Features",
              },
            ]}
          />

          <SidebarAccordion
            title="Seating Components"
            iconClass="las la-home"
            isOpen={openAccordion === "seating"}
            toggleOpen={() => handleAccordionToggle("seating")}
            links={[
              {
                to: "/admin/seating-applications",
                linkIcon: "las la-home",
                label: "Applications",
              },
              {
                to: "/admin/seating-application-content",
                linkIcon: "las la-home",
                label: "Application Content",
              },
              {
                to: "/admin/seating-products",
                linkIcon: "las la-home",
                label: "Products",
              },
            ]}
          />

          <SidebarAccordion
            title="Knit Fabrics"
            iconClass="las la-home"
            isOpen={openAccordion === "knit"}
            toggleOpen={() => handleAccordionToggle("knit")}
            links={[
              {
                to: "/admin/textiles",
                linkIcon: "las la-home",
                label: "Textiles",
              },
              {
                to: "/admin/tags",
                linkIcon: "las la-home",
                label: "Tags",
              },
            ]}
          />

          <li>
            <NavLink to="/admin/meta-tag" title="Meta Tag">
              <span className="las la-cogs"></span> <span>Meta Tag</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/contact-us" title="Contact">
              <span className="las la-user-tie"></span> <span>Contact</span>
            </NavLink>
          </li>

          <li className="logout-menu" title="Logout">
            <NavLink to="/login" onClick={handleLogout}>
              <span className="las la-sign-out-alt"></span> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;

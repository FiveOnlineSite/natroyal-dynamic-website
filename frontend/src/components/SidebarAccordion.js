import { NavLink } from "react-router-dom";

const SidebarAccordion = ({
  title,
  iconClass,
  linkIcon,
  isOpen,
  toggleOpen,
  links,
}) => (
  <li className="sidebar-accordion">
    <button
      className="nav-link accordion-toggle d-flex align-items-center justify-content-start w-100"
      onClick={toggleOpen}
    >
      <span className={`${iconClass} me-2`}></span>
      <div className="d-flex align-items-center justify-content-between w-100 accordion-title px-2">
        <span>{title}</span>
        <i
          className={`lni ${isOpen ? "lni-chevron-up" : "lni-chevron-down"}`}
        ></i>
      </div>
    </button>

    {isOpen && (
      <ul className="submenu-dropdown">
        {links.map((link, idx) => (
          <li key={idx}>
            <NavLink
              to={link.to}
              className="nav-link d-flex align-items-center"
            >
              <span className={`${link.linkIcon} me-2`}></span>{" "}
              <h6>{link.label}</h6>
            </NavLink>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default SidebarAccordion;

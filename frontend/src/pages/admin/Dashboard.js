import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const DashBoard = () => {
  const [counts, setCounts] = useState({
    factsheetPresentation: "0",
    fundNumber: "0",
    company: "0",
    newsCategory: "0",
    news: "0",
    investorLetter: "0",
    team: "0",
    factsheetForm: "0",
    presentationForm: "0",
    contact: "0",
    metaTag: "0",
    industry: "0",
    newsletter: "0",
  });

  const apiEndpoints = [
    { key: "factsheetPresentation", url: "/api/factsheet-presentation" },
    { key: "fundNumber", url: "/api/fund-number" },
    { key: "industry", url: "/api/industry" },
    { key: "company", url: "/api/company-portfolio" },
    { key: "newsCategory", url: "/api/news-category" },
    { key: "news", url: "/api/news" },
    { key: "investorLetter", url: "/api/investor-letter" },
    { key: "team", url: "/api/team" },
    { key: "metaTag", url: "/api/meta-tag" },
    { key: "presentationForm", url: "/api/presentation-form" },
    { key: "factsheetForm", url: "/api/factsheet-form" },
    { key: "contact", url: "/api/contact" },
    { key: "newsletter", url: "/api/newsletter" },
  ];

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    console.log("apiurl", apiUrl);
    apiEndpoints.forEach(({ key, url }) => {
      axios
        .get(`${apiUrl}${url}`)
        .then((response) => {
          const count = response.data.count ?? "0";
          setCounts((prev) => ({ ...prev, [key]: count }));
        })
        .catch((error) => {
          console.error(`Error fetching ${key} count:`, error);
        });
    });
  }, []);

  const dashboardItems = [
    {
      to: "/admin/factsheet-presentation",
      title: "View Factsheet / Presentation",
      countKey: "factsheetPresentation",
      label: "Total Factsheet / Presentation",
    },
    {
      to: "/admin/fund-number",
      title: "View Fund Numbers",
      countKey: "fundNumber",
      label: "Total Fund Numbers",
    },
    {
      to: "/admin/company-portfolio",
      title: "View Company Industry",
      countKey: "industry",
      label: "Total Company Industry",
    },
    {
      to: "/admin/company-portfolio",
      title: "View Company Portfolio",
      countKey: "company",
      label: "Total Company Portfolio",
    },
    {
      to: "/admin/news-category",
      title: "View News Category",
      countKey: "newsCategory",
      label: "Total News Category",
    },
    {
      to: "/admin/news",
      title: "View News & More",
      countKey: "news",
      label: "Total News & More",
    },
    {
      to: "/admin/investor-letter",
      title: "View Investor Letter",
      countKey: "investorLetter",
      label: "Total Investor Letter",
    },
    {
      to: "/admin/team",
      title: "View Team Members",
      countKey: "team",
      label: "Total Team Members",
    },
    {
      to: "/admin/meta-tag",
      title: "View Meta Tags",
      countKey: "metaTag",
      label: "Total Meta Tags",
    },
    {
      to: "/admin/contact-us",
      title: "View Contacts",
      countKey: "contact",
      label: "Total Contacts",
    },
    {
      to: "/admin/newsletter",
      title: "View NewsLetter",
      countKey: "newsletter",
      label: "Total NewsLetters",
    },
    {
      to: "/admin/factsheet-form",
      title: "View Factsheet Form",
      countKey: "factsheetForm",
      label: "Total Factsheet Forms",
    },
    {
      to: "/admin/presentation-form",
      title: "View Presentation Form",
      countKey: "presentationForm",
      label: "Total Presentation Forms",
    },
  ];

  return (
    <AdminLayout>
      <div className="container">
        <div className="row">
          {/* {dashboardItems.map((item, index) => (
            <div className="col-md-3" key={index}>
              <NavLink to={item.to} title={item.title}>
                <div className="dashboardcard">
                  <h2>
                    {counts[item.countKey]}
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </span>
                  </h2>
                  <h6>{item.label}</h6>
                </div>
              </NavLink>
            </div>
          ))} */}

          <h2>Natroyal Admin Panel</h2>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashBoard;

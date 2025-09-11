import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu, IoIosSearch } from "react-icons/io";

import menuOptions from "./categories.json";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(inputValue)}`);
    }
    setInputValue("");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const linkStyle = {
    textDecoration: "none",
    color: "#6b6b6b",
    backgroundColor: "transparent",
  };

  return (
    <div className="header-container">
      <div className="header-top">
        <Link to="/home" className="logo">
          NewsBrief
        </Link>

        <div className="nav-toggle" ref={menuRef}>
          <IoIosMenu
            size={27}
            style={{ backgroundColor: "transparent" }}
            onClick={() => setOpenMenu((prev) => !prev)}
          />

          {openMenu && (
            <div className="menu-container">
              <form onSubmit={handleSearch}>
                <input
                  className="toggle-search"
                  type="search"
                  placeholder="Search News..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </form>
              {menuOptions.map((option) => (
                <Link key={option.name} to={option.link} style={linkStyle}>
                  {option.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch}>
            <input
              className="search-bar"
              type="search"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">
              <IoIosSearch
                style={{
                  marginLeft: "-3.6rem",
                  backgroundColor: "transparent",
                }}
              />
            </button>
          </form>
        </div>
      </div>

      <div className="navbar-section">
        {menuOptions.map((option) => (
          <Link key={option.name} to={option.link} className="navbar-link">
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

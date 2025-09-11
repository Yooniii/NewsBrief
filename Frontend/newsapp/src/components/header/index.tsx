import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  IoIosMenu, 
  IoIosSearch, 
  IoIosGlobe, 
  IoIosBusiness, 
  IoIosLaptop, 
  IoIosFilm, 
  IoIosFlag, 
  IoIosFootball, 
  IoIosFlask, 
  IoIosMedical,
  IoIosTrendingUp,
} from "react-icons/io";
import { GoChevronDown } from "react-icons/go";
import Logo from "../../../public/logo.png"

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

  // Function to get icon for each topic
  const getTopicIcon = (topicName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Top Stories": <IoIosTrendingUp style={{ color: "#667eea" }} />,
      "World": <IoIosGlobe style={{ color: "#48bb78" }} />,
      "Business": <IoIosBusiness style={{ color: "#ed8936" }} />,
      "Tech": <IoIosLaptop style={{ color: "#4299e1" }} />,
      "Entertainment": <IoIosFilm style={{ color: "#9f7aea" }} />,
      "Politics": <IoIosFlag style={{ color: "#f56565" }} />,
      "Sports": <IoIosFootball style={{ color: "#38b2ac" }} />,
      "Science": <IoIosFlask style={{ color: "#805ad5" }} />,
      "Health": <IoIosMedical style={{ color: "#e53e3e" }} />
    };
    return iconMap[topicName] || <IoIosTrendingUp style={{ color: "#667eea" }} />;
  };

  return (
    <div>
      <div className="header">
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
                  <span className="topic-icon">
                    {getTopicIcon(option.name)}
                  </span>
                  {option.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="right-section">
          <div className="dropdown">
            <a className="btn" data-bs-toggle="dropdown" aria-expanded="false">
              Topics
              <GoChevronDown style={{ marginLeft: '0.5rem', fontSize: '1rem' }} />
            </a>
            <ul className="dropdown-menu">
              {menuOptions.map((option) => (
                <li key={option.name}>
                  <Link to={option.link} style={linkStyle}>
                    <span className="topic-icon">
                      {getTopicIcon(option.name)}
                    </span>
                    {option.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
    </div>
  );
};

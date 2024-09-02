import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMenu, IoIosSearch } from "react-icons/io";
import './Header.css';

/**
 * Header component for the NewsBrief website.
 * Contains the logo, category dropdown, and search functionality.
 */
const Header = () => {
  // Manages the input value of the search bar.
  const [inputValue, setInputValue] = useState(''); 
  const [openMenu, setOpenMenu] = useState(false)

  // Ref to detect clicks outside the category dropdown.
  const navRef = useRef<HTMLDivElement>(null); 
  const navigate = useNavigate(); // React Router's nav hook.

  // Closes the menu dropdown if a click outside is detected.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu])

  /**
   * Handles form submission for the search bar. Navigates to the search
   * results page with the input query.
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (inputValue.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(inputValue)}`);
    }
    setInputValue('');
  };

  // Style object for the nav links.
  const linkStyle = {
    textDecoration: 'none',
    color: '#6b6b6b',
    backgroundColor: 'transparent'
  };

  return (
    <Fragment>
      <div className='header'> 
        <Link to="/home" className="logo">NewsBrief</Link>

        <div className='nav-toggle' onClick={() => setOpenMenu((prev) => !prev)}> 
          <IoIosMenu size={27} style={{backgroundColor: 'transparent'}}/>
        
          {openMenu && (
            <div className='menu-container' ref={navRef}>
              <form onSubmit={handleSearch}>
                <input 
                  className='toggle-search'
                  type='search'
                  placeholder='Search...'
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  onClick={(e) => e.stopPropagation()}
                />
              </form>

              <Link to="/home" style={linkStyle} className="link">Home</Link>
              <Link to='/Top Stories' style={linkStyle}>Top Stories</Link>
              <Link to='/World' style={linkStyle}>World</Link>
              <Link to='/Business' style={linkStyle}>Business</Link>
              <Link to='/Tech' style={linkStyle}>Tech</Link>
              <Link to='/Entertainment' style={linkStyle}>Entertainment</Link>
              <Link to='/Politics' style={linkStyle}>Politics</Link>
              <Link to='/Sports' style={linkStyle}>Sports</Link>
              <Link to='/Science' style={linkStyle}>Science</Link>
              <Link to='/Health' style={linkStyle}>Health</Link>
            </div>
          )}
        </div>

        <div className='right-section'>
          <Link to="/home" className="link">Home</Link>
          <div className="dropdown">
            <a className="btn" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </a>

            <ul className="dropdown-menu">
              <li><Link to='/Top Stories' style={linkStyle}>Top Stories</Link></li>
              <li><Link to='/World' style={linkStyle}>World</Link></li>
              <li><Link to='/Business' style={linkStyle}>Business</Link></li>
              <li> <Link to='/Tech' style={linkStyle}>Tech</Link></li>
              <li><Link to='/Entertainment' style={linkStyle}>Entertainment</Link></li>
              <li><Link to='/Politics' style={linkStyle}>Politics</Link></li>
              <li><Link to='/Sports' style={linkStyle}>Sports</Link></li>
              <li><Link to='/Science' style={linkStyle}>Science</Link></li>
              <li><Link to='/Health' style={linkStyle}>Health</Link></li>
            </ul>
          </div>
          
          <form onSubmit={handleSearch}>
            <input 
              className='search-bar'
              type='search'
              placeholder='Search...'
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
            />

            <button type='submit'>
              <IoIosSearch style={{
                marginLeft: '-3.6rem', backgroundColor: 'transparent'}}/>
            </button>
          </form>
        </div>
      </div>
    </Fragment>    
  );
}

export default Header;

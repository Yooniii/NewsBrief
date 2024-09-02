import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMenu, IoIosSearch } from "react-icons/io";

import './Header.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const [openMenu, setOpenMenu] = useState(false)

  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(false)
      }
      
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [openMenu])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (inputValue.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(inputValue)}`);
    }
    setInputValue('');
  };

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

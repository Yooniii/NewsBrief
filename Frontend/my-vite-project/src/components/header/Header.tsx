import React, { Fragment, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

import './Header.css';
import search from '../../assets/Search.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();


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
        <div className='right-section'>
          <Link to="/home" className="link">Home</Link>
          <div className="dropdown">
            <a className="btn" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </a>
            <ul className="dropdown-menu">
              <li> <Link to='/Top Stories' style={linkStyle}>Top Stories</Link></li>
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
              id='search-bar'
              className='search-bar'
              type='search'
              placeholder='Search...'
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
            />
            <button type='submit'>
              <img className='search-icon' src={search} alt='Search' />
            </button>
          </form>
        </div>
        
      </div>
    </Fragment>    
  );
}

export default Header;

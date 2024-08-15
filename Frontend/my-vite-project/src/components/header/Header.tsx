import React, { Fragment, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import './Header.css';
import search from '../../assets/Search.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    setSearchParams({ query: inputValue }); 
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
            <button className="btn" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </button>
            <ul className="dropdown-menu">
              <li> <Link to='/Top Stories' style={linkStyle}>Top Stories</Link></li>
              <li><Link to='/World' style={linkStyle}>World</Link></li>
              <li><Link to='/Business' style={linkStyle}>Business</Link></li>
              <li> <Link to='/Tech' style={linkStyle}>Tech</Link></li>
              <li><Link to='/Entertainment' style={linkStyle}>Entertainment</Link></li>
              <li><Link to='/Politics' style={linkStyle}>Politics</Link></li>
              <li><Link to='/Politics' style={linkStyle}>Sports</Link></li>
              <li><Link to='/Politics' style={linkStyle}>Science</Link></li>
              <li><Link to='/Politics' style={linkStyle}>Health</Link></li>
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

import React, { Fragment, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import './Header.css';
import search from '../../assets/Search.png';

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    setSearchParams({ query: inputValue }); 
    setInputValue('');
  };

  return (
    <Fragment>
      <div className='header'> 
        <Link to="/home" className="logo">NEWSBRIEF</Link>
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
    </Fragment>    
  );
}

export default Header;

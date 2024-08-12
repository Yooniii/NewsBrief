import './Header.css'
import search from '../../assets/Search.png'
import { Fragment, useState, FormEvent } from 'react'


interface HeaderProps {
  onQueryChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onQueryChange }) => {

  const [inputValue, setInputValue] = useState('');

  const searchUserQuery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onQueryChange(inputValue);
    setInputValue('');
  }

  return (
    <Fragment>
      <div className='header'> 
      <a href="http://localhost:5173/" className="logo">NEWSBRIEF</a>
      <form onSubmit={searchUserQuery}>
        <input 
          id='search-bar'
          className='search-bar'
          type='search'
          placeholder='Search...'
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit'>
          <img className='search-icon' src={search}></img>
        </button>
      </form>
    </div>

    </Fragment>    
  )
}

export default Header
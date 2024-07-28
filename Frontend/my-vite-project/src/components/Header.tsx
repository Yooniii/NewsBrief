import './Header.css'
import moonIcon from '../assets/Moon.png';
import favouritesIcon from '../assets/Favourites.png';

function Header() {
  return (
    <div className='header'>
      <div className='left-container'>
        <button className='nightmode-btn'><img className='moon-icon'src={moonIcon}></img></button>
        <h1>newsbrief</h1>
      </div>
      <button className='favourites-btn'><img className='favourites-icon' src={favouritesIcon}></img></button>
    </div>
  )
}

export default Header
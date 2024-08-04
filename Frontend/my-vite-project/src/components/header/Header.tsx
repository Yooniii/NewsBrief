import './Header.css'
import search from '../../assets/Search.png'
import { Fragment, useState } from 'react'
import ArticleList from '../CardList/Cardlist'

function Header() {
  const [category, setCategory] = useState('top_stories');

  return (
    <Fragment>
      <div className="navbar"> 
      <a href="http://localhost:5173/" className="logo">NewsBrief</a>
      <ul className="links">
        <li><a onClick={() => setCategory('top_stories')}>Top Stories</a></li>
        <li><a onClick={() => setCategory('business')}>Business</a></li>
        <li><a onClick={() => setCategory('entertainment')}>Entertainment</a></li>
        <li><a onClick={() => setCategory('science')}>Science</a></li>
        <li><a onClick={() => setCategory('sports')}>Sports</a></li>
        <li><a onClick={() => setCategory('tech')}>Tech</a></li>
      </ul>
      <form>
        <input className="search-bar" type="search" placeholder="Search..."/>
        <a>
          <img src={search} className="search-icon"></img>
        </a>
      </form>
    </div>
    <div className="horizontal-line"></div>
    <ArticleList category={category}></ArticleList>
    </Fragment>    
  )
}

export default Header
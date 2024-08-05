import './Header.css'
import search from '../../assets/Search.png'
import { Fragment, useState } from 'react'

function Header() {

  return (
    <Fragment>
      <div className="header"> 
      <a href="http://localhost:5173/" className="logo">NewsBrief</a>
      <form>
        <input className="search-bar" type="search" placeholder="Search..."/>
        <a>
          <img src={search} className="search-icon"></img>
        </a>
      </form>
    </div>
    <div className="horizontal-line"></div>
    </Fragment>    
  )
}

export default Header
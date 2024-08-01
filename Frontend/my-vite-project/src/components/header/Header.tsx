import './Header.css'
import search from '../../assets/Search.png'
import { Fragment } from 'react/jsx-runtime'
// import axios from 'axios';

// const handleClick = async (category: String) => {
//   axios.post('http://127.0.0.1:8000/headlines/headlines/', category)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((error) => {
//      if (error.response) {
//           console.log(error.response);
//           console.log("server responded");
//         } else if (error.request) {
//           console.log("network error");
//         } else {
//           console.log(error);
//         }
//       });
//   };

function Header() {
  return (
    <Fragment>
      <div className="navbar"> 
      <a href="http://localhost:5173/" className="logo">NewsBrief</a>
      <ul className="links">
        <li><a>Latest</a></li>
        <li><a>Business</a></li>
        <li><a>Entertainment</a></li>
        <li><a>Science</a></li>
        <li><a>Sports</a></li>
        <li><a>Tech</a></li>
      </ul>
      <form>
        <input className="search-bar" type="search" placeholder="Search..."/>
        <a>
          <img src={search} className="search-icon"></img>
        </a>
      </form>
    </div>
    <div className="horizontal-line"></div>
    </Fragment>
    
    // onClick={handleClick('latest')}
  )
}

export default Header
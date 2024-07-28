import './NavBar.css'
import axios from 'axios'

const NavBar = () => {
 const handleClick = async (category: String) => {
  axios.post('http://127.0.0.1:8000/headlines/headlines/', category)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
     if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" 
        data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a onClick={() => handleClick('latestStories')} className="nav-link" 
            href="#">Latest Stories</a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleClick('business')} className="nav-link" 
            href="#">Business</a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleClick('entertainment')} className="nav-link" 
            href="#">Entertainment</a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleClick('food')} className="nav-link" 
            href="#">Food</a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleClick('science')} className="nav-link" 
            href="#">Science</a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleClick('sport')} className="nav-link"
             href="#">Sports</a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleClick('tech')} className="nav-link" 
            href="#">Tech</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar
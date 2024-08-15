import './Home.css'
import { Link } from 'react-router-dom';
import { Fragment } from 'react'

const Home = () => {

  return (
    <Fragment>
      <div className='row'>
        <div className='top-stories'>
          <div className='text-box'>
            <h2 className='subheading'>Top Stories</h2>
            <Link to='/Top Stories' className='see-all'>See all</Link>
          </div>
          
          <div className="card">
            <img src="..." className="card-img" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='world-news'>
            <div className='text-box'>
              <h2 className='subheading'>World News</h2>
              <Link to='/World' className='see-all'>See all</Link>
            </div>

          </div>

          <div className='sports-news'>
            <div className='text-box'>
              <h2 className='subheading'>Sports News</h2>
              <Link to='/Sports' className='see-all'>See all</Link>
            </div>
          </div>
        </div>
      </div>

      <div className='political-news'>
        <div className='text-box'>
          <h2 className='subheading'>Political News</h2>
            <Link to='/Politics' className='see-all'>See all</Link>
        </div>
      </div>

    </Fragment>
    
  )
}

export default Home;
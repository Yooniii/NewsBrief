import ArticleList from '../ArticleList/ArticleList'
import { Fragment, useState } from 'react'
import './SideNav.css'

function SideNav() {
  const [category, setCategory] = useState('top_stories');
  return (
    <Fragment>
      <div className='side-nav'>
        <p>Category</p>
        <a onClick={() => setCategory('Top Stories')}>Top Stories</a>
        <a onClick={() => setCategory('Business')}>Business</a>
        <a onClick={() => setCategory('Entertainment')}>Entertainment</a>
        <a onClick={() => setCategory('Health')}>Health</a>
        <a onClick={() => setCategory('Science')}>Science</a>
        <a onClick={() => setCategory('Sports')}>Sports</a>
        <a onClick={() => setCategory('Tech')}>Tech</a>
    </div>
    <ArticleList category={category}></ArticleList>
    </Fragment>
    
  )
}

export default SideNav;
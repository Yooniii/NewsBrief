import ArticleList from '../ArticleList/ArticleList'
import { Fragment, useState } from 'react'
import './SideNav.css'

function SideNav() {
  const [category, setCategory] = useState('Top Stories');

  const handleCategoryChange = (category: string) => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });

    setCategory(category);
  }

  return (
    <Fragment>
      <div className='side-nav'>
        <p>Category</p>
        <a onClick={() => handleCategoryChange('Top Stories')}>Top Stories</a>
        <a onClick={() => handleCategoryChange('Business')}>Business</a>
        <a onClick={() => handleCategoryChange('Entertainment')}>Entertainment</a>
        <a onClick={() => handleCategoryChange('Health')}>Health</a>
        <a onClick={() => handleCategoryChange('Science')}>Science</a>
        <a onClick={() => handleCategoryChange('Sports')}>Sports</a>
        <a onClick={() => handleCategoryChange('Tech')}>Tech</a>
    </div>
    <ArticleList category={category}></ArticleList>
    </Fragment>
  )
}

export default SideNav;
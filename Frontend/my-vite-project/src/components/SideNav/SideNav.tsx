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
        <a className='category-btn' onClick={() => handleCategoryChange('Top Stories')}>Top Stories</a>
        <a className='category-btn' onClick={() => handleCategoryChange('World')}>World</a>
        <a className='category-btn' onClick={() => handleCategoryChange('Business')}>Business</a>
        <a className='category-btn' onClick={() => handleCategoryChange('Entertainment')}>Entertainment</a>
        <a className='category-btn' onClick={() => handleCategoryChange('Health')}>Health</a>
        <a className='category-btn' onClick={() => handleCategoryChange('Politics')}>Politics</a>
        <a className='category-btn' onClick={() => handleCategoryChange('Science')}>Science</a>
        <a className='category-btn' onClick={() => handleCategoryChange('Sports')}>Sports</a>
        <a className='category-btn' onClick={() => handleCategoryChange('Tech')}>Tech</a>
    </div>
    <ArticleList category={category}></ArticleList>
    </Fragment>
  )
}

export default SideNav;
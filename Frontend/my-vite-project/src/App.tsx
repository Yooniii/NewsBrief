import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import ArticleList from './components/ArticleList/ArticleList'
import './App.css'
import { useState } from 'react';

function App() {
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('')

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setQuery('');
  }

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setCategory('');
  }

  return (
    <div className='main-container'>
      <Header onQueryChange={handleQueryChange}/>
      <div className='content'>
        <SideNav onCategoryChange={handleCategoryChange}/>
        <ArticleList category={category} query={query}/>
      </div>

    </div>
  );
};

export default App
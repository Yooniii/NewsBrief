import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import ArticleList from './components/ArticleList/ArticleList'
import './App.css'
import { useState } from 'react';

function App() {
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('')
  const [fetchKey, setFetchKey] = useState(0);


  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setQuery('');
    setFetchKey(prevKey => prevKey + 1);
  }

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setCategory('');
    setFetchKey(prevKey => prevKey + 1);
  }

  return (
    <div className='main-container'>
      <Header onQueryChange={handleQueryChange}/>
      <div className='content'>
        <SideNav onCategoryChange={handleCategoryChange}/>
        <ArticleList category={category} query={query} fetchKey={fetchKey}/>
      </div>

    </div>
  );
};

export default App
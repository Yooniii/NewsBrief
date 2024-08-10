import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import ArticleList from './components/ArticleList/ArticleList'
import './App.css'
import { useState } from 'react';

function App() {
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('')

  return (
    <div className='main-container'>
      <Header onQueryChange={setQuery}/>
      <div className='content'>
        <SideNav onCategoryChange={setCategory}/>
        <ArticleList category={category} query={query}/>
      </div>

    </div>
  );
};

export default App
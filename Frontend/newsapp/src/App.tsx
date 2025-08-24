import Header from './components/header/Header';
import ArticleList from './components/article-list/ArticleList'
import HomePage from './components/home/Home';
import ScrollToTop from './components/scroll-to-top/ScrollToTop'
import ToolTip from './components/tool-tip/ToolTip';
import { Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='' element={<HomePage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/search' element={<ArticleList />} />
        <Route path='/:category' element={<ArticleList/>} />
      </Routes>
      <ScrollToTop/>
      <ToolTip/>
    </div>
  );
}

export default App;

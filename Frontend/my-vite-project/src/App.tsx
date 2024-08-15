import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import ArticleList from './components/ArticleList/ArticleList'
import Home from './components/Home/Home';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import { Route, Routes } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <div className='app'>
      <SideNav />
      <Header />
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/:category' element={<ArticleList/>} />
      </Routes>
      <ScrollToTop />
    </div>
  );
}

export default App;
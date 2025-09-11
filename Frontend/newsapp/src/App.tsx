import ArticleList from './pages/article-list'
import HomePage from './pages/home';
import ScrollToTop from './components/scroll-to-top/ScrollToTop'
import ToolTip from './components/tool-tip/ToolTip';
import RootLayout from "./components/layout/RootLayout";
import { Route, Routes } from 'react-router-dom';

import './App.css'

function App() {
  return (
    <div className="app">
      <RootLayout>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<ArticleList />} />
          <Route path="/:category" element={<ArticleList />} />
        </Routes>
        <ScrollToTop />
        <ToolTip />
      </RootLayout>
    </div>
  );
}

export default App;

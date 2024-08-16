import './Home.css'
import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Article } from '../Card/Card'

const HomePage: React.FC = () => {
  const [worldNews, setWorldNews] = useState<Article[]>([]);
  const [sportsNews, setSportsNews] = useState<Article[]>([]);
  const [topStories, setTopStories] = useState<Article[]>([]);
  const [politicalNews, setPoliticalNews] = useState<Article[]>([]);
  const [articlesWithImages, setArticlesWithImages] = useState<Article[]>([]);


  useEffect(() => {
    const fetchArticles = async (category: string) => {
      let articlesWithImages = [];
      let count = 0;

      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
    
        const filteredArticles = response.data.filter((article: Article) =>
          article.category === category
        );

        for (let article of filteredArticles.slice(0,8)) {
          if (count === 4) {
            break;
          }
          if (article.top_image != '') {
            articlesWithImages.push(article);
          }
        }

        return articlesWithImages.slice(0,4);

      } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
    };

    const fetchAllArticles = async () => {
      setWorldNews(await fetchArticles('World'));
      setTopStories(await fetchArticles('Top Stories'));
      setSportsNews(await fetchArticles('Sports'));
      setPoliticalNews(await fetchArticles('Politics'));
    };

    fetchAllArticles();
  }, [])

  return (
    <div className='home-container'>

      <div className='col'>
        <div className='top-stories'>
          <div className='text-box'>
            <h2 className='subheading'>Top Stories</h2>
            <Link to='/Top Stories' className='see-all'>See all</Link>
          </div>
          <div className='headline-row'>
            {topStories.length > 0 && (
              <div className='headline-box'>
                <img src={topStories[0].top_image}></img>
                <div className='article-details'>
                  <p className='source'> {topStories[0].source} </p>
                  <p className='title'> {topStories[0].title} </p>
                </div>
              </div>
            )}
            <div className='headline-col'>
              {topStories.length > 0 && (topStories.slice(1, 4).map((article: Article, index) => (
                <div key={index} className='headline-col-box'>
                  <img src={article.top_image}></img>
                  <div className='article-details'>
                    <p className='source'> {article.source} </p>
                    <p className='title'> {article.title} </p>
                  </div>
                </div>

              )))}

            </div>
          </div>
        </div>

        <div className='world-news'>
          <div className='text-box'>
            <h2 className='subheading'>World News</h2>
            <Link to='/World' className='see-all'>See all</Link>
          </div>

          <div className='article-row'>
            {worldNews.map((article: Article, index) => ( 

              <div key={index} className='article-box'>
                <img src={article.top_image}></img>
                <div className='article-details'>
                  <p className='source'> {article.source} </p>
                  <p className='title'> {article.title} </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='sports-news'>
          <div className='text-box'>
            <h2 className='subheading'>Sports News</h2>
            <Link to='/Sports' className='see-all'>See all</Link>
          </div>
          <div className='article-row'>
            {sportsNews.map((article: Article, index) => (
              <div key={index} className='article-box'>
                <img src={article.top_image}></img>
                <div className='article-details'>
                  <p className='source'> {article.source} </p>
                  <p className='title'> {article.title} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
    
  )
}

export default HomePage;
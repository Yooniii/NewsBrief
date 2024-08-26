import './Home.css'
import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Article } from '../Card/Card'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import LinkIcon from '../../assets/Link.png'

const HomePage: React.FC = () => {
  const [worldNews, setWorldNews] = useState<Article[]>([]);
  const [sportsNews, setSportsNews] = useState<Article[]>([]);
  const [topStories, setTopStories] = useState<Article[]>([]);
  const [politicalNews, setPoliticalNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async (category: string, articleCount: number) => {

      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
    
        const filteredArticles = response.data.filter((article: Article) =>
          article.category === category && article.top_image != ''
        );

        return filteredArticles.slice(0, articleCount)

      } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
    };

    const fetchAllArticles = async () => {
      setWorldNews(await fetchArticles('World', 4));
      setTopStories(await fetchArticles('Top Stories', 4));
      setSportsNews(await fetchArticles('Sports', 4));
      setPoliticalNews(await fetchArticles('Politics', 10));
    };

    fetchAllArticles();
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true
  };

  return (
    <div className='home-container'>

      <div className='col'>
        <div className='top-stories'>
  
          <div className='text-box'>
            <h2 className='subheading'>Top Stories</h2>
            <Link to='/Top Stories' className='see-all'>See all</Link>
          </div>
          <div className='header-line'></div>
          <div className='headline-row'>
            {topStories.length > 0 && (
              <div className='headline-box'>
                <img src={topStories[0].top_image}></img>
                <div className='article-details'>
                  <p className='source'> {topStories[0].source} </p>
                  <div className='main-text-box'>
                    <p className='title'> {topStories[0].title} </p>
                    <p className='preview'> {topStories[0].summary.split('\n-')[0]}</p>
                  </div>
                </div>
              </div>
            )}
            <div className='headline-col'>
              {topStories.length > 0 && (topStories.slice(1, 4).map((article: Article, index) => (
                <Fragment key={index}>
                  <div className='headline-col-box'>
                    <img src={article.top_image}></img>
                    <div className='article-details'>
                      <p className='source'> {article.source} </p>
                      <p className='title'> {article.title} </p>
                    </div>
                  </div>
                  {index < 2 && <div className='h-line'></div>}
                </Fragment>          
              )))}
            </div>
          </div>
        </div>

        <div className='world-news'>
          <div className='text-box'>
            <h2 className='subheading'>World</h2>
            <Link to='/World' className='see-all'>See all</Link>
          </div>
          <div className='header-line'></div>

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

        <div className='political-news'>
          <div className='text-box'>
            <h2 className='subheading'>Politics</h2>
            <Link to='/World' className='see-all'>See all</Link>
          </div>
          <div className='header-line'></div>

          <div className='carousel-row'>
            <div className='article-grid'>
              <div className='grid-col'>
                {politicalNews.length > 0 && (politicalNews.slice(0,3).map((article: Article, index) => (
                <Fragment key={index}>
                  <div className='grid-box'>
                    <p className='source'> {article.source} </p>
                    <p className='title'> {article.title} </p>
                    {index < 2 && <div className="grid-line"></div>}
                  </div>
                </Fragment>
              )))}
              
              </div>
               <div className='grid-col'>
                {politicalNews.length > 0 && (politicalNews.slice(4, 7).map((article: Article, index) => (
                <Fragment key={index}>
                  <div className='grid-box'>
                    <p className='source'> {article.source} </p>
                    <p className='title'> {article.title} </p>
                  </div>
                  {index < 2 && <div className="grid-line"></div>}
                </Fragment>
              )))}
              </div>
            </div>

            <div className='carousel-component'>
              <Slider {...settings}>
                {politicalNews.slice(7, 10).map((article: Article, index) => (
                  <div className='carousel-slide'>
                    <img src={article.top_image}></img>
                    <div className='overlay'>
                      <p className='carousel-source'> {article.source} </p>
                      <p className='carousel-title'> {article.title} </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className='sports-news'>
          <div className='text-box'>
            <h2 className='subheading'>Sports</h2>
            <Link to='/Sports' className='see-all'>See all</Link>
          </div>
          <div className='header-line'></div>
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

      <footer></footer>
    </div>
  )
}

export default HomePage;
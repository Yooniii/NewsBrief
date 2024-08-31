import './Home.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {Article} from '../Card/Card'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeLoadingCard from '../Loading/HomeLoadingCard';
import HeadlineLoadingCard from '../Loading/HeadlineLoadingCard'
import SectionLoadingCard from '../Loading/SectionLoadingCard'

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState({
    worldNews: [] as Article[],
    sportsNews: [] as Article[],
    topStories: [] as Article[],
    politicalNews: [] as Article[],
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchArticles = async (category: string, articleCount: number) => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
        return response.data
          .filter((article: Article) => article.category === category && article.top_image)
          .slice(0, articleCount)

      } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
    };

    const fetchAllArticles = async () => {
      const [worldNews, topStories, sportsNews, politicalNews] = await Promise.all([
        fetchArticles('World', 4),
        fetchArticles('Top Stories', 4),
        fetchArticles('Sports', 4),
        fetchArticles('Politics', 10),
      ]);
      setArticles({ worldNews, sportsNews, topStories, politicalNews });
      setLoaded(true);
    };

    fetchAllArticles();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true,
  };

  const renderArticleRow = (articles: Article[], category: string) => (
    <div className={`${category.toLowerCase()}-news`}>
      <div className='text-box'>
        <h2 className='subheading'>{category}</h2>
        <Link to={`/${category}`} className='see-all'>See all</Link>
      </div>
      <div className='header-line'></div>
      <div className='article-row'>
        {!loaded ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <HomeLoadingCard />
            <HomeLoadingCard />
            <HomeLoadingCard />
            <HomeLoadingCard />
          </div> 
          ) : (
           articles.map((article, index) => (
            <div key={index} className='article-box'>
              <img src={article.top_image} alt={article.title}/>
              <div className='article-details'>
                <p className='source'>{article.source}</p>
                <p className='title'>{article.title}</p>
              </div>
            </div>
          ))
         )}     
      </div>
    </div>
  );

  return (
    <div className='home-container'>
      <div className='col'>
        <div className='top-stories'>
          <div className='text-box'>
            <h2 className='subheading'>Top Stories</h2>
            <Link to='/Top Stories' className='see-all'>See all</Link>
          </div>
          <div className='header-line'></div>

          {!loaded ? (
            <HeadlineLoadingCard/>
          ) : (
            <div className='headline-row'>
              <div className='headline-box'>
                <img src={articles.topStories[0].top_image} alt={articles.topStories[0].title} />
                <div className='article-details'>
                  <p className='source'>{articles.topStories[0].source}</p>
                  <div className='main-text-box'>
                    <p className='title'>{articles.topStories[0].title}</p>
                    <p className='preview'>{articles.topStories[0].summary.split('\n-')[0]}</p>
                  </div>
                </div>
              </div>

              <div className='headline-col'>
                {articles.topStories.slice(1, 4).map((article, index) => (
                  <Fragment key={index}>
                    <div className='headline-col-box'>
                      <img src={article.top_image} alt={article.title} />
                      <div className='article-details'>
                        <p className='source'>{article.source}</p>
                        <p className='title'>{article.title}</p>
                      </div>
                    </div>
                    {index < 2 && <div className='h-line'></div>}
                  </Fragment>
                  ))}
              </div>
            </div>
          )}
        </div>

        {renderArticleRow(articles.worldNews, 'World')}

        <div className='political-news'>
          <div className='text-box'>
            <h2 className='subheading'>Politics</h2>
            <Link to='/World' className='see-all'>See all</Link>
          </div>
          <div className='header-line'></div>
          <div className='carousel-row'>
            {!loaded?  (<SectionLoadingCard/>) : (
              <Fragment>
                <div className='article-grid'>
                {['grid-col', 'grid-col'].map((className, colIndex) => (
                  <div key={colIndex} className={className}>
                    {articles.politicalNews.slice(colIndex * 3, colIndex * 3 + 3).map((article, index) => (
                      <Fragment key={index}>
                        <div className='grid-box'>
                          <p className='source'>{article.source}</p>
                          <p className='title'>{article.title}</p>
                        </div>
                        {index < 2 && <div className='grid-line'></div>}
                      </Fragment>
                    ))}
                  </div>
                ))}
                </div>

                <div className='carousel-component'>
                  <Slider {...settings}>
                    {articles.politicalNews.slice(7, 10).map((article, index) => (
                      <div key={index} className='carousel-slide'>
                        <img src={article.top_image} alt={article.title} />
                        <div className='overlay'>
                          <p className='carousel-source'>{article.source}</p>
                          <p className='carousel-title'>{article.title}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </Fragment>
            )}
          </div>
        </div>
        {renderArticleRow(articles.sportsNews, 'Sports')}
      </div>
      <footer></footer>
    </div>
  );
};

export default HomePage;

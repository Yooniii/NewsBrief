import HomeLoadingCard from '../loading/HomeLoadingCard';
import HeadlineLoadingCard from '../loading/HeadlineLoadingCard'
import SectionLoadingCard from '../loading/SectionLoadingCard'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';

import { Link } from 'react-router-dom';
import { useFetchArticles } from './useFetchArticles';
import { Article } from '../card/Card'
import './Home.css';

// Newsbrief homepage
function HomePage() {
  const { articles, isLoading } = useFetchArticles();

  // Section header with title and see all link
  const SectionHeader = ({ title, link }: { title: string; link: string }) => (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <Link to={link} className="see-all-link">View All</Link>
    </div>
  );

  // Handles clicking on an article to open it in a new window
  const handleArticleClick = (articleLink: string) => {
    if (articleLink) {
      window.open(articleLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Hero section with featured story
  const HeroSection = () => (
    <section className="hero-section">
      <SectionHeader title="Top Stories" link="/Top Stories" />
      {isLoading ? (
        <HeadlineLoadingCard />
      ) : (
        <div className="hero-content">
          <div className="hero-main">
            <div 
              className="hero-image" 
              onClick={() => handleArticleClick(articles.topStories[0]?.article_link)}
              style={{ cursor: 'pointer' }}
            >
              <img src={articles.topStories[0]?.top_image} alt={articles.topStories[0]?.title} />
              <div className="hero-overlay">
                <span className="hero-source">{articles.topStories[0]?.source}</span>
                <h1 className="hero-title">{articles.topStories[0]?.title}</h1>
                <p className="hero-summary">{articles.topStories[0]?.summary?.split('\n-')[0]}</p>
              </div>
            </div>
          </div>
          <div className="hero-sidebar">
            {articles.topStories.slice(1, 4).map((article, index) => (
              <div 
                key={index} 
                className="hero-sidebar-item"
                onClick={() => handleArticleClick(article.article_link)}
                style={{ cursor: 'pointer' }}
              >
                <img src={article.top_image} alt={article.title} />
                <div className="hero-sidebar-content">
                  <span className="hero-sidebar-source">{article.source}</span>
                  <h3 className="hero-sidebar-title">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );

  // Renders a grid of article cards
  const ArticleGrid = ({ articles, category, link }: { articles: Article[]; category: string; link: string }) => (
    <section className="article-section">
      <SectionHeader title={category} link={link} />
      <div className="article-grid">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <HomeLoadingCard key={index} />
          ))
        ) : (
          articles.map((article, index) => (
            <article 
              key={index} 
              className="article-card"
              onClick={() => handleArticleClick(article.article_link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="article-image">
                <img src={article.top_image} alt={article.title} />
                <div className="article-category">{category}</div>
              </div>
              <div className="article-content">
                <span className="article-source">{article.source}</span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-summary">{article.summary?.split('\n-')[0]}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );

  // Renders the politics section with grid and carousel
  function PoliticsSection() {
    return (
      <section className="politics-section">
        <SectionHeader title="Politics" link="/Politics" />
        {isLoading ? (
          <SectionLoadingCard />
        ) : (
          <div className="politics-content">
            <div className="politics-grid">
              {articles.politicalNews.slice(0, 4).map((article, index) => (
                <div 
                  key={index} 
                  className="politics-item"
                  onClick={() => handleArticleClick(article.article_link)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="politics-source">{article.source}</span>
                  <h4 className="politics-title">{article.title}</h4>
                </div>
              ))}
            </div>
            <div className="politics-carousel">
              <CCarousel controls indicators>
                {articles.politicalNews.slice(4, 8).map((article, index) => (
                  <CCarouselItem 
                    key={index}
                    onClick={() => handleArticleClick(article.article_link)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CImage 
                      className="d-block w-100" 
                      src={article.top_image} 
                      alt={article.title}
                      style={{ height: '400px', objectFit: 'cover' }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5 className="politics-slide-title">{article.title}</h5>
                      <p className="politics-slide-source">{article.source}</p>
                    </div>
                  </CCarouselItem>
                ))}
              </CCarousel>
            </div>
          </div>
        )}
      </section>
    );
  }
  return (
    <div className="home-page">
      <div className="home-container">
        <HeroSection />
        <ArticleGrid articles={articles.worldNews} category="World News" link="/World" />
        <PoliticsSection />
        <ArticleGrid articles={articles.sportsNews} category="Sports" link="/Sports" />
      </div>
    </div>
  );
}

export default HomePage;
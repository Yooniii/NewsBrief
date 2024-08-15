import axios from 'axios';
import Card from '../Card/Card';
import { useState, useEffect, Fragment } from 'react';
import { Article } from '../Card/Card';
import { useParams, useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../Loading/LoadingCard';
import './ArticleList.css';

const ArticleList = () => {
  const location = useLocation();
  const { category } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const [articles, setArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [index, setIndex] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
        const allArticles = response.data;

        let filteredArticles = allArticles;

        if (query) {
          filteredArticles = allArticles.filter((article: Article) =>
            article.summary.toLowerCase().includes(query.toLowerCase())
          );
        } else if (category) {
          filteredArticles = allArticles.filter((article: Article) =>
            article.category === category
          );
        }

        setArticles(filteredArticles);
        setHasMore(filteredArticles.length > 3);
        setDisplayedArticles(filteredArticles.slice(0, 3));

      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchData();
  }, [category, query]);

  const fetchMoreData = () => {
    if (!hasMore) return;

    const nextIndex = index + 3;

    if (nextIndex > articles.length) {
      setDisplayedArticles(articles);
      setHasMore(false);
      
    } else {
      setDisplayedArticles(articles.slice(0, nextIndex));
      setIndex(nextIndex);
    }
  };

  return (
    <div className='article-list'>
      <div className='category'>
        <h1>{query ? 'Search Results' : category}</h1>
      </div>

      <InfiniteScroll
        dataLength={displayedArticles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Fragment>
            <LoadingCard />
            <LoadingCard />
          </Fragment>
        }
        scrollThreshold={1}
        endMessage={
          <div className='end-container'>
            <p className='end-msg'>No more articles to display</p>
          </div>
        }
      >
        {displayedArticles.map((article: Article) => (
          <Card
            key={article.article_link}
            title={article.title}
            topImage={article.top_image}
            media={article.media}
            source={article.source}
            link={article.article_link}
            date={article.date}
            summary={article.summary}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ArticleList;

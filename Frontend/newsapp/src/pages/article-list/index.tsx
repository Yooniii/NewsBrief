import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";

import { Article } from '../../types';
import Card from "../../components/card/Card";

import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../../components/loading/LoadingCard';
import { useFetchArticlesByCategory } from '../../hooks/useArticleService';

import "./index.css";


const ArticleList = () => {
  const location = useLocation();
  const { category } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query')?.toLowerCase();

  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [index, setIndex] = useState(3);

  if (!category) return;

  const { articles, hasMore, loadMore } = useFetchArticlesByCategory({ category, query });
    
  useEffect(() => {
    // Reset displayed articles when articles change
    setDisplayedArticles(articles.slice(0, 3));
    setIndex(3);
  }, [articles]);

  const fetchMoreData = () => {
    if (!hasMore) return;
    const nextIndex = index + 3;

    if (nextIndex >= articles.length) {
      loadMore();
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
          <div>
            <LoadingCard />
            <LoadingCard />
          </div>
        }
        scrollThreshold={1}
        endMessage={
          <div className='end-container'>
            <p className='end-msg'>No more articles to display</p>
          </div>
        }
      >
      {displayedArticles.map((article: Article) => {
        return (
          <Card
            key={article.article_link} 
            title={article.title}
            top_image={article.top_image} 
            category={article.category}
            media={article.media}
            source={article.source}
            article_link={article.article_link}
            date={article.date}
            summary={article.summary}
          />
        );
      })}
      </InfiniteScroll>
    </div>
  );
};

export default ArticleList;
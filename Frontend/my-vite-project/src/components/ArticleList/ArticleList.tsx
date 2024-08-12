import axios from 'axios';
import Card from '../Card/Card';
import { useState, useEffect, Fragment } from 'react';
import { Article } from '../Card/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../Loading/LoadingCard';
import './ArticleList.css'

interface ArticleListProps {
  category: string;
  query: string;
}

const ArticleList = ({ category, query }: ArticleListProps) => {
  const [categoryArticles, setCategoryArticles] = useState<Article[]>([]);
  const [queryArticles, setQueryArticles] = useState<Article[]>([]);
  const [isQueryPage, setIsQueryPage] = useState<boolean>(false);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setDisplayedArticles([]);
      setIndex(3)

      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
        let filtered = response.data;

        if (query) {
          filtered = response.data.filter((article: Article) =>
            article.summary.toLowerCase().includes(query.toLowerCase())
          );
          setQueryArticles(filtered);
          setIsQueryPage(true);
        } else if (category) {
          filtered = response.data.filter((article: Article) =>
          article.category === category
          );
          setCategoryArticles(filtered);
          setIsQueryPage(false);
        }
        
        setDisplayedArticles(filtered.slice(0, 3));
        setHasMore(filtered.length > 3);
      } catch (error) {
        console.log(error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
      setIndex(3); 
    };

    fetchData();
  }, [category, query]); 

  const fetchMoreData = () => {
    if (!hasMore || loading) return;

    const nextIndex = index + 3;
    
    setDisplayedArticles((isQueryPage ? queryArticles : categoryArticles).slice(0, nextIndex));
    setHasMore((isQueryPage ? queryArticles : categoryArticles).length > nextIndex);
    setIndex(nextIndex);
  };

  return (
    <div className='article-list'>
      <div className='category'>
        <h1>{isQueryPage ? 'Search Results' : category}</h1>
      </div>
      
      <InfiniteScroll
        dataLength={displayedArticles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Fragment>
            <LoadingCard/>
          </Fragment>
        }
        scrollThreshold={1}
        endMessage={
          <div className='end-container'>
            <p className='end-msg'>No more articles to display</p>
            {/* <button className='view-more-btn'> View Yesterday's Stories</button> */}
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
            isLoading={loading}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default ArticleList;
import axios from 'axios';
import Card from '../Card/Card';
import { useState, useEffect, Fragment } from 'react';
import { Article } from '../Card/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../Loading/LoadingCard';
import './ArticleList.css'

interface ArticleListProps {
  category: string;
}

function ArticleList({ category }: ArticleListProps) {
  const [allArticles, setAllArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setDisplayedArticles([])
      setIndex(3)

      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
        const filteredArticles = response.data.filter(
          (article: Article) => article.category === category
        );

        setAllArticles(filteredArticles);
        setDisplayedArticles(filteredArticles.slice(0, 3));
        setHasMore(filteredArticles.length > 3);
      } catch (error) {
        console.log(error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
      setIndex(3); 

    };

    fetchData();
  }, [category]); 

  const fetchMoreData = () => {
    if (!hasMore || loading) return;

    const nextIndex = index + 3;
    setDisplayedArticles(allArticles.slice(0, nextIndex));
    setIndex(nextIndex);
    setHasMore(allArticles.length > nextIndex);
  };

  return (
    <div className='article-list'>
      <div className='category'>
        <h1>{category}</h1>
      </div>
      
      <InfiniteScroll
        dataLength={displayedArticles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Fragment>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </Fragment>
        }
        endMessage={<p>No more articles to display</p>}
      >
        {displayedArticles.map((article: Article) => (
          <Card
            title={article.title}
            img={article.img_url}
            source={article.source}
            link={article.article_link}
            date={article.date}
            summary={article.summary}
            isLoading={loading}
            category={category}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default ArticleList;
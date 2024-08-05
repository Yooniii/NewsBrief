
import axios from 'axios';
import Card from '../Card/Card';
import { useState, useEffect, Fragment } from 'react';
import { Article } from '../Card/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../Loading/LoadingCard';

interface ArticleListProps {
  category: string;
}

function ArticleList({ category }: ArticleListProps) {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
        const filteredArticles = response.data.filter(
          (article: Article) => article.category === category
        );
        // Reset state on category change
        setAllArticles(filteredArticles);
        setDisplayedArticles(filteredArticles.slice(0, index));
        setHasMore(filteredArticles.length > 3);
      } catch (error) {
        console.log(error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
      setIndex(3); // Reset index for new category

    };

    fetchData();
  }, [category]); // Dependency on category changes

  const fetchMoreData = () => {
    if (!hasMore || loading) return;

    const nextIndex = index + 3;
    setDisplayedArticles(allArticles.slice(0, nextIndex));
    setIndex(nextIndex);
    setHasMore(allArticles.length > nextIndex);
  };

  return (
    <div className='card-list'>
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
            key={article.title} // Ensure each Card has a unique key
            title={article.title}
            img={article.img_url}
            source={article.source}
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

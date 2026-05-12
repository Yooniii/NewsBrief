import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCard from "../../components/loading/LoadingCard";

import { useParams, useLocation } from "react-router-dom";
import { Article } from "../../types";
import { ArticleCard } from "../../components/card/Card";
import { useFetchArticlesByCategory } from "../../hooks/useArticleService";

import "./index.css";

const ArticleList = () => {
  const location = useLocation();

  const { category } = useParams();
  if (!category) return;

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.toLowerCase();

  const { articles, hasMore, loadMore } = useFetchArticlesByCategory({
    category,
    query,
  });

  return (
    <div className="article-list">
      <div className="category">
        <h1>{query ? "Search Results" : category}</h1>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div>
            <LoadingCard />
            <LoadingCard />
          </div>
        }
        scrollThreshold={0.9} // trigger when 90% down the page
        scrollableTarget={null} // use window scroll
        endMessage={
          <div className="end-container">
            <p className="end-msg">No more articles to display</p>
          </div>
        }
      >
        <div className="article-list-container">
          {articles.map((article: Article) => (
            <ArticleCard key={article.article_link} article={article} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ArticleList;

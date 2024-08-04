import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { Article } from '../Card/Card'

interface ArticleListProps {
  category: string;
}

function ArticleList({ category }: ArticleListProps) {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/')
        const articles = response.data
        setFilteredArticles(articles.filter((article: Article) => article.category === category))
        setLoading(false);
    } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [category]);

  const displayArticles = filteredArticles.slice(0,3);

  return (
    <div className='card-list'>
      {displayArticles.map((article: Article) => (
        <Card
          title={article.title}
          img={article.img_url}
          source={article.source}
          date={article.date}
          summary={article.summary}
          isLoading={loading}
          category={category}> 
        </Card>
      ))}
    </div>
  );
}

export default ArticleList;
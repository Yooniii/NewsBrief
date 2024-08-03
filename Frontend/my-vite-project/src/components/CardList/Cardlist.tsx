import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { Article } from '../Card/Card'

// interface Article {
//   title: string;
//   source: string;
//   date: string;
//   imgUrl: string;
//   summary: string;
//   isLoading: boolean;
// }

function ArticleList() {
  // const [title, setTitle] = useState('');
  // const [source, setSource] = useState('');
  // const [date, setDate] = useState('');
  // const [img, setImg] = useState('');
  // const [summary, setSummary] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/')
        setArticles(response.data);
        setLoading(false);
    } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const displayArticles = articles.slice(0,3);

  return (
    <div className='card-list'>
      {displayArticles.map(article => (
        <Card
          title={article.title}
          img={article.img_url}
          source={article.source}
          date={article.date}
          summary={article.summary}
          isLoading={loading}
        />
      ))}
    </div>
  );
}

export default ArticleList;
// import { useState, useEffect } from 'react'
// import axios from 'axios'
import NavBar from './components/NavBar'
import Header from './components/Header'

interface article {
  title: string;
  author: string;
  date: string;
  url: string;
  image_url: string | null;
}

function RetrieveHeadlines() {
  // const [news, setNews] = useState<article[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/retrieve_headlines/')
  //   .then(response => {
  //     setNews(response.data.news);
  //     setLoading(false);
  //   })

  //   .catch(() => {
  //     setLoading(false)
  //     setError(true);
  //   });

  // })

  // if (error) {
  //   return <p>Error</p>
  // }


  // if (loading) {
  //   return <p>Generating Articles...</p>;
  // }

  return (
      <div>
        <Header></Header>
        <NavBar></NavBar>
      
      
      
      
      {/* <h1>Today's Headlines</h1>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
            <p><strong>Date:</strong> {article.date || 'No date available'}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            {article.image_url && <img src={article.image_url} alt={article.title} style={{ maxWidth: '100px' }} />}
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default RetrieveHeadlines;
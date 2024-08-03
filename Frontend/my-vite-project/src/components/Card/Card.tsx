import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import CustomSkeleton from '../Loading/Skeleton';
import './Card.css';

function Articles() {
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [img, setImg] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/')
        const article = response.data[0];
        setTitle(article.title);
        setSource(article.source);
        setDate(article.date);
        setImg(article.img_url);
        setSummary(article.summary);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Fragment>
        <div className="skeletonBlock">
          <CustomSkeleton width={448} height={368} variant="rounded" sx={{ bgcolor: 'black' }}/>
          <div className="contentBlock">
            <CustomSkeleton width={930} height={130} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={930} height={31} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={930} height={31} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={930} height={31} variant="rounded" sx={{ bgcolor: 'black' }}/>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="article-container">
        <img className="article-img" src={img} alt="Article" />
        <div className="text">
          <h2 className="article-title">{title}</h2>
          <p className="article-info">{source} | {date}</p>
          <p className="summary">{summary}</p>
          <div className="btn-wrap">
            <button className="read-more-btn">Continue Reading</button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </Fragment>
  );
}

export default Articles;

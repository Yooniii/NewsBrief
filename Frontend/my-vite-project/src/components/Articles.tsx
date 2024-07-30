import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import CustomSkeleton from '../Skeleton/Skeleton';
import './Articles.css';

function Articles() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [img, setImg] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/headlines/')
        const article = response.data.news[0];
        setTitle(article.title);
        setAuthor(article.author);
        setDate(article.date);
        setImg(article.image_url);
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
          <p className="article-info">{author} | {date}</p>
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

import { Fragment } from 'react';
import LoadingCard from '../Loading/LoadingCard'
import './Card.css';
import TimeAgo from 'timeago-react';

export interface Article {
  title: string;
  date: string;
  source: string;
  img: string;
  summary: string;
  category: string;
  isLoading: boolean;
}

const ArticleCard: React.FC<Article> = ({ title, img, source, date, summary, isLoading }) => {

  if (isLoading) {
    return (
     <LoadingCard></LoadingCard>
    );
  }

  return (
    <Fragment>
      <div className="article-container">
        <img className="article-img" src={img} alt="Article" />
        <div className="text">
          <p className="source">{source}</p>
          <h2 className="article-title">{title}</h2>
          <TimeAgo className="date" datetime={date}/>
          <p className="summary">{summary}</p>
          <div className="btn-wrap">
            <button className="read-more-btn">Read summary</button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </Fragment>
  );
}

export default ArticleCard;

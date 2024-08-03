import { Fragment } from 'react';
import CustomSkeleton from '../Loading/Skeleton';
import './Card.css';

interface Article {
  title: string;
  img: string;
  source: string;
  date: string;
  summary: string;
  isLoading: boolean;
}

const ArticleCard: React.FC<Article> = ({ title, img, source, date, summary, isLoading }) => {

  if (isLoading) {
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
          <p className="source">{source}</p>
          <h2 className="article-title">{title}</h2>
          <p className="date">{date}</p>
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

export default ArticleCard;

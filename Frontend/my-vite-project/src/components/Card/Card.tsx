import { Fragment, useState } from 'react';
import LoadingCard from '../Loading/LoadingCard'
import './Card.css';
import TimeAgo from 'timeago-react';
import { useSpring, animated } from 'react-spring'

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
  const [showMore, setShowMore] = useState(false)

  if (isLoading) {
    return (
     <LoadingCard></LoadingCard>
    );
  }
  
  // clean AI output for formatting
  const lines = summary
  .replace(/^\*\s*/gm, '') // remove * and ** in the summary
  .replace(/\*\*\s*/g, '')
  .replace('\n', '')
  .trim()
  .split('\n');

  const description = lines[0].trim();

  const animationProps = useSpring({
    opacity: showMore ? 1 : 0,
    maxHeight: showMore ? '500px' : '0px',
    config: { duration: 350 },
  });


   return (
    <Fragment>
      <div className={`article-container${img ? '' : '-without-img'}`}>
        <div className={`img-container${img ? '' : '-without-img'}`}>
          <img className='article-img' src={img}/>
        </div>
        
        <div className='text'>
          <p className='source'>{source}</p>
          <h2 className='article-title'>{title}</h2>
          <TimeAgo className='date' datetime={date} />
          <p className='summary'>{description}</p>
          <animated.ul style={animationProps} className='summary-list'>
            {showMore ? lines.slice(1).map((line, index) => (
                <li key={index} className="summary">{line}</li>
              )) : null }
          </animated.ul>
          <div className="btn-wrap">
            <button className="read-more-btn" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </Fragment>
  );
}

export default ArticleCard;

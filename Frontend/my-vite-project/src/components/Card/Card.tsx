import { Fragment, useState } from 'react';
import LoadingCard from '../Loading/LoadingCard'
import './Card.css';
import TimeAgo from 'timeago-react';
import { useSpring, animated } from 'react-spring'
import linkImg from '../../assets/Link.png'

export interface Article {
  title: string;
  date: string;
  source: string;
  img: string;
  link: string;
  summary: string;
  category: string;
  isLoading: boolean;
}

const ArticleCard: React.FC<Article> = ({ title, img, source, link, date, summary, isLoading }) => {
  const [showMore, setShowMore] = useState(false)

  if (isLoading) {
    return (
     <LoadingCard></LoadingCard>
    );
  }

  const props = useSpring({
    opacity: showMore ? 1 : 0,
    maxHeight: showMore ? '500px' : '0px',
    overflow: 'hidden',
    config: { duration: 400 },
  });

  const lines = summary.split("\n-")
  const description = lines[0];
  const displayedLines = showMore ? lines : lines.slice(0, 1);

   return (
    <Fragment>
      <div className={`article-container${img ? '' : '-without-img'}`}>

        <div className='top-section'>
           <div className={`img-container${img ? '' : '-without-img'}`}>
            <img className='article-img' src={img}/>
          </div>
          <div className='text'>
            <p className='source'>{source}</p>
            <h2 className='article-title'>{title}</h2>
            <TimeAgo className='date' datetime={date} />
            <p className='summary'>{description}
              <button className="read-more-btn" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Read Less' : 'Read More'}
              </button>
            </p>
          </div>
        </div>
       
        <div className='bottom-section'>
          <animated.ul style={props} className='summary-list'>
            {showMore ? displayedLines.slice(1).map((line, index) => (
                <li key={index} className="summary">{line}</li>
              )) : null }
          </animated.ul>
          <div className='btn-container'>
            <a href={link} target="_blank">
              <img src={linkImg} className="link-icon"></img>
            </a>
          </div>
        </div>
        
      </div>
    </Fragment>
  );
}

export default ArticleCard;

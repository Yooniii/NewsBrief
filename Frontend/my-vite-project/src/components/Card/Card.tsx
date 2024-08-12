import { Fragment, useState } from 'react';
import LoadingCard from '../Loading/LoadingCard'
import './Card.css';
import TimeAgo from 'timeago-react';
import { useSpring, animated } from 'react-spring'
import linkImg from '../../assets/Link.png'
import ReactPlayer from 'react-player'

export interface Article {
  key: string;
  title: string;
  date: string;
  source: string;
  topImage: string;
  media: string;
  link: string;
  summary: string;
  category: string;
  isLoading: boolean;
}

const ArticleCard: React.FC<Article> = 
({ key, title, topImage, media, source, link, date, summary, isLoading }) => {
  const [showMore, setShowMore] = useState(false)

  if (isLoading) {
    return (
     <LoadingCard/>
    );
  }

  const props = useSpring({
    opacity: showMore ? 1 : 0,
    maxHeight: showMore ? '800px' : '0px',
    overflow: 'hidden',
    config: { duration: 400 },
  });

  let hasMedia = true;
  if (media === '[]') {
    hasMedia = false;
  }

  const renderMediaContent = () => {
    if (hasMedia) {
      media = media.replace('[', '').replace(']', '')
      return (
        <div className='player-wrapper'>
          {showMore ? (
            <ReactPlayer
              className='react-player' 
              url={media} 
              controls
            />
            ) : null}
        </div>
      )
    }
  }

  const lines = summary.split("\n-")
  const description = lines[0];
  const displayedLines = showMore ? lines : lines.slice(0, 1);

   return (
    <Fragment>
      <div className='article-container'
        onClick={() => setShowMore(!showMore)}>
        <div className='preview'>
          <img className={`article-img${topImage ? '' : '-no-img'}`} src={topImage}/>
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
        
        <div className='expand-container'>
          <animated.ul style={props} className='summary-list'>
            {showMore ? displayedLines.slice(1).map((line, index) => (
              <li key={index} className="summary">{line}</li>
            )) : null }
          </animated.ul>
          {hasMedia ? renderMediaContent() : null }
        </div>

        <div className='btn-container'>
          <a href={link} target='_blank'>
            <img src={linkImg} className='link-icon'></img>
          </a>
        </div>
      </div>
    </Fragment>
  );
}

export default ArticleCard;

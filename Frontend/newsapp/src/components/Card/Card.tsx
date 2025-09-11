import { useState } from 'react';
import { useSpring, animated } from "react-spring";
import { GoLinkExternal } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import TimeAgo from 'timeago-react';
import ReactPlayer from 'react-player';
import ModalComponent from '../modal/Modal';

import { Article } from "../../types"
import "./Card.css";

// Article card component
const ArticleCard: React.FC<Article> = 
({ title, top_image, media, source, article_link, date, summary }) => {
  const [showMore, setShowMore] = useState(false)
  const [showModal, setShowModal] = useState(false)   

  // Props object for smooth animation when clicking 'read more'
  const props = useSpring({
    opacity: showMore ? 1 : 0,
    maxHeight: showMore ? '800px' : '0px',
    overflow: 'hidden',
    config: { duration: 400 },
  });

  // Split and reformat summary into lines for displaying
  const lines = summary.split("\n-")
  const description = lines[0];
  const displayedLines = showMore ? lines : lines.slice(0, 1);


  // Display media content if article has one.
  const renderMediaContent = () => {
    media = media.replace('[', '').replace(']', '')
    return (
      <div className='media-wrapper'>
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
   return (
    <div className='article-container'>
      <div className='preview'>
        <img className={`article-img${top_image ? '' : '-no-img'}`} src={top_image}/>
        <div className='text'>
          <p className='source'>{source}</p>
          <h2 className='article-title'>{title}</h2>
          <TimeAgo className='date' datetime={date} />
          <p className='summary'>{description} {' '}
            <a className="read-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Read Less' : 'Read More'}
            </a>
          </p>
        </div>
      </div>
      
      <div className={`expand-container ${showMore ? 'show-more' : ''}`}>
        <animated.ul style={props} className='summary'>
          {showMore ? displayedLines.slice(1).map((line, index) => (
            <li key={index} className='summary'>{line}</li>
          )) : null }
        </animated.ul>
        {ReactPlayer.canPlay(media) ? renderMediaContent() : null }
      </div>

      <div className='btn-container'>
        <a href={article_link} target='_blank'>
          <GoLinkExternal size={20}/>
        </a>
        <button className='share-btn' onClick={() => setShowModal(true)}>
          <IoShareSocialOutline size={21} style={{marginBottom: '0.01rem'}}/>
        </button>
      </div>
      <ModalComponent 
        isOpen={showModal} 
        onRequestClose={() => setShowModal(false)}
        articleTitle={title}
        source={source}
        shareUrl={article_link}
      />
    </div>
  );
}
export default ArticleCard;

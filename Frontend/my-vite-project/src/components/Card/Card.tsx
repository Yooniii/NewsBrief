import { Fragment, useState, useEffect } from 'react';
import './Card.css';
import TimeAgo from 'timeago-react';
import { useSpring, animated } from 'react-spring';
import ReactPlayer from 'react-player';
import ModalComponent from '../Modal/Modal';
import { GoLinkExternal } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";

/**
 * Card component for the Newsbrief website. 
 */

// Article object. Includes the title, date, source, image, videos, URL, 
// summary, and category.
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
}

/**
 * Renders an article card component
 * @param {Object} param0 - The article properties.
 * @param {string} param0.key - The unique key for the article.
 * @param {string} param0.title - The title of the article.
 * @param {string} param0.topImage - The URL of the top image for the article.
 * @param {string} param0.media - The URL of the media content (video).
 * @param {string} param0.source - The source of the article.
 * @param {string} param0.link - The URL link to the full article.
 * @param {string} param0.date - The publication date of the article.
 * @param {string} param0.summary - The summary of the article.
 * @returns {JSX.Element} The JSX element representing the article card.
 */
const ArticleCard: React.FC<Article> = 
({ key, title, topImage, media, source, link, date, summary }) => {
  const [showMore, setShowMore] = useState(false)
  const [showModal, setShowModal] = useState(false)   

  // Props object to enable a smooth animation when the user clicks 'read more'
  const props = useSpring({
    opacity: showMore ? 1 : 0,
    maxHeight: showMore ? '800px' : '0px',
    overflow: 'hidden',
    config: { duration: 400 },
  });

  // Split and reformat the summary into lines for displaying
  const lines = summary.split("\n-")
  const description = lines[0];
  const displayedLines = showMore ? lines : lines.slice(0, 1);

  /**
   * Displays the media content (e.g., video) if the article has one.
   * @returns {JSX.Element|null} The JSX element for the media content or null.
   */
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
    <Fragment>
      <div className='article-container'>
        <div className='preview'>
          <img className={`article-img${topImage ? '' : '-no-img'}`} src={topImage}/>
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
          <a href={link} target='_blank'>
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
          shareUrl={link}
        />
      </div>
    </Fragment>
  );
}

export default ArticleCard;

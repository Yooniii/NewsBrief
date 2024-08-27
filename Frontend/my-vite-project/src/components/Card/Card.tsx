import { Fragment, useState, useEffect } from 'react';
import './Card.css';
import TimeAgo from 'timeago-react';
import { useSpring, animated } from 'react-spring';
import ReactPlayer from 'react-player';
import ModalComponent from '../Modal/Modal';
import { GoLinkExternal } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";

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
  loaded?: boolean;
}

const ArticleCard: React.FC<Article> = 
({ key, title, topImage, media, source, link, date, summary }) => {
  const [showMore, setShowMore] = useState(false)
  const [showModal, setShowModal] = useState(false)   

  const props = useSpring({
    opacity: showMore ? 1 : 0,
    maxHeight: showMore ? '800px' : '0px',
    overflow: 'hidden',
    config: { duration: 400 },
  });

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

  const lines = summary.split("\n-")
  const description = lines[0];
  const displayedLines = showMore ? lines : lines.slice(0, 1);

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

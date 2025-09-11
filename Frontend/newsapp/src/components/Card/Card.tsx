import { useState } from 'react';
import { useSpring, animated } from "react-spring";
import { GoLinkExternal } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import TimeAgo from 'timeago-react';
import ReactPlayer from 'react-player';
import ModalComponent from '../modal/Modal';

import { ArticleCardProps } from "../../types"
import "./Card.css";

// Article card component
export const ArticleCard = ({article} : ArticleCardProps) => {
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
  const lines = article.summary.split("\n-")
  const description = lines[0];
  const displayedLines = showMore ? lines : lines.slice(0, 1)

  const image = article.top_image
  const media = article.media.replace("[", "").replace("]", "")
  const source = article.source
  const title = article.title
  const date = article.date
  const articleLink = article.article_link

  // Display media content if article has one.
  const renderMediaContent = () => {
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
    <div className="card-container">
      <div className="preview">
        <img
          className={`card-img${image ? "" : "-no-img"}`}
          src={image}
        />
        <div className="text">
          <div className="meta-description">
            <p className="source">{source}</p>
            <h2 className="title">{title}</h2>
            <TimeAgo className="date" datetime={date} />
          </div>
          
          <div className="content-section">
            <p className="summary">{description}</p>
          </div>
          
          <a className="read-more" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Read Less" : "Read More"}
          </a>
        </div>
      </div>

      <animated.div style={props} className="expanded-content-full">
        {showMore && displayedLines.length > 1 && (
          <div className="key-points">
            <h4 className="key-points-title">Key Points:</h4>
            <ul className="summary-list">
              {displayedLines.slice(1).map((line, index) => (
                <li key={index} className="summary-item">
                  {line.trim()}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showMore && ReactPlayer.canPlay(media) && renderMediaContent()}
      </animated.div>

      <div className="btn-container">
        <a href={articleLink} target="_blank">
          <GoLinkExternal size={20} />
        </a>
        <button className="share-btn" onClick={() => setShowModal(true)}>
          <IoShareSocialOutline
            size={21}
            style={{ marginBottom: "0.01rem" }}
          />
        </button>
      </div>
      <ModalComponent
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        articleTitle={title}
        source={source}
        shareUrl={articleLink}
      />
    </div>
  );
}

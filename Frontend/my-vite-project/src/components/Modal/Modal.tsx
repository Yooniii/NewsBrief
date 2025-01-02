import { TwitterShare, FacebookShare } from 'react-share-kit';
import { useEffect } from 'react'
import { IoLinkSharp } from "react-icons/io5";
import './Modal.css'

/**
 * Social media share modal component 
 * Allows the user to share a news article via Facebook or Twitter
 */
interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  articleTitle: string;
  source: string;
  shareUrl: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onRequestClose, articleTitle, source, shareUrl }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');

    }
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <div className='modal-main-contents'>
          <div className='btn-wrapper'>
            <button className='close-btn' onClick={onRequestClose}>&times;</button>
          </div>
          <div className='modal-text'>
            <p className='modal-source'>{source}</p>
            <p className='modal-title'>{articleTitle}</p>

          </div>
          <p className='share'>Share this via</p>
          <div className='icon-container'>
              <div style={{ 
                  backgroundColor: '#c7c7c7', 
                  borderRadius: '100%', 
                  width: '75px', 
                  height: '75px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}>
              <IoLinkSharp 
                size={40}  // adjust size as needed
                color='transparent' 
                style={{backgroundColor: 'transparent'}}
                onClick={async () => await window.navigator.clipboard.writeText(shareUrl)}
              />
            </div>
            <FacebookShare url={shareUrl} round={true} size={75}/>
            <TwitterShare url={shareUrl} round={true} size={75}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent;

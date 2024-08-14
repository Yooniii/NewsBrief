import './Modal.css'
import { TwitterShare, FacebookShare } from 'react-share-kit';
import { useEffect } from 'react'

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
            <FacebookShare url={shareUrl} round={true} size={75}/>
            <TwitterShare url={shareUrl} round={true} size={75}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent;
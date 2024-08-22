import './CloseModal.css'

import { useEffect } from 'react'

interface ModalComponentProps {
  isOpen: Boolean
  onRequestClose: () => void
  // onCancel: () => void
  // onDiscard: () => void
}


const CloseModalComponent: React.FC<ModalComponentProps> = 
  ({isOpen, onRequestClose}) => {
    useEffect(() => {
      if (isOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    }, [isOpen, onRequestClose]);

    if (!isOpen) return null;


  return (
    <div className='modal-box'>
      <div className='modal-white-box'>
        <div className='modal-main-content'>
          <div className='modal-text'>
            <p className='text'>
              Do you want to discard the AI response?
            </p>
            <div className='buttons'>
              <a className='discard-btn' onClick={() => onRequestClose()}>Discard</a>
              <a className='cancel-btn' onClick={() => onRequestClose()}>Cancel</a>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CloseModalComponent;
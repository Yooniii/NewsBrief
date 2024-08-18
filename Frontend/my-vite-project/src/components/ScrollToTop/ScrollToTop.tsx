import { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollIcon from '../../assets/Scroll.png';

const ScrollToTop = () => {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathName]);
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
  return (
    <Fragment>
      <button onClick={handleScrollToTop}>
         <img src={ScrollIcon} style={{
          height: '0.8rem',
          width: '1.5rem',
          zIndex: '1',
          position: 'fixed',
          bottom: '2rem',
          right: '2.5rem',
          cursor: 'pointer'
        }}> 
        </img>
      </button>
      
    </Fragment>
    
  );
};

export default ScrollToTop;
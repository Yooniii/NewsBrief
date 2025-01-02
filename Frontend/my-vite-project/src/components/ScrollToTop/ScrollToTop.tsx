import { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";

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
         <IoIosArrowUp size={35} style={{
          zIndex: '1',
          position: 'fixed',
          bottom: '2rem',
          right: '2.5rem',
          cursor: 'pointer',
          backgroundColor: 'transparent'
        }} /> 
      </button>
    </Fragment>
    
  );
};

export default ScrollToTop;

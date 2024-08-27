import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';
import '../Home/Home.css'

const SectionLoadingCard = () => {

  const gridBoxes = Array(3).fill(null); 
  const gridCols = Array(2).fill(null); 

  return (
     <Fragment>
      <div className='article-grid' style={{gap: '1.8rem'}}>
        {gridCols.map((_, colIndex) => (
          <div key={colIndex} className='grid-col'>
            {gridBoxes.map((_, boxIndex) => (
              <div key={boxIndex} className='grid-box'>
                <CustomSkeleton width={300} height={19} variant="rounded" />
                <CustomSkeleton width={300} height={70} variant="rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='carousel-component' style={{marginLeft: '1.5rem'}}>
        <div className='carousel-slide'>
          <CustomSkeleton width={550} height={384} variant="rounded"/>
        </div>
      </div>
    </Fragment>
  );
}

export default SectionLoadingCard
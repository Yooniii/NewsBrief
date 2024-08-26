import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';

const LoadingCard = () => {
  return (
    <Fragment>
      <div className='load-card'>
        <div className='img-container'>
          <CustomSkeleton width={380} height={252} variant="rounded"/>
        </div>
          <div className="text">
            <CustomSkeleton width={800} height={120} variant="rounded"/>
            <CustomSkeleton width={800} height={24} variant="rounded"/>
            <CustomSkeleton width={800} height={72} variant="rounded"/>
          </div>
      </div>
    </Fragment>
  );
}

export default LoadingCard
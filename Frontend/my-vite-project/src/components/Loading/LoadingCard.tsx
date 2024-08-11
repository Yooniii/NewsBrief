import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';

const LoadingCard = () => {
  return (
    <Fragment>
      <div className='load-card'>
        <div className='img-container'>
          <CustomSkeleton width={336} height={252} variant="rounded" sx={{ bgcolor: 'black' }}/>
        </div>
          <div className="text">
            <CustomSkeleton width={607} height={120} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={607} height={24} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={607} height={72} variant="rounded" sx={{ bgcolor: 'black' }}/>
          </div>
      </div>
    </Fragment>
  );
}

export default LoadingCard
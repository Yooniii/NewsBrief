import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';

function LoadingCard() {
  return (
    <Fragment>
      <div className="article-container">
        <CustomSkeleton width={352} height={280} variant="rounded" sx={{ bgcolor: 'black' }}/>
          <div className="text">
            <CustomSkeleton width={643} height={104} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={643} height={24} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={643} height={144} variant="rounded" sx={{ bgcolor: 'black' }}/>
          </div>
      </div>
    </Fragment>
  );
}

export default LoadingCard
import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';

const LoadingCard = () => {
  return (
    <Fragment>
      <div className="article-container">
        <CustomSkeleton width={336} height={240} variant="rounded" sx={{ bgcolor: 'black' }}/>
          <div className="text">
            <CustomSkeleton width={333} height={104} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={333} height={24} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={333} height={144} variant="rounded" sx={{ bgcolor: 'black' }}/>
          </div>
      </div>
    </Fragment>
  );
}

export default LoadingCard
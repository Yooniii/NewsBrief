import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';

function LoadingCard() {
  return (
    <Fragment>
      <div className="skeletonBlock">
        <CustomSkeleton width={464} height={320} variant="rounded" sx={{ bgcolor: 'black' }}/>
          <div className="contentBlock">
            <CustomSkeleton width={930} height={130} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={930} height={31} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={930} height={31} variant="rounded" sx={{ bgcolor: 'black' }}/>
            <CustomSkeleton width={930} height={31} variant="rounded" sx={{ bgcolor: 'black' }}/>
          </div>
      </div>
    </Fragment>
  );
}

export default LoadingCard
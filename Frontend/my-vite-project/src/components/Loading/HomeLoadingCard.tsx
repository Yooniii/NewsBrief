import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';

const HomeLoadingCard = () => {
  return (
    <Fragment>
      <div className='loading-wrapper' >
        <div className='loading-box'>
          <CustomSkeleton width={285} height={150} variant="rounded"/>
          <div className='loading-text'>
            <CustomSkeleton width={285} height={24} variant="rounded"/>
            <CustomSkeleton width={285} height={100} variant="rounded"/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default HomeLoadingCard
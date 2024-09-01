import { Fragment } from 'react'
import CustomSkeleton from './Skeleton';
import '../Home/Home.css'

const HeadlineLoadingCard = () => {
  return (
    <div className='headline-row'>
      <div className='headline-box'>
        <CustomSkeleton width={420} height={390} variant="rounded"/>
        <div className='article-details'>
          <CustomSkeleton width={400} height={24} variant="rounded"/>
          <div className='main-text-box'>
            <CustomSkeleton width={400} height={50} variant="rounded"/>
            <CustomSkeleton width={400} height={120} variant="rounded"/>
          </div>
        </div>
      </div>

      <div className='headline-col'>
        <Fragment>
          <div className='headline-col-box'>
            <CustomSkeleton width={96} height={64} variant="rounded" />
            <div className='article-details'>
              <CustomSkeleton width={200} height={20} variant="rounded" />
              <CustomSkeleton width={200} height={90} variant="rounded" />
            </div>
          </div>
          <div className='headline-col-box'>
            <CustomSkeleton width={96} height={64} variant="rounded" />
            <div className='article-details'>
              <CustomSkeleton width={200} height={20} variant="rounded" />
              <CustomSkeleton width={200} height={90} variant="rounded" />
            </div>
          </div>
          <div className='headline-col-box'>
            <CustomSkeleton width={96} height={64} variant="rounded" />
            <div className='article-details'>
              <CustomSkeleton width={200} height={20} variant="rounded" />
              <CustomSkeleton width={200} height={90} variant="rounded" />
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default HeadlineLoadingCard
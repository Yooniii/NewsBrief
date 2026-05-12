import CustomSkeleton from './Skeleton';

const SectionLoadingCard = () => {
  return (
    <div className='politics-content'>
      <div className='politics-grid'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='politics-item'>
            <CustomSkeleton width="40%" height={16} variant="rounded"/>
            <CustomSkeleton width="100%" height={48} variant="rounded" style={{ margin: '0.8rem 0 0' }}/>
          </div>
        ))}
      </div>
      <div className='politics-carousel'>
        <div className='politics-slide'>
          <CustomSkeleton width="100%" height={400} variant="rounded"/>
        </div>
      </div>
    </div>
  );
}

export default SectionLoadingCard;
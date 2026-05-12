import CustomSkeleton from './Skeleton';

const LoadingCard = () => {
  return (
    <div className='loading-card-container'>
      <div className='loading-preview'>
        <div className='loading-img-container'>
          <CustomSkeleton width="100%" height={210} variant="rounded"/>
        </div>
        <div className="loading-text">
          <div className="loading-meta">
            <CustomSkeleton width={80} height={16} variant="rounded" sx={{className: "loading-source"}}/>
            <CustomSkeleton width="100%" height={32} variant="rounded" sx={{className: "loading-title"}}/>
            <CustomSkeleton width={120} height={14} variant="rounded" sx={{className: "loading-date"}}/>
          </div>
          <div className="loading-content">
            <CustomSkeleton width="100%" height={18} variant="rounded" sx={{className: "loading-summary"}}/>
            <CustomSkeleton width="80%" height={18} variant="rounded" sx={{className: "loading-summary"}}/>
          </div>
          <CustomSkeleton width={80} height={14} variant="rounded" sx={{className: "loading-read-more"}}/>
        </div>
      </div>
    </div>
  );
}

export default LoadingCard
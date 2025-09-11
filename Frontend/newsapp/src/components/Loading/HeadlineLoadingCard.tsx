import CustomSkeleton from './Skeleton';

const HeadlineLoadingCard = () => {
  return (
    <div className="hero-content">
      <div className="hero-main">
        <div className="hero-image">
          <CustomSkeleton width="100%" height={500} variant="rounded" />
        </div>
      </div>
      <div className="hero-sidebar">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="hero-sidebar-item"></div>
        ))}
      </div>
    </div>
  );
}

export default HeadlineLoadingCard;
import CustomSkeleton from './Skeleton';

const HomeLoadingCard = () => {
  return (
    <div className='article-card'>
      <div className='article-image'>
        <CustomSkeleton width="100%" height={200} variant="rounded"/>
      </div>
      <div className='article-content'>
        <CustomSkeleton width="30%" height={16} variant="rounded"/>
        <CustomSkeleton width="90%" height={24} variant="rounded" style={{ margin: '0.8rem 0' }}/>
        <CustomSkeleton width="100%" height={60} variant="rounded"/>
      </div>
    </div>
  );
}

export default HomeLoadingCard;
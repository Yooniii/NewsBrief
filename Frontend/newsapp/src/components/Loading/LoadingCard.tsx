import CustomSkeleton from './Skeleton';

const LoadingCard = () => {
  return (
    <div className='load-card'>
      <div className='img-container'>
        <CustomSkeleton width={350} height={252} variant="rounded"/>
      </div>
      <div className="text">
        <CustomSkeleton width={750} height={120} variant="rounded"/>
        <CustomSkeleton width={750} height={24} variant="rounded"/>
        <CustomSkeleton width={750} height={72} variant="rounded"/>
      </div>
    </div>
  );
}

export default LoadingCard
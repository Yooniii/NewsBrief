import CustomSkeleton from './Skeleton';
import '../home/Home.css';

const HeadlineLoadingCard = () => {
  return (
    <div className='hero-content'>
      <div className='hero-main'>
        <div className='hero-image'>
          <CustomSkeleton width="100%" height={500} variant="rounded"/>
        </div>
      </div>
      <div className='hero-sidebar'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='hero-sidebar-item'>
            <CustomSkeleton width={120} height={80} variant="rounded"/>
            <div className='hero-sidebar-content'>
              <CustomSkeleton width="60%" height={16} variant="rounded"/>
              <CustomSkeleton width="100%" height={48} variant="rounded" style={{ margin: '0.5rem 0 0' }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeadlineLoadingCard;
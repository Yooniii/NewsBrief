import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Skeleton.css'; 

const CustomSkeleton = ({ width, height, variant, sx }: any) => {
  const className = `skeleton ${variant}`;

  return (
    <Skeleton
      width={width}
      height={height}
      style={{ ...sx }} // Use the style prop for inline styles
      className={className}
    />
  );
}

export default CustomSkeleton;
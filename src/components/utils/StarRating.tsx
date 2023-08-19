import React from 'react';

interface StarProps {
  key: string;
}

const Star: React.FC<StarProps> = ({ key }) => {
  return <span key={key}>⭐</span>;
};

interface RenderStarsProps {
  count: number;
}

const RenderStars: React.FC<RenderStarsProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Star key={`star-${index}`} />
      ))}
    </>
  );
};

interface StarRatingProps {
  count: number;
}

const StarRating: React.FC<StarRatingProps> = ({ count }) => {
  return (
    <div className="flex justify-center items-center gap-[2px]">
      <RenderStars count={count} />
    </div>
  );
};

export default StarRating;

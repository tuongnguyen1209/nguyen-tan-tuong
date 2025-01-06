import React, { useEffect, useState } from 'react';
import noImage from '../../assets/no-img.svg';

interface Props extends React.InputHTMLAttributes<HTMLImageElement> {
  defaultImage?: string;
}

const Image: React.FC<Props> = ({ src, defaultImage, ...rest }) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    setCurrentSrc(defaultImage || noImage);
  };

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <>
      <img {...rest} src={currentSrc} onError={handleError} />
    </>
  );
};

export default Image;

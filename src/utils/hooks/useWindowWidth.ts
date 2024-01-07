import { useState, useEffect } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  return { width };
};

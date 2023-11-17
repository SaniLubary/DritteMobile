import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const isSmallScreen = () => {
    const { width } = screenSize;
    return width < 360;
  };

  const isMediumScreen = () => {
    const { width } = screenSize;
    return width >= 360 && width < 768;
  };

  const isLargeScreen = () => {
    const { width } = screenSize;
    return width >= 768;
  };

  const handleScreenSizeChange = () => {
    setScreenSize({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  };

  useEffect(() => {
    const dimensionsHandler = Dimensions.addEventListener('change', handleScreenSizeChange);

    return () => dimensionsHandler.remove();
  }, []);

  return {
    screenSize,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
};

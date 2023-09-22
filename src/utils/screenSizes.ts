import { Dimensions } from 'react-native';

const smallScreenThreshold = 320;
const regularScreenThreshold = 375;
const largeScreenThreshold = 414;

const screenSize = () => {
  const window = Dimensions.get('window');
  const { width, height } = window;

  if (width <= smallScreenThreshold) {
    return 'small';
  } else if (width <= regularScreenThreshold) {
    return 'regular';
  } else if (width <= largeScreenThreshold) {
    return 'large';
  }

  return 'unknown'
};


export { screenSize }
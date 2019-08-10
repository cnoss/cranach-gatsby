
const breakpoints = {
  sm: '720px',
  md: '1024px',
  lg: '1400px',
};

const mediaQueryCreator = (props) => {
  /* TODO: make it more dynamic and support more mediaQuery features */
  const options = {
    device: 'only screen',
    minWidth: 0,
  };

  const mergedOptions = Object.assign({}, options, props);

  return `@media ${mergedOptions.device} and (min-width: ${mergedOptions.minWidth})`;
};

export const mediaQuery = Object.entries(breakpoints).reduce((acc, pair) => {
  acc[pair[0]] = (options = {}) => `${mediaQueryCreator({ ...options, minWidth: pair[1] })}`;
  return acc;
}, {});

export default {};

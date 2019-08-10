
const breakpoints = {
  sm: '720px',
  md: '1024px',
  lg: '1400px',
};

export const mediaQuery = Object.entries(breakpoints).reduce((acc, pair) => {
  acc[pair[0]] = `@media only screen and (min-width: ${pair[1]})`;
  return acc;
}, {});

export default {};

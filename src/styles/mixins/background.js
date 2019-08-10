
export const bgGradient = () => `
  & > p {
    position: relative;
    z-index: 200;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0));
    z-index: 0;
  }
`;

export default {};

import styled from 'styled-components';

export const PebbleSkeleton = styled.div`
  position: relative;
  border: none;
  padding: 0;
  box-shadow: none;
  pointer-events: none;
  background: rgba(61, 112, 178, 0.1);
  height: 6.25rem;
  width: 6.25rem;

  ::before {
    content: '';
    width: 0%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    background: rgba(61, 112, 178, 0.1);
    animation: 3000ms ease-in-out skeleton infinite;
  }

  @keyframes skeleton {
    0% {
      width: 0%;
      left: 0;
      right: auto;
      opacity: 0.3;
    }
    20% {
      width: 100%;
      left: 0;
      right: auto;
      opacity: 1;
    }
    28% {
      width: 100%;
      left: auto;
      right: 0;
    }
    51% {
      width: 0%;
      left: auto;
      right: 0;
    }
    58% {
      width: 0%;
      left: auto;
      right: 0;
    }
    82% {
      width: 100%;
      left: auto;
      right: 0;
    }
    83% {
      width: 100%;
      left: 0;
      right: auto;
    }
    96% {
      width: 0%;
      left: 0;
      right: auto;
    }
    100% {
      width: 0%;
      left: 0;
      right: auto;
      opacity: 0.3;
    }
  }
`;

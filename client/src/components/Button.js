
// TUTORIAL:
// https://www.youtube.com/watch?v=c5-Vex3ufFU

import React from 'react';
import styled, {css, keyframes} from 'styled-components';

import { Wrapper } from './styled';

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// ALWAYS KEEP OUTSIDE THE COMPONENT = PERF
const StyledButton = styled.button`
  color: ${props => props.primary ? 'red' : '#FFF'};
  background-color: ${ ({primary}) => primary ? '#000' : '#333' };

  padding: 1rem;
  outline: none;
  border: none;
  animation: 1s ${FadeIn} ease-in;

  margin: ${ ({margin}) => margin || '2rem'};
  

  ${({primary}) => primary && css`
    border-color: palevioletred;
    box-shadow: 2px 2px 3px;
  `}

  &:hover {
    color: white;
    background-color: limegreen;
  }

  /* reference an actual class:  */
  & .someClass {
    color: blue;
  }
`;

// To Extend styles: wrap in fn ()
// Maybe imported original from a library
// eg Link from router - called StyledLink
const SuperButton = styled(StyledButton)`
  font-size: 2rem;
`;

const Button = ({primary, margin, children}) => {

  // ALWAYS KEEP OUTSIDE THE COMPONENT = PERF

  return (
    <Wrapper>
      <StyledButton primary={primary} margin={margin}>{children}</StyledButton>
      
      <SuperButton primary={primary}>
        {children}
        <span className="someClass"> test</span>
      </SuperButton>
    </Wrapper>
    )
}

export default Button;
import styled, { keyframes } from 'styled-components'

const popin = keyframes`
  0% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 1; transform: scale(1); }
  `

export const StyledHeader = styled.header`
  background: var(--dark-color, #001230);
  color: var(--light-color, #F4FEFF);
  display:flex;
  flex-wrap:wrap;
  justify-content:flex-start;
  align-items:center
  padding:.5rem;
`
export const StyledGrid = styled.div`
  display:flex;
  flex-wrap:wrap;
  flex-grow:1;
  justify-content: center;
  padding:1rem;
`
export const StyledLinkButton = styled.button`
  background: var(--light-color, #F4FEFF);
  border-radius: .5rem;
  box-shadow: .3rem .3rem .5rem var(--dark-color, #001230);
  color: var(--bg-color, #4A5A6D);
  cursor:pointer;
  display:flex;
  flex-wrap:wrap;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 1rem;
  margin: .3rem;
  font-size: calc(1vw + 1vh + .5vmin);
  transform-origin: center;
  animation: ${popin} .3s ease;
  
  &:hover {
      box-shadow: .1rem .1rem .3rem var(--dark-color, #001230);
      transform: translate(1px, 1px);
      color: var(--primary-color, #1EA896);
  }
`
export const StyledHeaderText = styled.h1`
  color: var(--light-color, #F4FEFF);
  display:inline;
  font-weight: bold;
  padding:.5rem;
  font-size:2.5rem;
`

export const Styledh2 = styled.h2`
  color: var(--light-color, #F4FEFF);
  font-weight: bold;
  text-align:center;
`

export const StyledBeerPage = styled.div`
  text-align:center;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
`

export const StyledPaddedDiv = styled.div`
  padding:2rem;
`

export const StyledAddButton = styled.button`
background-color: var(--primary-color, #1EA896);
color: var(--dark-color, #001230);
border-radius: .5rem;
cursor:pointer;
display:flex;
flex-wrap:wrap;
align-items: center;
justify-content: center;
font-weight: bold;
margin: .3rem;
padding:1rem;
font-size: calc(1vw + 1vh + .5vmin);
transform-origin: center;
animation: ${popin} .3s ease;

&:hover {
    background-color: var(--light-color, #F4FEFF);
  }
`

export const StyledInputRegion = styled.div`
  margin:.5rem;
`

export const StyledCategory = styled.div`
  display:flex;
  flex-direction:column;
`
export const StyledSmallBtnArea = styled.div`
  display:flex;
  justify-content:center;
`

export const StyledSmallBtn = styled.button`
  font-size: 90%;
  cursor:pointer;
  padding:.5rem;
  margin:.3rem;
  border-radius: .5rem;
  border:none;
  color: var(--light-color, #F4FEFF);

  &:hover {
    background: var(--light-color, #F4FEFF);
    color: var(--primary-color, #1EA896);
  }

  background: ${props => props.delete ?
    "#E26D5C" : "var(--primary-color, #1EA896)"}
`

export const StyledInput = styled.input`
border-radius: .5rem;
padding: .25rem;
font-size: calc(1vw + 1vh + .5vmin);
color: var(--primary-color, #1EA896);
`

export const StyledBeerInputs = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
`
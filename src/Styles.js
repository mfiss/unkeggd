import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

const popin = keyframes`
  0% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 1; transform: scale(1); }
  `

export const StyledHeader = styled.header`
  background: var(--dark-color, #001230);
  color: var(--primary-color, #1EA896);
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
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

export const StyledHeaderText = styled.h1`
  color: var(--primary-color, #1EA896);
  display:inline;
  font-weight: bold;
  padding:.5rem;
  font-size:2.5rem;

  &:hover {
    color: var(--light-color, #F4FEFF);
  }
`

export const Styledh2 = styled.h2`
  color: var(--light-color, #F4FEFF);
  font-weight: bold;
  text-align:center;
`

export const StyledSmallText = styled.div`
    font-size:75%;
    text-align:center;
`

export const StyledBeerPage = styled.div`
  text-align:center;
  display:flex;
  flex-wrap:wrap;
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
//Button props
// size: big / small
// color: light / dark / delete (red)
//      default is green

export const StyledButton = styled.button`
  flex: 1 1;
  border-radius: .25rem;
  box-shadow: .3rem .3rem .5rem var(--dark-color, #001230);
  align-items: center;
  justify-content: center;
  transform-origin: center;
  animation: ${popin} .5s ease;
  background: ${props => {
   switch (props.color) {
    case 'light':
    return 'var(--light-color, #F4FEFF)'
    case 'dark':
    return 'var(--dark-color, #001230)'
    case 'delete': 
    return"#E26D5C"
    default :
    return "var(--primary-color, #1EA896)"
   }
  }};
  font-size: ${props => props.size === 'small' ? "75%" : "100%"};
  cursor:pointer;
  padding: ${props => props.size === 'big' ? '1rem' : '.5rem'};
  margin:.3rem;
  border-radius: .25rem;
  border:none;
  color: ${props => props.color === 'light' ? 'var(--dark-color, #001230)' : 'var(--light-color, #F4FEFF)'};
  

  &:hover {
    background: var(--light-color, #F4FEFF);
    color: var(--primary-color, #1EA896);
    box-shadow: .1rem .1rem .3rem var(--dark-color, #001230);
    transform: translate(1px, 1px);
  }
`

export const StyledInput = styled.input`
margin:auto;
border-radius: .25rem;
padding: .25rem;
font-size: calc(1vw + 1vh + .5vmin);
color: var(--primary-color, #1EA896);
transform-origin: center;
animation: ${popin} .5s ease;
`

export const StyledBeerInputs = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-around;
`

export const StyledSelect = styled.select`
    display: block;
    font-size: calc(1vw + 1vh + .5vmin);
    color: var(--primary-color,#1EA896);
    line-height: 1.3;
    padding: .25rem 1.4rem .25rem .8rem;
    max-width: 100%; 
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .25rem;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat, repeat;
    background-position: right .7rem top 50%, 0 0;
    background-size: .65rem auto, 100%;
    transform-origin: center;
    animation: ${popin} .5s ease;
`

export const FlexLink = styled(Link)`
display: ${props => props.flex ? 'flex' : 'inline-block'}
`
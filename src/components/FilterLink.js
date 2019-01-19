import React from 'react'
import { FlexLink } from '../Styles'
import { StyledButton } from '../Styles'

const FilterLink = props => (
  <FlexLink to={`${props.filter}`} flex={props.flex}>
    <StyledButton
      size={props.size}
      color={props.color}
      value={props.value}
      name={props.name}
      onClick={props.handleClick}
    >
      {props.value}
    </StyledButton>
  </FlexLink>
)
export default FilterLink

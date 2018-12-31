import React, { Component } from 'react'
import FilterLink from './FilterLink'
import { StyledInput } from '../Styles'

export class Input extends Component {

    render() {
        return (
            <React.Fragment>
                <StyledInput
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    type="text"
                    onKeyDown={ e => {
                            if (e.key === 'Enter') {
                                this.props.handleClick(e)}}}
                    value={this.props.inputValue}
                    onChange={e => this.props.inputFunction(e)}
                />
                <FilterLink 
                    name={this.props.name} 
                    filter={this.props.link} 
                    value={this.props.value}
                    handleClick = {this.props.handleClick}
                />
        </React.Fragment>
        )
    }
}
    export default Input
import React, { Component } from "react"
import { postSomething, deleteSomething } from '../actions'
import { StyledCategory,
         StyledSmallBtnArea,
         StyledButton } from '../Styles'
import FilterLink from '../components/FilterLink'
import { StyledInput } from '../Styles'

export class MapItems extends Component {
    state = { editing: false }

    editButton = () => {
        if(this.props.loaded === 'categories') {
            return (
                <StyledButton
                    size={'small'}
                    value={this.props.r.name}
                    onClick={e => this.handleEditClick(e)}>
                    Edit
                </StyledButton>
            )
        } else { return null }
    }

    handleEditClick = e => {
        this.setState({
            editing: (!this.state.editing),
            value: e.target.value
        })
    }

    handleInputChange = e => {
        this.setState({ value : e.target.value });
    };

    handleConfirmClick = () => {
        let body = {
            url : this.props.r.url,
            name : this.state.value
        }
        this.props.editFunction(postSomething(body))
    }

    handleDeleteClick = () => {
        this.props.editFunction(deleteSomething(this.props.r.url))
        this.props.fetchData()
        
    }    

    render() {
        if(this.state.editing) {
            return (
                <StyledCategory key = {this.props.i}>
                    <StyledInput
                        type="text"
                        onKeyDown={ e => {
                                if (e.key === 'Enter') {
                                this.handleConfirmClick()}}}
                        value={this.state.value}
                        name= {this.props.r.name}
                        onChange={e => this.handleInputChange(e)}
                     />
                     <StyledSmallBtnArea>
                     <FilterLink
                        size={'small'}
                        handleClick={this.handleConfirmClick}
                        value={'Confirm'}
                        name={'Confirm'}
                        filter={'/Categories'}
                        flex={'true'}
                     />
                     <StyledButton 
                        size={'small'} 
                        color={'delete'} 
                        onClick={this.handleEditClick}
                        value={''} >
                        Cancel
                    </StyledButton>
                    </StyledSmallBtnArea>
                </StyledCategory>
            )
        }
        else {
            return (
            <StyledCategory>
                <FilterLink 
                    size={'big'} 
                    color={'light'} 
                    filter={this.props.whereToLink} 
                    value={this.props.r.name} 
                    handleClick={e => this.props.handleClick(e)}
                    flex={'true'}
                    />
                <StyledSmallBtnArea>
                    {this.editButton()}
                    <StyledButton
                        size={'small'} 
                        color={'delete'}
                        onClick={this.handleDeleteClick}>
                        Delete
                    </StyledButton>
                </StyledSmallBtnArea>
            </StyledCategory>          
        )}
    }
}
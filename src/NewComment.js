import React, {Component} from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { handleNewComment } from './actions'
export class NewComment extends Component {

    handleChange = event => {
        this.props.handleNewComment(event.target.value)
    }

    sendComment = () => {
        this.props.sendComment(this.props.newComment)
        this.props.handleNewComment('')
        this.refs.messageBox.focus();
    }

    render() {
        return (
            <div className="ui form">
                <div className='field'>
                    <textarea ref="messageBox" rows={4} value={ this.props.newComment } 
                        onChange={this.handleChange}></textarea>
                </div>
                <Button primary animated onClick={this.sendComment} className="right floated">
                    <Button.Content visible>Send</Button.Content>
                    <Button.Content hidden><Icon name='save' /></Button.Content>
                </Button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        newComment: state.newComment
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleNewComment: (value) => dispatch( handleNewComment(value) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
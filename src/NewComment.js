import React, {Component} from 'react'
import { Button, Icon } from 'semantic-ui-react'

class NewComment extends Component {
   
    state = {
        newComment: ''
    }
    
    handleChange = event => {
        this.setState({
            newComment: event.target.value
        })
    }

    sendComment = () => {
        this.props.sendComment(this.state.newComment)
        this.setState({ newComment: '' })
        this.refs.messageBox.focus();
    }

    render() {
        return (
            <div className="ui form">
                <div className='field'>
                    <textarea ref="messageBox" rows={4} value={ this.state.newComment } 
                        onChange={this.handleChange}></textarea>
                </div>
                <Button primary animated onClick={this.sendComment} className="right floated">
                    <Button.Content visible>Comment</Button.Content>
                    <Button.Content hidden><Icon name='save' /></Button.Content>
                </Button>
            </div>
        )
    }

}

export default NewComment
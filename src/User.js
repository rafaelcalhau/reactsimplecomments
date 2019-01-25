import React, { Component } from 'react'
import { Icon, Label } from 'semantic-ui-react'

class User extends Component {
    logout = e => {
        this.props.logout()
    }

    render() {
        return (
            <div>
                <Label className="fluid" attached='top'>
                    <Icon name='user' />
                    Logged in as { this.props.email }
                    <Icon link name='sign out alternate' onClick={this.logout} className="right floated" />
                </Label>
            </div>
        )
    }
}

export default User
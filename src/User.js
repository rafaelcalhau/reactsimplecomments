import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

const User = ({ email, logout }) => {
    return (
        <div>
            <Label className="fluid" attached='top'>
                <Icon name='user' />
                Logged in as { email }
                <Icon link name='sign out alternate' onClick={ () => logout() } className="right floated" />
            </Label>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email
    }
}

export default connect(mapStateToProps)(User)
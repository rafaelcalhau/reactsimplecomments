import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Form, Icon, Message } from 'semantic-ui-react'

import { handleLoginInputChange } from './actions'

class Login extends Component {
    constructor(props) {
        super(props)

        this.errorMessages = {
            'auth/email-already-in-use': 'The email address is already in use by another account.',
            'auth/invalid-email': 'The email address is badly formatted.',
            'auth/user-not-found': 'There is no user record corresponding to this identifier. The user may have been deleted.',
            'auth/weak-password': 'Password should be at least 6 characters.',
            'auth/wrong-password': 'The password is invalid or the user does not have a password.'
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.props.handleLoginInputChange({ name, value })
    }

    handleDismiss = () => {
        this.props.handleDismiss()
    }

    handleSubmit = e => {
        e.preventDefault();

        const {email, password } = this.props.fields

        if (email.length === 0 || password.length === 0) {
            return
        }

        this.props.login( email, password )
    }

    handleSignUp = e => {
        e.preventDefault();
        
        const {email, password } = this.props.fields

        if (email.length === 0 || password.length === 0) {
            return
        }

        this.props.signup( email, password )
    }

    render() {
        return (
            <Form>
                {
                    !this.props.isAuthErrorDismissed
                    && <Message
                            color='orange'
                            onDismiss={this.handleDismiss}
                            header='Error:'
                            content={this.errorMessages[this.props.authError]} />
                }
                <Form.Group className='centered-block'>
                    <Form.Input
                        fluid
                        id='form-input-email'
                        name='email'
                        placeholder='E-mail Address'
                        type='email'
                        width={5}
                        onChange={this.handleChange}
                        value={this.props.fields.email}
                    />
                    <Form.Input
                        fluid
                        id='form-input-password'
                        name='password'
                        placeholder='Password'
                        type='password'
                        width={5}
                        onChange={this.handleChange}
                        value={this.props.fields.password}
                    />
                    <div className='login-buttons'>
                        <Form.Button type='submit' primary
                            loading={this.props.isAuthLoading} 
                            onClick={this.handleSubmit}>
                            <Icon name='lock' />
                            Login
                        </Form.Button>
                        <Form.Button type='button' basic
                            color='blue'
                            loading={this.props.isSignUpLoading} 
                            onClick={this.handleSignUp}>
                            <Icon name='checkmark' />
                            Sign Up
                        </Form.Button>
                    </div>
                </Form.Group>
                <Divider />
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.authError,
        fields: {
            email: state.login.email,
            password: state.login.password,
        },
        isAuthError: state.isAuthError,
        isAuthErrorDismissed: state.isAuthErrorDismissed,
        isAuthLoading: state.isAuthLoading,
        isLoggedIn: state.isLoggedIn,
        isSignUpLoading: state.isSignUpLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLoginInputChange: (value) => dispatch( handleLoginInputChange(value) ) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
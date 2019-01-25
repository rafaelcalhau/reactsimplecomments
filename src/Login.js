import React, { Component } from 'react'
import { Divider, Form, Icon, Message } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.errorMessages = {
            'auth/email-already-in-use': 'The email address is already in use by another account.',
            'auth/invalid-email': 'The email address is badly formatted.',
            'auth/user-not-found': 'There is no user record corresponding to this identifier. The user may have been deleted.',
            'auth/weak-password': 'Password should be at least 6 characters.',
            'auth/wrong-password': 'The password is invalid or the user does not have a password.'
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDismiss = () => {
        this.props.handleDismiss()
    }

    handleSubmit = e => {
        e.preventDefault();

        const {email, password } = this.state

        if (email.length === 0 || password.length === 0) {
            return
        }

        this.props.login( email, password )
    }

    handleSignUp = e => {
        e.preventDefault();
        
        const {email, password } = this.state

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
                        value={this.state.email}
                    />
                    <Form.Input
                        fluid
                        id='form-input-password'
                        name='password'
                        placeholder='Password'
                        type='password'
                        width={5}
                        onChange={this.handleChange}
                        value={this.state.password}
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

export default Login
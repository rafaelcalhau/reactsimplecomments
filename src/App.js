import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Header, Icon, Segment } from 'semantic-ui-react'

import Login from './Login'
import Comments from './Comments'
import NewComment from './NewComment'
import User from './User'
class App extends Component {
	state = {
		authError: '',
		comments: {},
		isAuthError: false,
		isAuthErrorDismissed: true,
		isAuthLoading: false,
		isLoading: false,
		isLoggedIn: false,
		isSignUpLoading: false,
		user: {
			id: null,
			email: null
		}
	}

	componentDidMount() {
		// Life cycle's component

		const { auth, database } = this.props

		this.setState({ isLoading: true })
		this.comments = database.ref('comments')

		// Everytime database value is changed, we'll have a new snapshot
		this.comments.on('value', snapshot => {
			this.setState({
				comments: snapshot.val(),
				isLoading: false
			})
		})

		auth.onAuthStateChanged( user => {
			if (user) {
				this.setState({ 
					isAuthErrorDismissed: true,
					isAuthLoading: false,
					isLoggedIn: true, 
					isSignUpLoading: false,
					user: {
						id: user.uid,
						email: user.email
					} 
				})
			} else {
				this.setState({
					isAuthErrorDismissed: true,
					isLoggedIn: false,
					isSignUpLoading: false,
					user: {
						id: null,
						email: null
					}
				})
			}
		})
	}

	handleDismiss = () => {
        this.setState({ isAuthErrorDismissed: true })
    }

	login = async(email, password) => {
		const { auth } = this.props

		this.setState({
			authError: '',
			isAuthError: false,
			isAuthLoading: true
		})
		
		try {

			// Promisse (Async request)
			// using await, we make the runtime wait the promisse response
			const { additionalUserInfo } = await auth.signInWithEmailAndPassword(email, password)
			this.setState({
				isAuthLoading: false,
				isLoggedIn: true, 
				user: { 
					id: additionalUserInfo.user.uid,
					email: additionalUserInfo.user.email
				} 
			})

		} catch (err) {
			this.setState({
				authError: err.code,
				isAuthError: true,
				isAuthErrorDismissed: false,
				isAuthLoading: false
			})
		}
	}

	logout = () => {
		const { auth } = this.props
		
		try {
			auth.signOut()
		} catch(err) {
			console.log(err)
		}
	}

	sendComment = comment => {
		if (comment === '') {
			return false;
		}

		const id = this.props.database.ref().child('comments').push().key
		const comments = {}

		comments['comments/' + id] = { 
			comment,
			email: this.state.user.email,
			userId: this.state.user.id
		}
		
		this.props.database.ref().update(comments)
	}

	signup = async(email, password) => {
		const { auth } = this.props

		this.setState({
			authError: '',
			isAuthError: false,
			isSignUpLoading: true
		})
		
		try {
			// Promisse (Async request)
			// using await, we make the runtime wait the promisse response
			const { additionalUserInfo } = await auth.createUserWithEmailAndPassword(email, password)
			this.setState({ 
				isSignUpLoading: false,
				isLoggedIn: true, 
				user: { 
					id: additionalUserInfo.user.uid,
					email: additionalUserInfo.user.email
				}
			})

		} catch (err) {
			this.setState({
				authError: err.code,
				isAuthError: true,
				isAuthErrorDismissed: false,
				isSignUpLoading: false
			})
		}
	}

	render() {
		return (
			<Container>
				<br />
				<Row>
					<Col sm="12" md={{ size: 10, offset: 1 }}>
						<Segment.Group piled>
							<Segment>
								{ this.state.isLoggedIn && <br /> }
								<Header as='h2' icon textAlign='center'>
									<Icon name='comment alternate outline' />
									React Simple Comments
									<Header.Subheader>
										My first "comments app" made with ReactJS.
									</Header.Subheader>
								</Header>

								{
									!this.state.isLoggedIn 
										? 
											<Login login={this.login} signup={this.signup} 
												isAuthError={this.state.isAuthError}
												isAuthErrorDismissed={this.state.isAuthErrorDismissed}
												isAuthLoading={this.state.isAuthLoading}
												isLoggedIn={this.state.isLoggedIn}
												isSignUpLoading={this.state.isSignUpLoading}
												authError={this.state.authError}
												handleDismiss={this.handleDismiss} /> 
										: 
											<div>
												<User email={this.state.user.email} logout={this.logout} />
												<NewComment sendComment={this.sendComment} />
											</div>
								}

								<Comments comments={this.state.comments} className="clearedbox" />

								{this.state.isLoading && <p><br/>Loading...</p>}
							</Segment>
						</Segment.Group>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;

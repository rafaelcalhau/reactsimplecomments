import React, { Component } from 'react'
import { auth, database } from './firebase'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { Header, Icon, Segment } from 'semantic-ui-react'

import { isAuthErrorDismissed, setComments, setLoading, setState } from './actions'
import Login from './Login'
import Comments from './Comments'
import NewComment from './NewComment'
import User from './User'

class App extends Component {

	componentDidMount() {
		this.props.setLoading(true)
		this.comments = database.ref('comments')

		// Everytime database value is changed, we'll have a new snapshot
		this.comments.on('value', snapshot => {
			this.props.setComments(snapshot.val())
			this.props.setLoading(false)
		})

		auth.onAuthStateChanged( user => {
			if (user) {
				this.props.setState({ 
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
				this.props.setState({
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
		this.props.isAuthErrorDismissed(true)
    }

	login = async(email, password) => {

		this.props.setState({
			authError: '',
			isAuthError: false,
			isAuthLoading: true
		})
		
		try {

			// Promisse (Async request)
			// using await, we make the runtime wait the promisse response
			const { additionalUserInfo } = await auth.signInWithEmailAndPassword(email, password)

			this.props.setState({
				isAuthLoading: false,
				isLoggedIn: true, 
				user: { 
					id: additionalUserInfo.user.uid,
					email: additionalUserInfo.user.email
				} 
			})

		} catch (err) {
			this.props.setState({
				authError: err.code,
				isAuthError: true,
				isAuthErrorDismissed: false,
				isAuthLoading: false
			})
		}
	}

	logout = () => {		
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

		const id = database.ref().child('comments').push().key
		const comments = {}

		comments['comments/' + id] = { 
			comment,
			email: this.props.user.email,
			userId: this.props.user.id
		}
		
		database.ref().update(comments)
	}

	signup = async(email, password) => {
		
		this.props.setState({
			authError: '',
			isAuthError: false,
			isSignUpLoading: true
		})
		
		try {
			// Promisse (Async request)
			// using await, we make the runtime wait the promisse response
			const { additionalUserInfo } = await auth.createUserWithEmailAndPassword(email, password)

			this.props.setState({ 
				isSignUpLoading: false,
				isLoggedIn: true, 
				user: { 
					id: additionalUserInfo.user.uid,
					email: additionalUserInfo.user.email
				}
			})

		} catch (err) {
			this.props.setState({
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
								{ 
									//this.state.isLoggedIn && <br /> 
									this.props.isLoggedIn && <br /> 
								}
								<Header as='h2' icon textAlign='center'>
									<Icon name='comment alternate outline' />
									React Simple Comments
									<Header.Subheader>
										My first "comments app" made with ReactJS.
									</Header.Subheader>
								</Header>

								{
									!this.props.isLoggedIn 
										? 
											<Login login={this.login} 
													signup={this.signup} 
													handleDismiss={this.handleDismiss} /> 
										: 
											<div>
												<User logout={this.logout} />
												<NewComment sendComment={this.sendComment} />
											</div>
								}

								{
									this.props.isLoading && <p><br/>Loading...<br/></p>
								}

								<Comments className="clearedbox" />

							</Segment>
						</Segment.Group>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.authError,
		comments: state.comments,
		isAuthError: state.isAuthError,
		isAuthErrorDismissed: state.isAuthErrorDismissed,
		isAuthLoading: state.isAuthLoading,
		isLoading: state.isLoading,
		isLoggedIn: state.isLoggedIn,
		isSignUpLoading: state.isSignUpLoading,
		user: state.user
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setComments: (value) => dispatch( setComments(value) ), 
		isAuthErrorDismissed: (value) => dispatch( isAuthErrorDismissed(value) ), 
		setLoading: (value) => dispatch( setLoading(value) ), 
		setState: (value) => dispatch( setState(value) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

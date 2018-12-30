import React from 'react'
import './App.scss'

// Firebase App is always required and must be first
import firebase from 'firebase/app'
// Add additional services that you want to use
import 'firebase/database'
import 'firebase/functions'

class App extends React.Component {
	state = {
		name: ''
	}
	componentDidMount() {
		const database = firebase.database()

		let name = database.ref('name')
		name.on('value', snapshot => {
			this.setState({
				name: snapshot.val()
			})
		})
	}
	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleFormSubmit = e => {
		e.preventDefault()
		const itemsRef = firebase.database().ref('name')
		const item = this.state.name

		// Set the new value in Firebase Realtime database
		itemsRef.set(item)

		// Reset the form after submitting
		this.refs.form.reset()
	}
	render({ name } = this.state) {
		return (
			<React.Fragment>
				<h1>{name ? `Hey, ${name}` : 'Loading...'}</h1>
				<form onSubmit={this.handleFormSubmit} ref='form'>
					<input
						type='text'
						name='name'
						onChange={this.handleInputChange}
						ref='name'
						placeholder='Put your new name here!!'
					/>
					<input type='submit' value='Submit!' />
				</form>
			</React.Fragment>
		)
	}
}

export default App

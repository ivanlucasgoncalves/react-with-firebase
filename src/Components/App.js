import React, { Component } from 'react'

// Firebase App is always required and must be first
import firebase from 'firebase/app'
// Add additional services that you want to use
import 'firebase/database'
import 'firebase/functions'

class App extends Component {
  constructor() {
    super()

    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    const database = firebase.database();

    let name = database.ref('name');
    name.on('value', snapshot => {
      this.setState({
        name: snapshot.val()
      })
    })
  }
  render() {
    const { name } = this.state
    return (
      <div className="App">
        <h1>{name ? `Hey, ${name}` : 'Loading...'}</h1>
      </div>
    );
  }
}

export default App
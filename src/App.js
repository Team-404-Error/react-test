import './App.css';
import React from 'react'
import superagent from 'superagent';
import Cookies from 'js-cookie';
const base64 = require('base-64');
require('dotenv').config();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'', 
      token:'',
    }
  }

 signIn = async (e) => {
  e.preventDefault();
    let encoded = base64.encode(`${this.state.username}:${this.state.password}`)
    superagent.post('http://localhost:3333/signin').set('Authorization', `Basic ${encoded}`).then(result => {
      console.log("sign in: ", result.user)
    // Cookies.set('auth-token', result.user.token)
    console.log('yay')
  })
}

signUp = async (e) => {
  e.preventDefault();
  superagent.post('http://localhost:3333/signUp').send({username: this.state.username, password: this.state.password, role: 'user'}).then(result => {
    console.log("SIGN UP:", result.user)
    this.setState({token: result.user})
    // Cookies.set('auth-token', result.user.token)
  })
}

render(){
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input id="username" placeholder="username" onChange={(e) => this.setState({ username: e.target.value })}></input>
          <input id="password" placeholder="password" onChange={(e) => this.setState({ password: e.target.value })}></input>
          
        </form>
          <button type='submit' onClick={this.signIn}>Sign In</button>
          <button type='submit' onClick={this.signUp}>Sign Up</button>
      </header>
    </div>
  );
}
}

export default App;

import './App.css';
import React from 'react'
import superagent from 'superagent';
import Cookies from 'js-cookie';
// const cookieParser = require("cookie-parser")
const base64 = require('base-64');
require('dotenv').config();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'', 
      token:'',
      show: false
    }
  }

 signIn = async (e) => {
  e.preventDefault();
    let encoded = base64.encode(`${this.state.username}:${this.state.password}`)
    await superagent.post('http://localhost:3333/signin').set('Authorization', `Basic ${encoded}`).set('Access-Control-Allow-Credentials', "true").then(result => {
    Cookies.set('auth-token', result.body.token)
    this.setState({token: result.body.token})
  })
}

signUp = async (e) => {
  e.preventDefault(); 
  superagent.post('http://localhost:3333/signUp').send({username: this.state.username, password: this.state.password, role: 'user'}).then(result => {
    console.log("SIGN UP:", result.user)
    this.setState({token: result.body.token})
    Cookies.set('auth-token', result.body.token)
  })
}

hitMe = (e) =>{
  e.preventDefault();
  superagent.get('http://localhost:3333/secret').set('Authorization', `Bearer ${this.state.token}`).then(result => {
    console.log("SECRET: ", result)
    this.setState({show: true})
    // Cookies.set('auth-token', result.user.token)
  })
}

flip = () =>{
      
    return(
      <div>
      {
        this.state.admin 
      ? <h1>Welcome ADMIN!!!</h1>
      : <h1>Welcome USER!!!</h1>
      }
      </div>      
    )
  
}

render(){
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input id="username1" placeholder="username1" onChange={(e) => this.setState({ username: e.target.value })}></input>
          <input id="password1" placeholder="password1" onChange={(e) => this.setState({ password: e.target.value })}></input>
          
        </form> 
          <button type='submit' onClick={this.signIn}>Sign In</button>
          <button type='submit' onClick={this.signUp}>Sign Up</button>
          <h1 show={this.show}>SEEEEEECREETTTTTS</h1>
          <button type='submit' onClick={this.hitMe}>SECRETS</button>
          

      
      </header>
      <body>
            <flip/>
      </body>
    </div>
  );
}
}

export default App;

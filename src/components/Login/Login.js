import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUsername(username) {
    this.setState((state) => {
      state.username = username;
      return state;
    });
  }

  setPassword(password) {
    this.setState((state) => {
      state.password = password;
      return state;
    });
  }

  loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.setToken(btoa(`${this.state.username}:${this.state.password}`))
  }

  render() {
    return (
      <div className="login-wrapper">
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => this.setUsername(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={(e) => this.setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;

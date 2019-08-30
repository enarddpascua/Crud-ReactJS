import React from 'react';
import './login.css';
import ReactDOM from 'react-dom';


class Login extends React.Component{

    render(){
        return(
            <div pagClick = {this.props.onClick}>
                <form className = "actions">
                    <input className = "userName" placeholder = "username"/>
                    <input className = "passWord" placeholder = "password"/>
                    <button className = "loginButton">Login</button>
                    <button className = "signUpButton">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default Login
ReactDOM.render(<Login/>, document.querySelector('#root'))
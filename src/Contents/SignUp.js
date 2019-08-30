import './signup.css'
import React from 'react';

class SignUp extends React.Component{

    render(){
        return(
            <div className = "mainDivReg">
            <div className = "formHolder">
                <form className = "info">
                    <input className = "input1" placeholder = "enter your name"/>
                    <input className = "input1" placeholder = "email address"/>
                    <input className = "input1" placeholder = "create password"/>
                    <input className = "input1" placeholder = "confirm password"/>
                </form>
            </div>

            </div>
        )
    }
}

export default SignUp;
import React, { Component } from 'react'
import LoginForm from '@/components/loginLayout/login.jsx'
import RegisterForm from '@/components/loginLayout/register.jsx'
import "@/static/style/loginLayout.less"
export default class loginLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginSign: true,
        }
    }
    
    render() {
        return (
            <div className="loginLayout">
                <img className="loginLayout-img" src={require("@/static/images/logo.png")} alt=""/>
                {this.state.loginSign ? <LoginForm /> : <RegisterForm/>} 
            </div>
        )
    }
}

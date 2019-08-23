import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import LoginForm from '@/components/loginLayout/login.jsx'
import RegisterForm from '@/components/loginLayout/register.jsx'
import "@/static/style/loginLayout.less"
export default class loginLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginSign: true,
            current: 'login',
        }
    }
    handleClick = e => {
        this.setState({
            current: e.key,
        });
        
        e.key === 'login' ? this.setState({
            loginSign: true
        }) : this.setState({
            loginSign: false
        });
    };
    render() {
        return (
            <div className="loginLayout">
                <img className="loginLayout-img" src={require("@/static/images/logo.png")} alt=""/>
                <div className='loginLayout-box'>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="login">
                            <Icon type="login" />
                            登录
                        </Menu.Item>
                        <Menu.Item key="register">
                            <Icon type="appstore" />
                            注册
                        </Menu.Item>
                    </Menu>
                    {this.state.loginSign ? <LoginForm /> : <RegisterForm />} 
                </div>
            </div>
        )
    }
}

import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import "@/static/style/login.less"
import http from '@/config/http';
import api from '@/config/api';
class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                http.post(api.login, values, res => {
                    console.log(res);
                    this.props.history.push('/?token=' + res.token);
                }, err => {
                    console.log(err);
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="mt10">
                <Row>
                    <Col span={8} offset={8}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {/* {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}

                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a> */}

                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>

                                {/* <a href="">register now!</a> */}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

        )
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;
import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import api from '@/config/api';
import http from '@/config/http';

class Register extends React.Component {
    constructor() {
        super();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err && values.password === values.confirmPwd) {
                http.post(api.register, values, res => {
                    console.log(res);
                    
                    if (res = 'success') {
                        this.props.history.push('/login');
                    }
                }, err => {
                    console.log(err);
                })
            }
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form">
                <Row>
                    <Col span={24} >
                        <Form  onSubmit={this.handleSubmit}>
                            <Form.Item label="手机号" hasFeedback>
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请输入手机号!', len: 11 }],
                                })(
                                    <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />,
                                )}
                            </Form.Item>
                            <Form.Item label="邮箱" hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请输入邮箱!', pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/}],
                                })(
                                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />,
                                )}
                            </Form.Item>
                            <Form.Item label="密码" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!', min: 6 }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="最少6位密码" />,
                                )}
                            </Form.Item>
                            <Form.Item label="确认密码" hasFeedback>
                                {getFieldDecorator('confirmPwd', {
                                    rules: [{ required: true, message: '请再次确认密码!', min: 6 }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" block htmlType="submit" > 注册 </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

const RegisterForm = Form.create({ name: 'register' })(Register);

export default RegisterForm;
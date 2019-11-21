import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { withRouter  } from 'react-router-dom';
import http from '@/config/http';
import api from '@/config/api';
class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = e => {
        e.preventDefault();
        //this.props.history.push('/');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                http.post(api.login, values, res => {
                    message.info(res.msg);
                    if (res.result&&res.result.length>0){
                        window.location.href = '/';
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
                    <Col span={24}>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Item label="手机号或邮箱">
                                {getFieldDecorator('loginName', {
                                    rules: [{ required: true, message: '请输入您的手机号或邮箱!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="手机号或邮箱"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="密码">
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请速入密码!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>记住我</Checkbox>)}
                                <a style={{float:'right'}} href="/">
                                    返回首页
                                </a>
                                <Button type="primary" block htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

        )
    }
}

const LoginForm = Form.create({ name: 'login' })(withRouter(Login));

export default LoginForm;
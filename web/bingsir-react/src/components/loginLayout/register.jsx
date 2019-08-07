import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import "@/static/style/register.less"
import api from '@/config/api';
import http from '@/config/http';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
class Register extends React.Component {
    constructor() {
        super();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                http.post(api.register, values, res => {
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
            <div className="mt10">
                <Row>
                    <Col span={8} offset={8}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item label="手机号" hasFeedback>
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请输入手机号!' }],
                                })(
                                    <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />,
                                )}
                            </Form.Item>
                            <Form.Item label="用户名" hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />,
                                )}

                            </Form.Item>
                            <Form.Item label="邮箱" hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请输入邮箱!' }],
                                })(
                                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />,
                                )}
                            </Form.Item>
                            <Form.Item label="密码" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />,
                                )}
                            </Form.Item>
                            <Form.Item label="确认密码" hasFeedback>
                                {getFieldDecorator('confirmPwd', {
                                    rules: [{ required: true, message: '请再次确认密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />,
                                )}
                            </Form.Item>
                            {/* <Form.Item label="上传图片" hasFeedback>
                                {getFieldDecorator('uploadImg', {
                                    rules: [{ required: true, message: '请上传图片!' }],
                                })(
                                    <Input  type="file"  />,
                                )}
                            </Form.Item> */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="register-form-button"> 注册 </Button>
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
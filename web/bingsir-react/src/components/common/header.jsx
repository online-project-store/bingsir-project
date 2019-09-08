import React from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import '@/static/style/header.less'
const { Header } = Layout;
const { SubMenu } = Menu;
class HeaderComponenet extends React.Component {
    state = {
        current: 'home',
    };
    handleClick = e => {
        // console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    goWriteArticle(){
        window.location.href = '/writeArticle'
    }
    goLogin(){
        window.location.href = '/login'
    }
    render() {
        return (
            <Header className="ui-header">
                <Row className="w1200">
                    <Col span={4} >
                        <img className="ui-header-img" src={require("@/static/images/logo.png")} alt="" />
                    </Col>
                    <Col span={14} >
                        <Menu className="ui-header-ul" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="home">
                                <Link to="/"><Icon type="home" />首页 </Link>
                            </Menu.Item>
                            <Menu.Item key="article">
                                <Link to="/article"><Icon type="read" />文章 </Link>
                            </Menu.Item>
                            <Menu.Item key="classify">
                                <Link to="/classify"><Icon type="fire" />话题 </Link>
                            </Menu.Item>
                            <Menu.Item key="topicList">
                                <Link to="/topicList"><Icon type="bars" />论点 </Link>
                            </Menu.Item>
                            <Menu.Item key="activity">
                                <Link to="/activity"><Icon type="heart" />活动 </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={6} className='ui-header-right'>
                        <span   onClick={this.goWriteArticle}><Icon type="form" />写文章 </span>
                        <i> | </i>
                        <span   onClick={this.goLogin}><Icon type="login" />登录·注册 </span>
                    </Col>
                </Row>
            </Header>
        )
    }
}
export default HeaderComponenet;
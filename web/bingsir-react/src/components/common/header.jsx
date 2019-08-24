import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import '@/static/style/header.less'
const { Header } = Layout;
const { SubMenu } = Menu;
class HeaderComponenet extends React.Component {
    state = {
        current: 'home',
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render() {
        return (
            <Header className="ui-header"> 
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="home">
                        <Link exact to="/"><Icon type="home" />首页 </Link>
                    </Menu.Item>
                    <Menu.Item key="article">
                        <Link exact to="/article"><Icon type="read" />文章 </Link>
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
            </Header>
        )
    }
}
export default HeaderComponenet;
import React from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { userinfo } from "@/store/actions/home";
import { getClientHeight } from "@/store/actions";
import '@/static/style/header.less'
import api from '@/config/api';
import http from '@/config/http';
const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderComponenet extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: 'home',
            loginStatus: false,
            userName:'',
        };
    }
    componentWillMount(){
        this.selectItem(this.props.location.pathname)
    }
    componentDidMount(){
        let num = document.documentElement.clientHeight - 64 - 20 - 69 - 30;
        this.props.getClientHeight(num);
        http.post(api.loginStatus,{},res=>{
            this.props.userinfo(res[0])
            if (res.lose){
                this.setState({
                    loginStatus: false,
                    userinfo:'',
                })
            }else{
                this.setState({
                    loginStatus: true,
                    userName: res[0].user_nickname
                })
            }
        },err=>{
            console.log(err);
        })
    }
    selectItem(pathname){
        switch (pathname) {
            case '/':
                this.setState({
                    current: 'home',
                });
                break;
            case '/classify':
                this.setState({
                    current: 'classify',
                });
                break;  
            case '/activity':
                this.setState({
                    current: 'activity',
                });
                break;      
        }
    }
    getUserInfo(){
        //console.log(this.state.current);
        /* this.setState({
            current:'userinfo'
        }) */
        this.props.history.push('/userinfo')
    }
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
                            {/* <Menu.Item key="article">
                                <Link to="/article"><Icon type="read" />文章 </Link>
                            </Menu.Item> */}
                            <Menu.Item key="classify">
                                <Link to="/classify"><Icon type="bars" />分类 </Link>
                            </Menu.Item>
                            {/* <Menu.Item key="topicList">
                                <Link to="/topicList"><Icon type="bars" />论点 </Link>
                            </Menu.Item> */}
                            <Menu.Item key="activity" disabled>
                                <Link to="/activity" ><Icon type="fire" />活动 </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={6} className='ui-header-right'>
                        <span   onClick={this.goWriteArticle}><Icon type="form" />写文章 </span>
                        <i> | </i>
                        {this.state.loginStatus ? (<span onClick={this.getUserInfo.bind(this)}><Icon type="user" /> {this.state.userName} </span>) : (<span onClick={this.goLogin}><Icon type="login" />登录·注册 </span>)}
                    </Col>
                </Row>
            </Header>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userinfo: (...args) => dispatch(userinfo(...args)),
        getClientHeight: (...args) => dispatch(getClientHeight(...args))
    }
}
function mapStateToProps(state) {
    return {
        user_info: state.homeReducer.user_info,
    }
    // 这里的state是react-redux store中的state，
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponenet));

import React from 'react';
import { Layout, Modal,message } from 'antd';
import { createBrowserHistory } from "history";
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import HeaderComponent from '@/components/common/header.jsx';
import FooterComponent from '@/components/common/footer.jsx';
import RightComponent from '@/components/common/right.jsx';
import { setModalLogin } from "@/store/actions";
import "@/static/style/public.less"
const { Content, Sider } = Layout;
const history = createBrowserHistory();
class layoutDom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
        }
    }
    handleOk = e => {
        // console.log(e);
         window.location.href = '/login';
        this.props.setModalLogin(false)
    };
    handleCancel = e => {
        message.warning('期待您的归来，bingsir用心做您的伙伴。', 1.5, ()=>{
            this.props.setModalLogin(false)
            /* this.props.history.push({
                pathname: '/',
            }) */
            window.location.href = '/';
        })
    };
    hintHtml = ()=>{
        return(
            <Modal
                title="小报告"
                okText="登录"
                cancelText="取消"
                visible={this.props.modalLogin}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>大佬还没登录，被我逮到了吧，嘿嘿(￣.￣)；</p>
                <p>come on，加入进来，踏入秃顶之路，(￣▽￣)／。</p>
            </Modal>
        );
    }
    template(props) {
        // console.log(this.props.modalLogin);
        return (
            <Layout style={{position:'relative',paddingBottom:'90px'}}>
                <HeaderComponent/>
                <Layout className="w1200">
                    <Content style={{ backgroundColor: '#fff', marginTop: '20px' }}>
                        {this.props.children}
                        {this.hintHtml()}
                    </Content>
                    <Sider style={{ backgroundColor: '#fff', marginLeft: '20px', marginTop: '20px' }}>
                        <RightComponent/>
                    </Sider>
                </Layout>
                <FooterComponent />
            </Layout>
        )
    }
    simpleTemplate(props) {
        return (
            <div>
                {this.props.children}
                {this.hintHtml()}
            </div>
        )
    }
    componentWillMount(){
        if (history.location.pathname === '/login' || history.location.pathname === '/writeArticle') {
            this.setState({
                isShow: true
            })
        }
    }
    componentDidMount(){
        // console.log(this.props);
    }
    render() {
        return (
            <div>
                {this.state.isShow ? this.simpleTemplate() : this.template()} 
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setModalLogin: (...args) => dispatch(setModalLogin(...args)),
        // increment: () => dispatch(increment()),

    }
}

const mapStateToProps = (state) =>{
    return {
        modalLogin: state.loginReducer.modalLogin,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(layoutDom));
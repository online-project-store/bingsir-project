import React from 'react';
import { Layout, Modal } from 'antd';
import { createBrowserHistory } from "history";
import { connect } from 'react-redux';
import HeaderComponent from '@/components/common/header.jsx';
import FooterComponent from '@/components/common/footer.jsx';
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
        console.log(e);
        console.log(this.props);
        this.props.setModalLogin(false)
    };
    handleCancel = e => {
        console.log(e);
        this.props.setModalLogin(false)
    };
    template(props) {
        console.log(this.props.modalLogin);
        
        return (
            <Layout style={{position:'relative',paddingBottom:'90px'}}>
                <HeaderComponent/>
                <Layout className="w1200">
                    <Content style={{ backgroundColor: '#fff', marginTop: '20px' }}>
                        {this.props.children}
                        <Modal
                            title="Basic Modal"
                            visible={this.props.modalLogin}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </Content>
                    <Sider style={{ backgroundColor: '#fff', marginLeft: '20px', marginTop: '20px' }}>Sider</Sider>
                </Layout>
                <FooterComponent />
            </Layout>
        )
    }
    simpleTemplate(props) {
        return (
            <div>
                {this.props.children}
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
        console.log(this.props);
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
        modalLogin: state.stateReducer.modalLogin,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(layoutDom);
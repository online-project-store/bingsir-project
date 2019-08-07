import React from 'react';
import { Layout } from 'antd';
import { createBrowserHistory } from "history";
import Header from '@/components/common/header.jsx';
import Footer from '@/components/common/footer.jsx';
import "@/static/style/public.less"
const { Content } = Layout;
const history = createBrowserHistory();
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
        }
    }
    LayoutDom(props) {
        return (
            <Layout>
                <Header/>
                    <Content>
                        {this.props.children}
                    </Content>
                <Footer />
            </Layout>
        )
    }
    Login(props) {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
    componentWillMount(){
        if (history.location.pathname === '/login') {
            this.setState({
                isShow: true
            })
        }
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div>
                {this.state.isShow ? this.Login() : this.LayoutDom()} 
            </div>
        )
    }
}

 

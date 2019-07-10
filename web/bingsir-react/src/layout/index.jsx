import React from 'react';
import { Layout } from 'antd';
import { createBrowserHistory } from "history";
import HeaderComponenet from '@/components/header.jsx';
import FooterComponenet from '@/components/footer.jsx';
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
                <HeaderComponenet />
                <Content>
                    {this.props.children}
                </Content>
                <FooterComponenet />
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
        if (history.location.pathname === '/login' || history.location.pathname === '/register') {
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

 

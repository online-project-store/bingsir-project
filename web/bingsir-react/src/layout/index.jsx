import React from 'react';
import { Layout } from 'antd';
import { createBrowserHistory } from "history";
import HeaderComponent from '@/components/common/header.jsx';
import FooterComponent from '@/components/common/footer.jsx';
import "@/static/style/public.less"
const { Content, Sider } = Layout;
const history = createBrowserHistory();
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
        }
    }
    template(props) {
        return (
            <Layout>
                <HeaderComponent/>
                <Layout  className="w1200">
                    <Content style={{backgroundColor:'#fff',marginTop:'20px'}}>
                        {this.props.children}
                    </Content>
                    <Sider style={{ backgroundColor: '#fff', marginLeft: '20px', marginTop: '20px'}}>Sider</Sider>
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
        
    }
    render() {
        return (
            <div>
                {this.state.isShow ? this.simpleTemplate() : this.template()} 
            </div>
        )
    }
}

 

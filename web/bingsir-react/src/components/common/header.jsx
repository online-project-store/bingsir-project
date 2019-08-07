import React from 'react';
import { Layout } from 'antd';
import '@/static/style/header.less'
const { Header } = Layout;
class HeaderComponenet extends React.Component {
    render() {
        return (
            <Header className="ui-header"> 
                header
            </Header>
        )
    }
}
export default HeaderComponenet;
import React from 'react';
import { Layout } from 'antd';
import '@/static/style/footer.less'
const { Footer } = Layout;
class FooterComponenet extends React.Component {
    render() {
        return (
            <Footer className='ui-footer'>
                Footer
            </Footer>
        )
    }
}
export default FooterComponenet;
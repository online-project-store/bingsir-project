import React from 'react';
import { Layout } from 'antd';
import '@/static/style/footer.less'
const { Footer } = Layout;
class FooterComponenet extends React.Component {
    render() {
        return (
            <Footer className='ui-footer'>
                <p>别低头，王冠会掉，别后退，梦想会碎~~~~~</p>
            </Footer>
        )
    }
}
export default FooterComponenet;
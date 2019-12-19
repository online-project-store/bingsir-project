import React, { useState, useEffect } from 'react';
import { Icon, Tooltip, Row, Col, Divider  } from 'antd';
import '@/static/style/right.less'
function Right() {
    const [count, setCount] = useState(0);
    const qqImg = <span><img width="150" src={require('@/static/images/qq.jpg')} alt=""/></span>;
    const wechatImg = <span><img width="150" src={require('@/static/images/wechat.jpg')} alt="" /></span>;

    function onPanelChange(value, mode) {
        console.log(value, mode);
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
    });
    return (
        <div>
            {/* <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button> */}
            <div className="ui-left-userinfo">
                <img src={require('@/static/images/user-logo.jpeg')} alt=""/>
                <h3>bingsir</h3>
                <p>一个专注圈内动态的程序员，想通过自己的微薄之力为广大奋斗在一线的同僚们提供一点帮助。愿我们一起进步。</p>
                <Divider>社交账号</Divider>
                <div className="ui-left-userinfo-icon">
                    <Row type="flex" justify="center">
                        <Col span={6}>
                            <a href="https://github.com/online-project-store/bingsir-project" target="_blank"><Icon type="github" /></a>
                        </Col>
                        <Col span={6}>
                            <Tooltip placement="bottom" title={qqImg}>
                                <Icon type="qq" />
                            </Tooltip>
                        </Col>
                        <Col span={6}>
                            <Tooltip placement="bottom" title={wechatImg}>
                                <Icon type="wechat" />
                            </Tooltip>
                        </Col>
                    </Row>
                </div>
                {/* <div className="ui-empty"></div> */}
                
            </div>
        </div>
    )
}
export default Right;
import React, { useState, useEffect } from 'react';
import { Icon} from 'antd';
import '@/static/style/left.less'
function Left() {
    
    const [count, setCount] = useState(0);
    
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
                <div className="ui-left-userinfo-icon"><a href="https://github.com/online-project-store/bingsir-project" target="_blank"><Icon type="github" /></a></div>
            </div>
        </div>
    )
}
export default Left;
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
function Classify(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // console.log(props);
       /*  document.title = `You clicked ${count} times`; */
    });
    return (
        <div style={{ minHeight: props.clientHeight + 'px' }}>
            <p>低谷期</p>
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
       // getArticleInfo: (...args) => dispatch(articleInfo(...args)),
        // increment: () => dispatch(increment()),
    }
}

function mapStateToProps(state) {
    return {
        user_info: state.homeReducer.user_info,
        clientHeight: state.homeReducer.clientHeight,
    }
    // 这里的state是react-redux store中的state，
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Classify));


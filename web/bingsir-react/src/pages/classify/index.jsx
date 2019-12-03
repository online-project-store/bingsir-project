
import React, { useState, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Icon } from 'antd';
// import '@/static/style/left.less'

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function classify() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            classify页面
        </div>
    )
}

function mapStateToProps(state) {
    return {
        clientHeight: state.homeReducer.clientHeight,
    }
}
export default withRouter(connect(mapStateToProps)(classify)) ;


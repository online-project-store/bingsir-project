import React from 'react';
import http from '@/config/http';
import api from '@/config/api';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { increment, decrement, reset  } from "@/store/actions";

class Home extends React.Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
    getData(){
       /*  http.post(api.getarticlelist,{},res=>{
            console.log(res);
        },err=>{
            console.log(err);
        }) */
    }
    componentDidMount(){
        this.props.decrement(3)
        // console.log('props', this.props);
        this.getData();
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        decrement: (...args) => dispatch(decrement(...args)),
        // increment: () => dispatch(increment()),
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        count: state.counter.count,
    }
    // 这里的state是react-redux store中的state，
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)) ;
import React from 'react';
import http from '@/config/http';
import api from '@/config/api';
import { connect } from 'react-redux'
import { increment, decrement, reset  } from "@/store/actions";
console.log(increment);

class Home extends React.Component {
    render() {
        return (
            <div>
                {this.props.count}
            </div>
        )
    }
    getData(){
        http.post(api.userinfo,{},res=>{
            console.log(res);
        },err=>{
            console.log(err);
        })
    }
    componentDidMount(){
        // console.log();
        this.props.decrement()
        this.getData();
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // increase: (...args) => dispatch(actions.increase(...args)),
        decrement: () => dispatch(decrement()),
        increment: () => dispatch(increment()),
        // decrease: (...args) => dispatch(actions.decrease(...args))
    }
}


function mapStateToProps(state) {
    return {
        count: state.counter.count,
    }
    // 这里的state是react-redux store中的state，
}
export default connect(mapStateToProps, mapDispatchToProps )(Home);
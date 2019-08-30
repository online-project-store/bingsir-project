import React from 'react';
import http from '@/config/http';
import api from '@/config/api';
import { connect } from 'react-redux'
class Home extends React.Component {
    render() {
        return (
            <div>
                {this.props.loading}
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
        this.getData();
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(actions.increase(...args)),
        decrease: (...args) => dispatch(actions.decrease(...args))
    }
}


function mapStateToProps(state) {
    console.log(state);
    
    return {
        loading: state.counter.count,
    }
    // 这里的state是react-redux store中的state，前面我们已经写过相关的代码，return { loading: false }
}
export default connect(mapStateToProps, mapDispatchToProps )(Home);
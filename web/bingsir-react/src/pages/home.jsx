import React from 'react';
import http from '@/config/http';
import api from '@/config/api';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
//import { increment, decrement, reset  } from "@/store/actions";



class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            articleList:'',
        }
    }
    render() {
        console.log('render======>>>>>',this.state)
        if (this.state.articleList){
            return (
                <div>
                    {this.state.articleList.map((item,index) => {
                        return (
                            <div key={index}>
                                <div >{item.article_content}</div>
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            return (
                <div>
                    
                </div>
            )
        }
        
    }
    /* shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps====>>>', nextProps, 'nextState=====>>>>',nextState);
        if (nextProps.user_info.info){}
        return true;
    } */
    getData(user){
        http.post(api.getarticlelist, { 'user_id': user.info[0].user_id},res=>{
            console.log(res);
            this.setState({
                articleList: res
            })
        },err=>{
            console.log(err);
        })
    }
    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.user_info);
    }
    componentDidMount(){
       
    }
}

/* const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        decrement: (...args) => dispatch(decrement(...args)),
        // increment: () => dispatch(increment()),
    }
}
 */
function mapStateToProps(state) {
    return {
        user_info: state.counter.user_info,
    }
    // 这里的state是react-redux store中的state，
}
export default withRouter(connect(mapStateToProps)(Home)) ;
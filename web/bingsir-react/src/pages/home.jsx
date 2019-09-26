import React from 'react';
import http from '@/config/http';
import api from '@/config/api';
import { Icon} from 'antd';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
//import { increment, decrement, reset  } from "@/store/actions";
import '@/static/style/article.less';
let lineStyle = {
    text_title: {
        margin: 0,
        padding: '18px',
        fontWeight: 700,
        color: '#000',
        border: 'none',
        outline: 'none',
        resize: 'none',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#F4F5F5'
    }
}


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
                            <div key={index} className="articleContent">
                                <div dangerouslySetInnerHTML={{ __html: item.article_content }}></div>
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            return (
                <div>
                    <Icon type="loading" />
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
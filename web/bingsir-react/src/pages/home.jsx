import React from 'react';
import http from '@/config/http';
import api from '@/config/api';
import { Icon} from 'antd';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
//import { increment, decrement, reset  } from "@/store/actions";
import '@/static/style/article.less';


class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            articleList:'',
            userInfo:''
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
                <div className="article_no_data" style={{ minHeight: this.props.clientHeight+'px'}}>
                    <div>
                        <p> <Icon type="loading" /></p>
                        <p>玩命加载中！！！</p>
                    </div>
                </div>
            )
        }
    }
    
    getData(){
        http.post(api.getarticlelist, { },res=>{
            
            this.setState({
                articleList: res
            })
        },err=>{
            console.log(err);
        })
    }
    /* componentWillUpdate(nextProps, nextState) {
      //这个里面不可以做更新ui的事情
    } */
    componentWillReceiveProps(nextProps) {
        // this.getData();
        /* this.setState({
            userInfo: nextProps.user_info
        }) */
        
        if (nextProps.user_info){
            this.getData(nextProps.user_info);
        }
    }
    componentDidMount(){
        /* console.log('componentDidMount====>>>',this.props);
        if (this.props.user_info){
            this.getData(this.props.user_info);
        } */
        this.getData();
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
        clientHeight: state.counter.clientHeight,
    }
    // 这里的state是react-redux store中的state，
}
export default withRouter(connect(mapStateToProps)(Home)) ;
import React from 'react';
import http from '@/config/http';
import api from '@/config/api';
import { Icon, Pagination} from 'antd';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import { increment, decrement, reset  } from "@/store/actions";
import '@/static/style/article.less';


class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            articleList:'',
            userInfo:'',
            pageNum: 1,
            pageSize: 15,
            totalPages:'',
        }
    }
    render() {
         
        if (this.state.articleList){
            return (
                <div className="articleDiv">
                    {this.state.articleList.map((item,index) => {
                        return (
                            <div key={index} className="articleDiv-content">
                                {/* <div dangerouslySetInnerHTML={{ __html: item.article_content }}></div> */}
                                <div>
                                    <h3>{}</h3>
                                </div>
                            </div>
                        )
                    })}
                    <div style={{textAlign:"center"}}>
                        <Pagination defaultCurrent={this.state.pageNum} defaultPageSize={this.state.pageSize} total={this.state.totalPages} onChange={this.onChange.bind(this)} />
                    </div>
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
    onChange(pageNumber) {
        console.log('Page: ', pageNumber);
    }
    getData(){
        http.post(api.getarticlelist, { pageNum: this.state.pageNum, pageSize: this.state.pageSize },res=>{
            this.setState({
                articleList: res.articleList,
                totalPages: res.totalPages
            })
        },err=>{
            console.log(err);
        })
       
        
    }
    /* componentWillUpdate(nextProps, nextState) {
      //这个里面不可以做更新ui的事情
    } */
    componentWillReceiveProps(nextProps) {
        /* this.setState({
            userInfo: nextProps.user_info
        }) */
        /* if (nextProps.user_info){
            this.getData(nextProps.user_info);
        } */
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
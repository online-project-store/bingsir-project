import React from 'react';
import { Icon, Pagination} from 'antd';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import moment  from 'moment';
import { articleInfo} from "@/store/actions/home";
import http from '@/config/http';
import api from '@/config/api';
import '@/static/style/article.less';


class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            articleList:'',
            userInfo:'',
            pageNum: 1,
            pageSize: 10,
            totalPages:'',
        }
    }
    render() {
         
        if (this.state.articleList){
            return (
                <div className="articleDiv" style={{ minHeight: this.props.clientHeight + 'px' }}>
                    <ul className="articleList">
                        {this.state.articleList.map((item, index) => {
                            return (
                                <li key={index} className="articleDiv-content" onClick={this.toDetails.bind(this, item)}>
                                    {/* <div dangerouslySetInnerHTML={{ __html: item.article_content }}></div> */}
                                    <p><span> {item.user_nickname}</span> · <span>{item.time}</span> · <span>{item.tag_name}</span></p>
                                    <h3>{item.article_title}</h3>
                                </li>
                            )
                        })}
                    </ul>
                    <div style={{ textAlign: "center" }}>
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
    toDetails(item){
         console.log(item);
        // this.props.getArticleInfo(item)
        // let params = JSON.stringify();
        this.props.history.push({
            pathname: '/details',
            state: { 'article_id': item.article_id, 'user_id': item.user_id, 'tag_id': item.tag_id }
        })
    }
    onChange(pageNumber) {
        this.setState({
            pageNum: pageNumber
        },()=>{
            this.getData()
        });
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getArticleInfo: (...args) => dispatch(articleInfo(...args)),
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)) ;
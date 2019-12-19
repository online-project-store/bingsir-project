import React from 'react';
import { Icon, Pagination} from 'antd';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import moment  from 'moment';
import { articleInfo} from "@/store/actions/home";
import Article from '@/components/article/index.jsx';
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
                <div className="articleDiv" style={{ minHeight: this.props.clientHeight + 'px', backgroundColor:"#F4F5F5" }}>
                    <Article articleList={this.state.articleList} />
                    <div style={{ textAlign: "center", backgroundColor:"#F4F5F5",paddingTop: "20px" }}>
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
    /* toDetails(item){
         console.log(item);
        // this.props.getArticleInfo(item)
        // let params = JSON.stringify();
        this.props.history.push({
            pathname: '/details',
            state: { 'article_id': item.article_id, 'user_id': item.user_id, 'tag_id': item.tag_id }
        })
    } */
    onChange(pageNumber) {
        this.setState({
            pageNum: pageNumber
        },()=>{
            this.getData()
        });
    }
    getData(){
        http.post(api.getarticlelist, { pageNum: this.state.pageNum, pageSize: this.state.pageSize },res=>{
            console.log(res);
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
        
    }
    componentDidMount(){
       
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
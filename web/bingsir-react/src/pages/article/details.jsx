import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import http from '@/config/http';
import api from '@/config/api';
import "@/static/style/details.less";
class Details extends Component {
    static propTypes = {
        prop: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state = {
            userinfo:{
                name:'',
                img:'',
            },
            article:{
                createdTime:'',
                article_views:'',
                content:''
            },
            params:{},
        }
    }
    render() {
        return (
            <div style={{ minHeight: this.props.clientHeight + 'px' }} className="details-content">
                {/* {this.state.detailsInfo.article_id} */}
                <div className="details-content-header">
                    {this.state.userinfo.img ? <img src={this.state.userinfo.img} alt="" /> : <img src={require("@/static/images/user-default.jpg")} alt="" />}
                    <h4>{this.state.userinfo.name} <Button style={{ float: 'right' }} type="primary" ghost onClick={this.follow.bind(this)}> 关注 </Button></h4>
                    <p>{this.state.article.createdTime} 阅读 {this.state.article.article_views}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div>
            </div>
        )
    }
    follow(){
        // console.log(this.state.params);
        http.post(api.toFollow, this.state.params,res=>{
            console.log(res);
        },err=>{
            console.log(err);
        })
    }
    componentDidMount(){
        /* this.setState({
            detailsInfo: this.props.location.state
        },()=>{

        }) */
        http.post(api.getArticleDetails, this.props.location.state,res=>{
            console.log(res);
            this.setState({
                userinfo: {
                    name: res.userinfo[0].user_nickname,
                    img: res.userinfo[0].user_profile_photo,
                },
                article: {
                    createdTime: res.articleinfo[0].createdTime,
                    article_views: res.articleinfo[0].article_views,
                    content: res.articleinfo[0].article_content
                },
                params:{
                    article_id: res.articleinfo[0].article_id,
                    tag_id: res.taginfo[0].tag_id,
                    user_id: res.userinfo[0].user_id,
                }
            })
        },err=>{
            console.log(err);
        })
    }
}

function mapStateToProps(state) {
    return {
        article_info: state.homeReducer.article_info,
        clientHeight: state.homeReducer.clientHeight,
    }
}

export default withRouter(connect(mapStateToProps)(Details));
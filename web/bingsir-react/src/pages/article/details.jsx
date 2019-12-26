import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css'
import http from '@/config/http';
import api from '@/config/api';
import "@/static/style/details.less";
//以后编辑 数据库中同时存储raw字符串和html字符串，分别用于再次编辑和前台展示。
//https://www.yuque.com/braft-editor/be/lzwpnr#9a27e818  
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
            followText:'关注',
            editorState: null,
            loginUserId:'',
            isShowEdit:false,
        }
    }
    
    //阅读 关注等到注册人多了可以放开
    render() {
        return (
            <div style={{ minHeight: this.props.clientHeight + 'px' }} className="details-content">
                {/* {this.state.detailsInfo.article_id} */}
                <div className="details-content-header">
                    {this.state.userinfo.img ? <img src={this.state.userinfo.img} alt="" /> : <img src={require("@/static/images/user-default.jpg")} alt="" />}
                    <h4>
                        {this.state.userinfo.name} 
                        {/* <Button style={{ float: 'right' }} type="primary" ghost onClick={this.follow.bind(this)}> {this.state.followText} </Button> */} 
                        {this.state.isShowEdit ? (<Button style={{ float: 'right' }} type="primary" ghost onClick={this.edit.bind(this)}> 编辑 </Button>):''}
                    </h4>
                    <p>{this.state.article.createdTime} {/* 阅读 {this.state.article.article_views} */}</p>
                </div>
                {<div className="braft-output-content" dangerouslySetInnerHTML={{ __html:   this.state.article.content }}></div>}
                {/* <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: this.state.editorState }}></div> */}
                
                {/* <div>
                    <iframe src="//player.bilibili.com/player.html?aid=63409044&cid=110640273&page=2" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
                </div> */}
            </div>
        )
    }
    edit(){
        //写文章userid
        //window.location.href = '/writeArticle?id=' + id
        console.log(this.state.params.user_id, this.state.article.article_id);
        //window.location.href = "/writeArticle?id=9"
        window.location.href = `/writeArticle?id=${this.state.params.user_id}&article=${this.state.article.article_id}` 
    }
    follow(){
        // console.log(this.state.params);
        //userid 当前用户id  followUserid 关注用户id  followSign:1 //关注 
        
        this.state.followText == "关注" ? this.setState({
            followText : '取消关注'
        }) : this.setState({
            followText: '关注'
        })
        
        let followData = {
            userid: this.props.user_info.info? this.props.user_info.info.user_id : 0,
            followUserid: this.state.params.user_id,
            followSign: this.state.followText == "关注" ? 1 : 0,
        }
        
        http.post(api.toFollow, followData,res=>{
            console.log(res);
        },err=>{
            console.log(err);
        })
    }
    sendViewNum(articleinfo){
        let num = parseInt(articleinfo.article_views);
        if (this.props.location.query && this.props.location.query.sendFlag) { //排除当前页刷新 加 article_views
            http.post(api.sendView, { article_id: articleinfo.article_id, article_views: num++ }, res => {
                console.log(res);
            }, err => {
                console.log(err);
            })
        }
    }
    componentDidMount(){
        // 可以根据用户点击次数排名
        http.post(api.getArticleDetails, this.props.location.state,res=>{
            console.log('bingsir',res);
            console.log(this.props.user_info.info.user_id);
            this.setState({
                userinfo: {
                    name: res.userinfo[0].user_nickname,
                    img: res.userinfo[0].user_profile_photo,
                },
                article: {
                    createdTime: res.articleinfo[0].createdTime,
                    article_views: res.articleinfo[0].article_views,
                    content: res.articleinfo[0].article_content,
                    article_id: res.articleinfo[0].article_id
                },
                params:{
                    article_id: res.articleinfo[0].article_id,
                    tag_id: res.taginfo[0].tag_id,
                    user_id: res.userinfo[0].user_id,
                },
                loginUserId: this.props.user_info.info.user_id,
                isShowEdit: this.props.user_info.info.user_id == res.userinfo[0].user_id
               // editorState: BraftEditor.createEditorState(res.articleinfo[0].article_content).toHTML()
            })

           // this.sendViewNum(res.articleinfo[0])
        },err=>{
            console.log(err);
        })
    }
}

function mapStateToProps(state) {
    // console.log(state.homeReducer.user_info);
    
    return {
        article_info: state.homeReducer.article_info,
        clientHeight: state.homeReducer.clientHeight,
        user_info: state.homeReducer.user_info
    }
}

export default withRouter(connect(mapStateToProps)(Details));
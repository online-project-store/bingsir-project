import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Icon, Pagination} from 'antd';
import '@/static/style/article.less';


function ArticleDom(props) { 
    console.log('props',props);
    
    let toDetails = (item) => {
        //console.log(item);
        // this.props.getArticleInfo(item)
        // let params = JSON.stringify();
        props.history.push({
            pathname: '/details',
            state: { 'article_id': item.article_id, 'user_id': item.user_id, 'tag_id': item.tag_id },
            query:{'sendFlag':1}
        })
    }
    
    return (
        <ul className="articleList">
            {props.articleList.map((item, index) => {
                return (
                    <li key={index} className="articleDiv-content" onClick={() => toDetails(item)}>
                        {/* <div dangerouslySetInnerHTML={{ __html: item.article_content }}></div> */}
                        <p><span> {item.user_nickname}</span> · <span>{item.time}</span> · <span>{item.tag_name}</span></p>
                        <h3>{item.article_title}</h3>
                    </li>
                )
            })}
        </ul>
    )
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // getArticleInfo: (...args) => dispatch(articleInfo(...args)),
        // increment: () => dispatch(increment()),
    }
}

function mapStateToProps(state) {
    return {
        clientHeight: state.homeReducer.clientHeight,
    }
    // 这里的state是react-redux store中的state，
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDom));
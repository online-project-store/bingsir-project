import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { Tag } from 'antd';
import { withRouter } from 'react-router-dom';
import http from '@/config/http';
import api from '@/config/api';
import '@/static/style/classify.less';
const { CheckableTag } = Tag;
function Classify(props) {
    const [list, setList] = React.useState({ classList:[], findTagList:[]});
    const [selectedClass, setSelectedClass] = React.useState([])
   // let selectedTags = [], selectedClass = [];
    let getClassList =  ()=>{
        http.post(api.classifyList,{},res=>{
            console.log(res);
            setList({ classList: res.classList, findTagList: res.findTagList})
        },err=>{
            console.log(err);
        })
    }

    useEffect(() => {
        getClassList();
    }, [])
    let handleChange = (item, checked)=>{
        
        const nextSelectedTags = checked ? [...selectedClass, item.class_name] : selectedClass.filter(t => t !== item.class_name);
        // selectedClass = nextSelectedTags;
        setSelectedClass(nextSelectedTags)
        console.log(nextSelectedTags);
    }
    // console.log('123', list);
    const { classList, findTagList} = list;
    return (
        
        <div style={{ minHeight: props.clientHeight + 'px' }}>
            <div className="classify-list">
                <h5>分类:</h5>
                <ul>
                    {classList.map((item,index)=>{
                        return (
                            // <li key={index}><Tag color="#108ee9">{item.class_name}</Tag></li>
                            <li key={index} >
                                <CheckableTag checked={selectedClass.indexOf(item.class_name) > -1} onChange={checked => handleChange(item, checked)}>
                                    {item.class_name}
                                </CheckableTag>
                            </li>
                        )
                    })}
                </ul>
                <h5>标签:</h5>
                <ul>
                    {findTagList.map((item, index) => {
                        return (
                            // <li key={index}><Tag color="#2db7f5">{item.tag_name}</Tag></li>
                            <li key={index} >
                                <CheckableTag>
                                    {item.tag_name}
                                </CheckableTag>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
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
        user_info: state.homeReducer.user_info,
        clientHeight: state.homeReducer.clientHeight,
    }
    // 这里的state是react-redux store中的state，
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Classify));


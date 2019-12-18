import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { Tag, Icon, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import http from '@/config/http';
import api from '@/config/api';
import '@/static/style/classify.less';
import Article from '@/components/article/index.jsx';
const { CheckableTag } = Tag;
function Classify(props) {
    const [list, setList] = React.useState({ classList:[], findTagList:[]});
    const [selectedClass, setSelectedClass] = React.useState([]);
    const [selectedTag, setSelectedTag] = React.useState([]);
    const [dataList, setDataList] = React.useState([]);
   // let selectedTags = [], selectedClass = [];
    let getClassList =  ()=>{
        http.post(api.classifyList,{},res=>{
            console.log(res);
            setList({ classList: res.classList, findTagList: res.findTagList})
        },err=>{
            console.log(err);
        })
    }
    let getData = (obj) => {
        http.post(api.classifyTagList, { 'class': obj.classList, 'tag': obj.findTagList }, res => {
            console.log(res);
            setDataList(res.classTagData)
        }, err => {
            console.log(err);
        })
    }
    let handleChange = (item, checked)=>{
        const nextSelectedClass = checked ? [...selectedClass, item.class_name] : selectedClass.filter(t => t !== item.class_name);
        // selectedClass = nextSelectedTags;
        setSelectedClass(nextSelectedClass)
        // console.log(nextSelectedClass, selectedTag);
        getData({ 'classList': nextSelectedClass, 'findTagList':selectedTag})
        // console.log('设置',selectedClass);
    }
    let tagChange = (item, checked)=>{
        const nextSelectedTag = checked ? [...selectedTag, item.tag_name] : selectedTag.filter(t => t !== item.tag_name);
        setSelectedTag(nextSelectedTag)
        // console.log(selectedTag);
        getData({ 'classList': selectedClass, 'findTagList': nextSelectedTag })
    }
    useEffect(() => {
        getClassList();
        getData({ 'classList': [], 'findTagList': [] })
    }, [])
    const { classList, findTagList} = list;
    //console.log(dataList);
    return (
        <div style={{ minHeight: props.clientHeight + 'px', backgroundColor:'#f0f2f5' }}>
            <div className="classify-list" style={{ backgroundColor: '#fff'}}>
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
                                <CheckableTag checked={selectedTag.indexOf(item.tag_name) > -1} onChange={checked => tagChange(item, checked)}>
                                    {item.tag_name}
                                </CheckableTag>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div style={{paddingTop:'20px'}}>
                {dataList.length > 0 ? (<Article articleList={dataList}/>):(
                    <div className="article_no_data" style={{ minHeight: props.clientHeight + 'px',backgroundColor:'#fff' }}>
                        <div>
                            <p><Icon type="frown" /> </p>
                            <p>换个查询条件试试</p>
                        </div>
                    </div>
                )}
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


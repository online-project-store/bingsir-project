import React, { useState, useEffect, useRef } from 'react';
import { Table, Tag, Button, Modal, Radio } from 'antd';
import http from '@/config/http';
import api from '@/config/api';
function Container(params) {
    const [userData, setUserData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectObj, setSelectObj] = useState({});
    let getUserData = ()=>{
        http.post(api.getUserData,{},res=>{
            console.log('res',res);
            setUserData(res.userinfo)
        },err=>{
            console.log(err);
        })
    };
    const audit = (row)=>{
        console.log(row);
        setVisible(true)
        setSelectObj(row)
    }
    useEffect(() => {
        getUserData();
    }, [])
    
    
    const data = userData.map((item, index) => {
        return{
            key: index+1,
            name: item.user_nickname,
            iphone: item.user_telephone_number,
            email: item.user_email,
            time: item.time,
            sign: item.sign
        }
    })
    
    const handleOk = (e)=>{
        // console.log(e);
        console.log(selectObj);
        
        setVisible(false)
    }
    const handleCancel = (e) => {
        console.log(e);
        setVisible(false)
    }
    const onChange = (e)=>{
        console.log(e, e.target.value);
        selectObj.sign = e.target.value;
        // console.log(selectObj);
        setSelectObj(selectObj)
    }
    const signHtml = (tag)=>{
        let signCon = '';
        if (tag == 1) {
            signCon = (<Tag color='geekblue'>通过</Tag>)
        } else if (tag == 0) {
            signCon = (<Tag color='purple'>待定</Tag>)
        } else {
            signCon = (<Tag color='magenta'>不通过</Tag>)
        }
        return signCon;
    }
    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: '手机号',
            dataIndex: 'iphone',
            key: 'iphone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '注册时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '标签',
            key: 'sign',
            dataIndex: 'sign',
            render: tags => (
                <span>
                    {signHtml(tags)}
                </span>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (row) => (
                <Button type="primary" onClick={() => audit(row)}>审核</Button>
            ),
        },
    ];
    return (
        <div style={{padding:'20px'}}>
            <Table columns={columns} dataSource={data} />
            <Modal
                title="审核"
                okText="确认"
                cancelText="取消"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <p>{selectObj.sign}</p>
                    <Radio.Group onChange={onChange} value={parseInt(selectObj.sign)}>
                        <Radio value={1}>注册通过</Radio>
                        <Radio value={0}>待定</Radio>
                        <Radio value={2}>注册不通过</Radio>
                    </Radio.Group>
                </div>
            </Modal>
        </div>
    )
}

export default Container;
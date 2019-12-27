import React, { useState, useEffect, useRef } from 'react';
import { Table, Tag, Button, Modal, Radio, message } from 'antd';
import http from '@/config/http';
import api from '@/config/api';
function Container(params) {
    const [userData, setUserData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectObj, setSelectObj] = useState({});
    const [num, setNum] = useState();
    let getUserData = ()=>{
        http.post(api.getUserData,{},res=>{
            // console.log('res',res);
            setUserData(res.userinfo)
        },err=>{
            console.log(err);
        })
    };
    const audit = (row)=>{
        console.log('row',row);
        setSelectObj(row)
        setNum(row.role_name)
        setVisible(true)
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
            role_name: item.role_name,
            user_id: item.user_id,
            user_role_id: item.user_role_id,
            rid: item.rid
        }
    })
    
    const handleOk = (e)=>{
        let roleNum;
        switch (num) {
            case 'read':
                roleNum = 3
                break;
            case 'write':
                roleNum = 2
                break;    
        }
        //console.log({ rid: roleNum, user_role_id: selectObj.user_role_id });
        http.post(api.updateUserSign, { rid: roleNum, user_role_id: selectObj.user_role_id }, res => {
            //  console.log('res', res);
            if (res.result.affectedRows==1){
                message.info('审核成功',1.5).then(()=>{
                    getUserData();
                    setVisible(false)
                });
            }else{
                message.info('审核失败');
            }
        }, err => {
            console.log(err);
        })
        // setSelectObj(selectObj)
    }
    const handleCancel = (e) => {
        console.log(e);
        setVisible(false)
    }
    const onChange = (e)=>{
        console.log(e);
        
        setNum(e.target.value)
    }
    const signHtml = (tag)=>{
        let signCon = '';
        if (tag == 'admin') {
            signCon = (<Tag color='geekblue'>管理员</Tag>)
        } else if (tag == 'write') {
            signCon = (<Tag color='purple'>可写</Tag>)
        } else {
            signCon = (<Tag color='magenta'>只读</Tag>)
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
            key: 'role_name',
            dataIndex: 'role_name',
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
                row.role_name == "admin" ? (<Tag color="geekblue">站主</Tag>) : (<Button type="primary" onClick={() => audit(row)}>审核</Button>)
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
                    <Radio.Group onChange={(e) => onChange(e)} value={num}>
                        {/* <Radio value={'admin'}>注册通过</Radio> */}
                        <Radio value={'write'}>可写</Radio>
                        <Radio value={'read'}>只读</Radio>
                    </Radio.Group>
                </div>
            </Modal>
        </div>
    )
}

export default Container;
import React from 'react';
import http from '@/config/http';
import api from '@/config/api';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                home页面
            </div>
        )
    }
    getData(){
        
        http.post(api.userinfo,{},res=>{
            console.log(res);
        },err=>{
            console.log(err);
        })
    }
    componentDidMount(){
        this.getData();
    }
}

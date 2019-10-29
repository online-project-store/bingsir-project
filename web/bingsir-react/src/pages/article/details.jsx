import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import http from '@/config/http';
import api from '@/config/api';
class Details extends Component {
    static propTypes = {
        prop: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
       
        
        return (
            <div>
                {/* {this.state.detailsInfo.article_id} */}
            </div>
        )
    }
    componentDidMount(){
        /* this.setState({
            detailsInfo: this.props.location.state
        },()=>{

        }) */
        http.post(api.getArticleDetails, this.props.location.state,res=>{
            console.log(res);
        },err=>{
            console.log(err);
        })
    }
}

function mapStateToProps(state) {
    return {
        article_info: state.homeReducer.article_info,
    }
    // 这里的state是react-redux store中的state，
}
export default withRouter(connect(mapStateToProps)(Details))  ;
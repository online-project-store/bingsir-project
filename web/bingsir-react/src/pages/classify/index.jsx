import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
function Classify(props) {
    const [temp, setTemp] = React.useState(5);

    const log = () => {
        setTimeout(() => {
            console.log("3 秒前 temp = 5，现在 temp =", temp);
        }, 3000);
    };

    
    useEffect(() => {
        let getClassList = () => {
            console.log('123123123');
            
        }
        getClassList()
    });


    
    return (
        <div style={{ minHeight: props.clientHeight + 'px' }}>
            {/* <div
                    onClick={() => {
                            log();
                            setTemp(3);
                            // 3 秒前 temp = 5，现在 temp = 5
                        }}
                    >
                    xyz
            </div> */}
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


(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(e,t,a){e.exports=a(308)},159:function(e,t,a){},202:function(e,t,a){},203:function(e,t,a){},297:function(e,t,a){},298:function(e,t,a){e.exports=a.p+"static/media/logo.b957f023.png"},308:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(7),l=a.n(o),c=a(311),i=a(28),s=a(16),u=a(17),m=a(20),p=a(18),d=a(21),h=(a(82),a(45)),f=(a(159),h.a.Header),b=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(f,{className:"ui-header"},"header")}}]),t}(r.a.Component),g=(a(202),h.a.Footer),E=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(g,{className:"ui-footer"},"Footer")}}]),t}(r.a.Component),y=(a(203),h.a.Content),v=Object(i.a)(),j=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={isShow:!1},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"LayoutDom",value:function(e){return r.a.createElement(h.a,null,r.a.createElement(b,null),r.a.createElement(y,null,this.props.children),r.a.createElement(E,null))}},{key:"Login",value:function(e){return r.a.createElement("div",null,this.props.children)}},{key:"componentWillMount",value:function(){"/login"===v.location.pathname&&this.setState({isShow:!0})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",null,this.state.isShow?this.Login():this.LayoutDom())}}]),t}(r.a.Component),O=(a(309),a(81)),k=(a(98),a(9)),w=(a(127),a(71)),S=(a(128),a(73)),x=(a(100),a(38)),C=(a(209),a(149)),F=(a(129),a(23)),I=(a(130),a(40)),D=a(46),N=a.n(D),L=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null};N.a.defaults.baseURL="",N.a.defaults.withCredentials=!0,N.a.defaults.timeout=1e5,N.a.interceptors.request.use(function(e){return e.headers["Content-Type"]="application/json;charset=UTF-8",L("token")&&(e.headers.Authorization="Bearer "+L("token")),e}),N.a.interceptors.response.use(function(e){if(1==e.data.code)return e.data;throw console.log(e.data),Error(e.data.msg||"\u670d\u52a1\u5f02\u5e38")});var q,T={post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0,n=arguments.length>3?arguments[3]:void 0;return N()({method:"post",url:e,data:t}).then(function(e){console.log("ajax\u6570\u636e",e),"1"==e.code?a(e.data):("0"==e.code||e.code>=500)&&n(e)}).catch(function(e){n(e)})}},B=(q={login:"/login",register:"/register",userinfo:"/userinfo"},Object.keys(q).reduce(function(e,t){return e[t]="".concat(q[t]),e},{})),M=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){console.log(t),e||T.post(B.login,t,function(e){console.log(e)},function(e){console.log(e)})})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return r.a.createElement("div",{className:"login-form"},r.a.createElement(w.a,null,r.a.createElement(S.a,{span:24},r.a.createElement(F.a,{onSubmit:this.handleSubmit},r.a.createElement(F.a.Item,{label:"\u624b\u673a\u53f7\u6216\u90ae\u7bb1"},e("phone",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7\u6216\u90ae\u7bb1!"}]})(r.a.createElement(I.a,{prefix:r.a.createElement(k.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u624b\u673a\u53f7\u6216\u90ae\u7bb1"}))),r.a.createElement(F.a.Item,{label:"\u5bc6\u7801"},e("password",{rules:[{required:!0,message:"\u8bf7\u901f\u5165\u5bc6\u7801!"}]})(r.a.createElement(I.a,{prefix:r.a.createElement(k.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"\u5bc6\u7801"}))),r.a.createElement(F.a.Item,null,e("remember",{valuePropName:"checked",initialValue:!0})(r.a.createElement(C.a,null,"\u8bb0\u4f4f\u6211")),r.a.createElement("a",{className:"login-form-forgot",href:""},"\u767b\u5f55\u9047\u5230\u95ee\u9898"),r.a.createElement(x.a,{type:"primary",block:!0,htmlType:"submit",className:"login-form-button"},"\u767b\u5f55"))))))}}]),t}(r.a.Component),P=F.a.create({name:"normal_login"})(M),W=(a(295),a(150)),z=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(m.a)(this,Object(p.a)(t).call(this))).handleSubmit=function(t){t.preventDefault(),e.props.form.validateFields(function(e,t){e||t.password!==t.confirmPwd||T.post(B.register,t,function(e){"success"==e&&W.a.info("\u8d26\u53f7\u521b\u5efa\u6210\u529f!")},function(e){console.log(e)})})},e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return r.a.createElement("div",{className:"login-form"},r.a.createElement(w.a,null,r.a.createElement(S.a,{span:24},r.a.createElement(F.a,{onSubmit:this.handleSubmit},r.a.createElement(F.a.Item,{label:"\u624b\u673a\u53f7",hasFeedback:!0},e("phone",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7!",len:11}]})(r.a.createElement(I.a,{prefix:r.a.createElement(k.a,{type:"phone",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u624b\u673a\u53f7"}))),r.a.createElement(F.a.Item,{label:"\u90ae\u7bb1",hasFeedback:!0},e("email",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u90ae\u7bb1!",pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/}]})(r.a.createElement(I.a,{prefix:r.a.createElement(k.a,{type:"mail",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u90ae\u7bb1"}))),r.a.createElement(F.a.Item,{label:"\u5bc6\u7801",hasFeedback:!0},e("password",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801!",min:6}]})(r.a.createElement(I.a,{prefix:r.a.createElement(k.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"\u6700\u5c116\u4f4d\u5bc6\u7801"}))),r.a.createElement(F.a.Item,{label:"\u786e\u8ba4\u5bc6\u7801",hasFeedback:!0},e("confirmPwd",{rules:[{required:!0,message:"\u8bf7\u518d\u6b21\u786e\u8ba4\u5bc6\u7801!",min:6}]})(r.a.createElement(I.a,{prefix:r.a.createElement(k.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"\u786e\u8ba4\u5bc6\u7801"}))),r.a.createElement(F.a.Item,null,r.a.createElement(x.a,{type:"primary",block:!0,htmlType:"submit"}," \u6ce8\u518c "))))))}}]),t}(r.a.Component),A=F.a.create({name:"register"})(z),J=(a(297),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).handleClick=function(e){a.setState({current:e.key}),"login"===e.key?a.setState({loginSign:!0}):a.setState({loginSign:!1})},a.state={loginSign:!0,current:"login"},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"loginLayout"},r.a.createElement("img",{className:"loginLayout-img",src:a(298),alt:""}),r.a.createElement("div",{className:"loginLayout-box"},r.a.createElement(O.b,{onClick:this.handleClick,selectedKeys:[this.state.current],mode:"horizontal"},r.a.createElement(O.b.Item,{key:"login"},r.a.createElement(k.a,{type:"login"}),"\u767b\u5f55"),r.a.createElement(O.b.Item,{key:"register"},r.a.createElement(k.a,{type:"appstore"}),"\u6ce8\u518c")),this.state.loginSign?r.a.createElement(P,null):r.a.createElement(A,null)))}}]),t}(n.Component)),R=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"home\u9875\u9762")}},{key:"getData",value:function(){T.post(B.userinfo,{},function(e){console.log(e)},function(e){console.log(e)})}},{key:"componentDidMount",value:function(){this.getData()}}]),t}(r.a.Component),U=Object(i.a)(),$=function(){return r.a.createElement(c.c,{history:U},r.a.createElement(j,null,r.a.createElement(c.d,null,r.a.createElement(c.b,{exact:!0,path:"/",component:R}),r.a.createElement(c.b,{exact:!0,path:"/login",component:J}),r.a.createElement(c.b,{render:function(){return r.a.createElement(c.a,{to:"/"})}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement($,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[153,1,2]]]);
//# sourceMappingURL=main.978699f9.chunk.js.map
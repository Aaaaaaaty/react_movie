import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import ReactDOM, {render} from 'react-dom';


class Roots extends Component {
    render() {
        return (
            <div  className="testClass">{this.props.children}</div>
        );
    }
}




//const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;


import IndexPage from '../Container/Index';
const Index  = {
    path:'index',
    getComponent(nextState,cb){
		require.ensure([],(require)=>{
            return cb(null,IndexPage)
        })
    }
}

import UserInforPage from '../Container/UserInfor';
const UserInfor  = {
    path:'userInfor',
    getComponent(nextState,cb){require.ensure([],(require)=>{
            return cb(null,UserInforPage)
        })
    }
}




const rootRoute ={
    component:Roots,
    childRoutes:[UserInfor,Index]
}



const RouteConfig = (
    <Router  routes={rootRoute} history={hashHistory}>
    </Router>
);


export default RouteConfig;
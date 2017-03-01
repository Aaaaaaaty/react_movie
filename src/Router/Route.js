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

import CityLocationPage from '../Container/CityLocation';
const cityLocation  = {
    path:'cityLocation',
    getComponent(nextState,cb){require.ensure([],(require)=>{
            return cb(null,CityLocationPage)
        })
    }
}

import FilmListPage from '../Container/FilmList';
const filmList = {
    path:'filmList',
    getComponent(nextState,cb){require.ensure([],(require)=>{
            return cb(null,FilmListPage)
        })
    }
}

import FilmScheduleListPage from '../Container/FilmScheduleList';
const FilmScheduleList = {
    path:'FilmScheduleList',
    getComponent(nextState,cb){require.ensure([],(require)=>{
            return cb(null,FilmScheduleListPage)
        })
    }
}



import CinimaSelect from '../Container/CinimaSelect';
const cinimaSelectList  = {
    path:'cinimaSelect',
    getComponent(nextState,cb){require.ensure([],(require)=>{
            return cb(null,CinimaSelect)
        })
    }
}


const rootRoute ={
    component:Roots,
    childRoutes:[UserInfor,Index,cityLocation,filmList,cinimaSelectList,FilmScheduleList]
}



const RouteConfig = (
    <Router  routes={rootRoute} history={hashHistory}>
    </Router>
);


export default RouteConfig;

import React, { PureComponent } from 'react';
import { Link } from 'react-router'
var style=require("./ctStyle.scss")
var baseStyle=require("../../styles/base.scss")
class SearchResult extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {

    const {cinimas} = this.props



    var cinimasNodes=[]
    cinimas.forEach(function(node,index){
      cinimasNodes.push(<li  className={style.linep} key={"key"+index}><Link to={{pathname:'/filmList'}}>{node.name}</Link></li>)
    })

    return (<div  className={style.sline}>
                <ul className={baseStyle.clear}>
                    {cinimasNodes}
                </ul>

            </div>)
   }

}

export default SearchResult;

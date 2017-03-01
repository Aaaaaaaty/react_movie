import React, { PureComponent } from 'react';
var style=require("./style.scss")
var baseStyle=require("../../styles/base.scss")
import $ from "jquery"
class NavNode extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {navTag} = this.props
   
    
    var navNodes=[];
       
    
    navTag.forEach(function(node,index){
        navNodes.push(<li onClick={navto}   key={"key"+index}>{node}</li>)
    })
        
    function navto(event){
        var offset=$(document.getElementsByName(event.target.innerHTML).item(0)).offset() //.scrollIntoView()
        $("body").stop().animate({"scrollTop":offset.top},"0.5s","linear")
        
    }    
   var marigntop=(-navTag.length*0.13)+"rem  0 0 0";
   var topstyle={"margin":marigntop,}
    
    return (<div style={topstyle}  className={style.navouter}>
               
                <ul className={baseStyle.clear}>
                    {navNodes}
                </ul>
    
            </div>)
   }
    
}

export default NavNode;
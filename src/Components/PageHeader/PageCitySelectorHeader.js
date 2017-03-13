import React, { PureComponent } from 'react';
var style=require("./style.scss")
var baseStyle=require("../../styles/base.scss")
import { Link} from 'react-router';
class PageHeader extends PureComponent {
    constructor(props){
       super(props);
     }
    render() {
	  
    const {headerData} = this.props
   
    var leftNode,rightNode;
    if(headerData.ltitle){
                      leftNode=   <div  className={baseStyle.left}><Link to={headerData.lclick}>{headerData.ltitle}</Link></div> 
                    }
    
    if(headerData.rtitle){
                      rightNode=  <div  className={baseStyle.right}><Link to={headerData.rclick}>{headerData.rtitle}</Link></div>
                    }
    
    return (<div  className={style.outer} > 
                <div className={style.header}>
               
            {leftNode}
               <div  className={style.midTitle}>{headerData.title}</div> 
                {rightNode}
              </div>
            </div>)
            
              /* <div  className={baseStyle.right}><Link to={headerData.rclick}>{headerData.rtitle}</Link></div> */
   }
    
}

export default PageHeader;
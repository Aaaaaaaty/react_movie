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
<<<<<<< HEAD
      cinimasNodes.push(<li  className={style.linep} key={"key"+index}><Link to={{pathname:'/filmList'}}>{node.name}</Link></li>)
=======
      cinimasNodes.push(<Link 
                          to={{
                            pathname: '/filmList'
                          }}
                          className={ style.link }
                        >
                          <li  className={style.linep} key={"key"+index}>{node.name}</li>
                        </Link>)
>>>>>>> a6722a3013315f8caaaa0688ea6cb652470884c9
    })

    return (<div  className={style.sline}>
                <ul className={baseStyle.clear}>
                    {cinimasNodes}
                </ul>

            </div>)
   }

}

export default SearchResult;

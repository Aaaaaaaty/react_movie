import React, { Component } from 'react';
import { connect ,Provider} from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../Redux/Store/Store';



class IndexPage extends Component {
    constructor(props){
       super(props);

    }
  render() {

    const { value,name, addState,changeName,postMessage,loadingData} = this.props


    return  (<div>
                <div onClick={loadingData}>
                    <span>post state:</span>{postMessage}
                </div>

                <span>**{value}**</span>
                <div onClick={changeName}>namechange{name}</div>
                <div onClick={addState}>addNum</div>
                <div>1232131</div>
              </div>)

  }

}



const IndexPageC = connect(mapStateToProps,mapDispatchToProps)(IndexPage)




export default IndexPageC;

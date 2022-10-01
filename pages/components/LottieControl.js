import React from 'react'
import Lottie from 'react-lottie';
 
export default class LottieControl extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
        width: this.props.width != undefined ? this.props.width : '100px' , 
        height: this.props.width != undefined ? this.props.width : '100px' , 
        speed: this.props.speed != undefined ? this.props.speed : 1,
        animationData: this.props.animationData
    };
  }
 
  render() { 
    const defaultOptions = {
      isClickToPauseDisabled: true,
      loop: true,
      animationData: this.state.animationData,
    };
 
    return <div>
      <Lottie options={defaultOptions}
              height={this.state.height}
              width={this.state.width}
              speed={this.state.speed}/>
    </div>
  }
}
import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import netflix_icon from './icons/netflix_icon.jpeg';
import hulu_icon from './icons/hulu_icon.jpeg';
import prime_video_icon from './icons/prime_video_icon.jpeg';
import disney_icon from './icons/disney_icon.jpeg';

class ToggleButtonGroupControlled extends React.Component {
  // constructor(props) {
  //   super(props);
    // this.state = {
    //   PlatformValue: []
    // };
    // this.handlePlatformChange = this.handlePlatformChange.bind(this);
  // }

  // handlePlatformChange(event) {
  //   console.log("event: ", event);
  //   this.setState({
  //     PlatformValue: event,
  //   });
  // }


  render () {
    // const PlatformValue = this.state.PlatformValue;
    // const handlePlatformChange = this.handlePlatformChange;
    const {PlatformValue, handlePlatformChange} = this.props;
    return (
      <ToggleButtonGroup type="checkbox" value={PlatformValue} onChange={handlePlatformChange}>
        <ToggleButton value={"Netflix"} variant="light"><img src={netflix_icon} alt="netflix_icon"/></ToggleButton>
        <ToggleButton value={"Hulu"} variant="light"><img src={hulu_icon} alt="hulu_icon"/></ToggleButton>
        <ToggleButton value={"Prime_Video"} variant="light"><img src={prime_video_icon} alt="prime_video_icon"/></ToggleButton>
        <ToggleButton value={"Disney"} variant="light"><img src={disney_icon} alt="disney_icon"/></ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

export default ToggleButtonGroupControlled;

/*Text Buttons*/
// <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
//   <ToggleButton value={"Netflix"}>Netflix</ToggleButton>
//   <ToggleButton value={"Hulu"}>Hulu</ToggleButton>
//   <ToggleButton value={"Prime_Video"}>Prime Video</ToggleButton>
//   <ToggleButton value={"Disney"}>Disney+</ToggleButton>
// </ToggleButtonGroup>

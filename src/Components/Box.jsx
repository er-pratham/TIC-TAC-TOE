import React from 'react';
import '../App.css';
export default function Box(props) {
  return (
    <div className='Box' onClick={props.clickFunc}>
      <h2>{props.dataValue}</h2>
    </div>
  )
}
